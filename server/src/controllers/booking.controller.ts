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

      //   call service booking
      const response = await BookingService.create({
        ...body,
        totalPrice: grossAmount,
        id: idTransaction,
        token: midtransPayment.token,
        user: idUser ?? "",
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
