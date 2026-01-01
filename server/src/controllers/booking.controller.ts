import { NextFunction, Response } from "express";
import {
  BookingCreateRequestType,
  BookingResponseType,
} from "../models/booking-model";
import { AuthRequest, ResponseType } from "../types/request-response";
import { HotelService } from "../services/hotel.service";
import { randomUUID } from "crypto";
import { MidtransService } from "../services/midtrans.service";
import { BookingService } from "../services/booking.service";

export class BookingController {
  // booking
  static async booking(
    req: AuthRequest<{}, {}, BookingCreateRequestType>,
    res: Response<ResponseType<(BookingResponseType & { url: string }) | null>>,
    next: NextFunction
  ) {
    try {
      // get data user from req data
      const { _id: idUser, email } = req?.data ?? { id: "", email: "" };

      // get body
      const body = req.body;

      // find hotel
      const findHotel = await HotelService.readById(body.hotel);

      // cek find hotel
      if (!findHotel) {
        return res.status(400).json({
          status: "failed",
          message: "hotel tidak di temukan",
          data: null,
        });
      }

      // cek transaction
      const findTransaction =
        await BookingService.getByIdUserAndIdHotelAndStatus(
          idUser ?? "",
          findHotel._id
        );

      // cek transaksi yang masih berlangsung
      if (findTransaction) {
        return res.status(400).json({
          status: "failed",
          message: "transaksi sedang berlangsung",
          data: null,
        });
      }

      // get bookings
      const roomBooked: number[] = await BookingService.readForGetBooking(
        findHotel._id
      );

      // cek room full
      if (findHotel.totalRoom <= roomBooked?.length) {
        return res.status(400).json({
          status: "failed",
          message: "hotel sudah penuh",
          data: null,
        });
      }

      // get room availabel
      const availableRoom: number[] = Array.from(
        { length: findHotel.totalRoom },
        (_, i) => i + 1
      ).filter((n) => !roomBooked.includes(n));

      // total price
      const grossAmount: number =
        findHotel.price * (1 - findHotel.discount / 100);

      // get random id
      const idTransaction: string = randomUUID();

      // call service midtrans
      const midtransPayment = await MidtransService.payment({
        email,
        grossAmount,
        idTransaction,
      });

      //

      //   call service booking
      const response = await BookingService.create({
        ...body,
        totalPrice: grossAmount,
        id: idTransaction,
        token: midtransPayment.token,
        user: idUser ?? "",
        room: availableRoom[0],
      });

      // cek response
      if (response) {
        return res.status(201).json({
          status: "success",
          message: "Berhasil membuat transaksi",
          data: {
            ...response,
            url: midtransPayment.url,
          },
        });
      }
    } catch (error) {
      // cek console
      console.log(error);
      next(error);
    }
  }
}
