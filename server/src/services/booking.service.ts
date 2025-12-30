import {
  BookingCreateRequestType,
  BookingResponseType,
  PayloadBooking,
  toBookingResponseType,
} from "../models/booking-model";
import BookingModel from "../schemas/booking.schema";

export class BookingService {
  // create
  static async create(
    req: BookingCreateRequestType & {
      id: string;
      token: string;
      user: string;
      totalPrice: number;
    }
  ): Promise<BookingResponseType | null> {
    // call model
    const booking = await BookingModel.create({
      ...req,
      checkIn: new Date(req.checkIn),
      checkOut: new Date(req.checkOut),
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
  ): Promise<BookingResponseType | null> {
    // call model
    const response = await BookingModel.updateOne(
      {
        _id: idBooking,
      },
      {
        $set: {
          status,
          active: status === "success" ? true : false,
        },
      }
    )
      .populate("user", "_id email")
      .populate("hotel", "_id name")
      .lean<PayloadBooking>();

    // return
    return response;
  }
}
