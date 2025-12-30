import z, { date, number, object, string, ZodType } from "zod";
import { BookingCreateRequestType } from "../models/booking-model";

export class BookingValidation {
  // create
  static readonly CREATE = object({
    hotel: string("id hotel harus berupa string").regex(
      /^[0-9a-fA-F]{24}$/,
      "id hotel tidak valid"
    ),
    checkIn: string("check in harus berupa string").refine((value) => {
      return !isNaN(Date.parse(value));
    }, "check in harus berupa date"),
    checkOut: string("check out harus berupa string").refine((value) => {
      return !isNaN(Date.parse(value));
    }, "check out harus berupa date"),
    visitor: number("visitor harus berupa number").min(1, "minimal 1"),
  }).strict() satisfies ZodType<BookingCreateRequestType>;
}
