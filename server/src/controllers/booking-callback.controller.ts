import { Request, Response } from "express";
import { ResponseType } from "../types/request-response";
import crypto from "crypto";
import { BookingService } from "../services/booking.service";

export class BookingCallBackController {
  // callback
  static async callback(req: Request, res: Response<ResponseType<null>>) {
    try {
      // get request from body
      const {
        order_id,
        status_code,
        gross_amount,
        signature_key,
        transaction_status,
        fraud_status,
      } = req.body;

      //   generate signature for verifikasi
      const signarute = crypto
        .createHash("sha512")
        .update(
          order_id +
            status_code +
            gross_amount +
            process.env.MIDTRANS_SERVER_KEY
        )
        .digest("hex");

      // cek signature
      if (signature_key !== signarute) {
        return res.status(400).json({
          status: "failed",
          message: "invalid signature",
          data: null,
        });
      }

      //   slice order id to get id booking
      const idBooking: string = order_id.slice("BOOKING-".length);

      // callback conditional
      switch (transaction_status) {
        case "capture":
          if (fraud_status === "accept") {
            await BookingService.updateStateById(idBooking, "success");
          }
          break;

        case "settlement":
          await BookingService.updateStateById(idBooking, "success");
          break;
        case "pending":
          await BookingService.updateStateById(idBooking, "pending");
          break;

        case "deny":
        case "cancel":
        case "expire":
          await BookingService.deleteById(idBooking);
          break;

        default:
          console.log("Unhandled status:", transaction_status);
      }

      //   return response
      return res.status(200).json({
        status: "success",
        message: "success",
        data: null,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: "failed",
        message: "failed",
        data: null,
      });
    }
  }
}
