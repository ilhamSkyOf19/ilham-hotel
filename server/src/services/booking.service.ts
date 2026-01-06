import { Types } from "mongoose";
import {
  BookingCreateRequestType,
  BookingForDisplayResponseType,
  BookingResponseType,
  BookingUpdateCallbackRequestType,
  BookingWithHotelPopulated,
  PayloadBooking,
  toBookingForDisplayResponseType,
  toBookingResponseType,
} from "../models/booking-model";
import BookingModel from "../schemas/booking.schema";

// hold duration
const HOLD_DURATION_MS = 10 * 60 * 1000; // 15 minutes

export class BookingService {
  // create
  static async create(
    req: BookingCreateRequestType & {
      id: string;
      token: string;
      user: string;
      totalPrice: number;
      room: number;
    }
  ): Promise<BookingResponseType | null> {
    // hold expiry time
    const holdExpired = new Date(Date.now() + HOLD_DURATION_MS);

    // call model
    const booking = await BookingModel.create({
      ...req,
      holdUntil: holdExpired,
      checkIn: new Date(req.checkIn),
      checkOut: new Date(req.checkOut),
      room: req.room,
      _id: req.id,
    });

    // get booking
    const response = await BookingModel.findById(booking._id)
      .populate("user", "_id email")
      .populate("hotel", "_id name")
      .lean<PayloadBooking>();

    // cek
    if (!response) {
      return null;
    }

    // return response
    return toBookingResponseType(response);
  }

  // booking update status by id booking
  static async updateStateById(
    idBooking: string,
    status: "pending" | "success" | "failed"
  ): Promise<boolean> {
    // payload
    const updateData: BookingUpdateCallbackRequestType = {
      status,
      active: status === "success",
    };

    // cek status
    if (status === "failed") {
      updateData.holdUntil = null;
      updateData.token = "";
    }

    console.log("UPDATE STATUS:", status);
    console.log("UPDATE PAYLOAD:", updateData);
    console.log("TIME:", new Date().toISOString());

    const result = await BookingModel.updateOne(
      { _id: idBooking },
      {
        $set: updateData,
      }
    );

    console.log("UPDATE RESULT:", result);

    return result.matchedCount === 1;
  }

  // get booking detail
  static async readDetail(
    idUser: string,
    idBooking: string
  ): Promise<BookingResponseType | null> {
    // call response
    const response = await BookingModel.findOne({
      _id: idBooking,
      user: new Types.ObjectId(idUser),
    })
      .populate("user", "_id email fullName phone")
      .populate("hotel", "_id name taxAndFees discount")
      .lean<PayloadBooking>();

    // cek response
    if (!response) return null;

    return toBookingResponseType(response);
  }

  // read by id hotel for get booking
  static async readForGetBooking(idHotel: string): Promise<number[] | []> {
    // call model
    const bookings = await BookingModel.find({
      hotel: idHotel,
      $or: [
        { active: true, holdUntil: null },
        { active: false, holdUntil: { $gt: new Date() } },
      ],
    });

    // return booking
    return bookings.map((booking) => booking.room);
  }

  // get boking by id user & id Hotel and status
  static async getByIdUserAndIdHotelAndStatus(
    idUser: string,
    idHotel: string
  ): Promise<boolean> {
    // call model
    const booking = await BookingModel.findOne({
      user: idUser,
      hotel: idHotel,
      status: "pending",
    });

    // cek
    if (!booking) {
      return false;
    }

    // return response
    return true;
  }

  // get token bookings pending
  static async getIdBooking(
    idUser: string,
    idHotel: string
  ): Promise<string | null> {
    // now
    const now = new Date();

    // delete if expired
    await BookingModel.findOneAndDelete({
      user: new Types.ObjectId(idUser),
      hotel: new Types.ObjectId(idHotel),
      status: "pending",
      holdUntil: { $lte: now },
    });

    // get id
    const booking = await BookingModel.findOne({
      user: new Types.ObjectId(idUser),
      hotel: new Types.ObjectId(idHotel),
      status: "pending",
      holdUntil: { $gt: now },
    })
      .select("_id")
      .lean();

    return booking ? booking._id : null;
  }

  // read booking upcomming
  static async getBooking(
    type: "upcoming" | "completed",
    idUser: string
  ): Promise<BookingForDisplayResponseType[] | null> {
    const filter =
      type === "upcoming"
        ? { checkIn: { $gt: new Date() } }
        : { checkOut: { $lt: new Date() } };

    // call model
    const response = await BookingModel.find({
      ...filter,
      user: idUser,
    })
      .populate({
        path: "hotel",
        select: "_id name rating thumbnail price discount location",
        populate: {
          path: "location",
          select: "_id city country",
        },
      })
      .lean<BookingWithHotelPopulated[]>();

    return response.map((data) =>
      toBookingForDisplayResponseType({
        _id: data._id,
        hotel: data.hotel,
      })
    );
  }

  // get booking by id hotel
  static async getBookingByIdHotel(idHotel: string): Promise<boolean> {
    const now = new Date();

    // call model
    const response = await BookingModel.findOne({
      hotel: idHotel,
      $or: [
        { checkIn: { $gt: now } }, // upcoming
        {
          checkIn: { $lte: now },
          checkOut: { $gt: now }, // sedang menginap
        },
      ],
    });

    // cek
    if (!response) return false;

    return true;
  }

  // delete booking by id
  static async deleteById(idBooking: string): Promise<boolean> {
    // call model
    const response = await BookingModel.deleteOne({ _id: idBooking });

    // cek response
    if (!response) return false;

    return true;
  }
}
