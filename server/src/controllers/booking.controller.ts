import { NextFunction, Request, Response } from "express";
import {
  BookingCreateRequestType,
  BookingForDisplayResponseType,
  BookingResponseType,
} from "../models/booking-model";
import { AuthRequest, ResponseType } from "../types/request-response";
import { HotelService } from "../services/hotel.service";
import { randomUUID } from "crypto";
import { MidtransService } from "../services/midtrans.service";
import { BookingService } from "../services/booking.service";
import PDFDocument from "pdfkit";
import { row } from "../utils/PDFformatUtils";
import {
  formatCurrency,
  formatDate,
  formatDateFull,
  formatDateShort,
} from "../utils/util";

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

      //   call service booking
      const response = await BookingService.create({
        ...body,
        totalPrice: grossAmount + findHotel.taxAndFees,
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

  // read detail
  static async readDetail(
    req: AuthRequest<{ id: string }>,
    res: Response<ResponseType<BookingResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id hotel from params
      const idBooking = req.params.id;

      // get id user from params
      const idUser = req.data?._id ?? "";

      // call response
      const response = await BookingService.readDetail(idUser, idBooking);

      // cek response
      if (!response) {
        return res.status(400).json({
          status: "failed",
          message: "booking tidak ditemukan",
          data: null,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "booking berhasil ditemukan",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // read booking
  static async readBookings(
    req: AuthRequest<{}, {}, {}, { type: "upcoming" | "completed" }>,
    res: Response<ResponseType<BookingForDisplayResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      // get query
      const { type } = req.query;

      // get data user
      const { _id } = req.data ?? { _id: "" };

      // call service
      const response = await BookingService.getBooking(type, _id);

      // cek response
      if (!response) {
        return res.status(400).json({
          status: "failed",
          message: "read booking terjadi kesalahan",
          data: null,
        });
      }

      // return response
      return res.status(200).json({
        status: "success",
        message: "read booking berhasil",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // get token booking is pending
  static async getIdBookingIsPending(
    req: AuthRequest<{ idHotel: string }>,
    res: Response<ResponseType<string | null>>,
    next: NextFunction
  ) {
    try {
      // get id hotel from params
      const { idHotel } = req.params;

      // get id user from req data
      const idUser = req.data?._id ?? "";

      // call service
      const response = await BookingService.getIdBooking(idUser, idHotel);

      // cek response
      if (!response) {
        return res.status(200).json({
          status: "success",
          message: "data booking tidak ditemukan",
          data: null,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "data booking berhasil ditemukan",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // ereceipt
  static async ereceipt(
    req: AuthRequest<{ idBooking: string }>,
    res: Response<Promise<void>>,
    _next: NextFunction
  ) {
    try {
      // get id data from req data
      const idUser = req.data?._id ?? "";

      // get id booking from params
      const idBooking = req.params.idBooking;

      // get booking
      const bookings = await BookingService.readDetail(idUser, idBooking);

      // cek bookings
      if (!bookings) return;

      // format date

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=transaksi-98bb1952-4fbb-447b-9ac2-dfcf191a8ffc.pdf`
      );

      const doc = new PDFDocument({ margin: 50 });
      doc.pipe(res);

      // fonts
      doc.registerFont("CraftyGirls-Regular", "fonts/CraftyGirls-Regular.ttf");

      // page width
      const pageWidth = doc.page.width;
      const margin = doc.page.margins.left;

      doc
        .font("Helvetica-Bold")
        .fontSize(30)
        .text("Ilham Hotel", margin, doc.y, {
          width: pageWidth - margin * 2,
          align: "center",
        });

      doc.moveDown(0.1);

      // adress
      doc
        .font("Courier")
        .fontSize(14)
        .text("Jakarta, Indonesia", margin, doc.y, {
          width: pageWidth - margin * 2,
          align: "center",
        });

      doc.moveDown(0.1);

      // phone number
      doc
        .font("Courier")
        .fontSize(14)
        .text("Phone : 0858-9689-0881", margin, doc.y, {
          width: pageWidth - margin * 2,
          align: "center",
        });

      doc.moveDown(0.1);

      // web address
      doc
        .font("Courier")
        .fontSize(14)
        .text("www.ilhamhotel.com", margin, doc.y, {
          width: pageWidth - margin * 2,
          align: "center",
        });

      doc.moveDown(2);

      // line
      doc
        .moveTo(margin, doc.y) // start point (x, y)
        .lineTo(pageWidth - margin, doc.y) // end point (x, y)
        .stroke();

      doc.moveDown(1);

      doc
        .font("Courier")
        .fontSize(16)
        .text(formatDate(bookings.createdAt), margin, doc.y, {
          width: pageWidth - margin * 2,
          align: "center",
        });

      doc.moveDown(2);

      // text row
      row(doc, "Name Hotel", bookings.hotel.name);
      row(doc, "Check In", formatDateShort(bookings.checkIn));
      row(doc, "Check Out", formatDateShort(bookings.checkOut));
      row(doc, "Guest", `0${bookings.visitor} Person`);

      // line
      doc
        .moveTo(margin, doc.y) // start point (x, y)
        .lineTo(pageWidth - margin, doc.y) // end point (x, y)
        .stroke();

      doc.moveDown(0.5);

      row(doc, "Amount", formatCurrency(bookings.totalPrice - 5, true));
      row(doc, "Tax & Fees", formatCurrency(bookings.hotel.taxAndFees, true));
      row(doc, "Discount", formatCurrency(bookings.hotel.discount, true));
      row(doc, "Total", formatCurrency(bookings.totalPrice, true));

      // line
      doc
        .moveTo(margin, doc.y) // start point (x, y)
        .lineTo(pageWidth - margin, doc.y) // end point (x, y)
        .stroke();

      doc.moveDown(0.5);

      row(doc, "Name", bookings.user.fullName);
      row(
        doc,
        "Phone Number",
        Array.from(bookings?.user.phone ?? "")
          .map((char, i) =>
            i === 0 ? `+62 ` : i !== 0 && i % 4 === 0 ? `-` + char : char
          )
          .join("")
          .toString()
      );
      row(doc, "Transaction ID", `#BOOKING-${bookings.user.phone}`);
      row(doc, "Status", bookings.status);

      doc.moveDown(1.5);

      // thank you
      doc
        .font("Courier")
        .fontSize(14)
        .text("Thank you for booking a room at our hotel.", margin, doc.y, {
          width: pageWidth - margin * 2,
          align: "center",
        });
      // ======= SELESAI =======
      doc.end();
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
