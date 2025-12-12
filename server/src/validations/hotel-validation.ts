import { number, object, string, ZodType } from "zod";
import { HotelCreateRequestType } from "../models/hotel-model";

export class HotelValidation {
  // create
  static readonly CREATE = object({
    name: string("Name is required")
      .min(1, "Name is required")
      .regex(/^[A-Za-z\s]+$/, { message: "Only letters allowed" }),
    description: string("Description is required")
      .min(1, "Description is required")
      .regex(/^[A-Za-z\s]+$/, { message: "Only letters allowed" }),
    city: string("City is required")
      .min(1, "City is required")
      .regex(/^[A-Za-z\s]+$/, { message: "Only letters allowed" }),
    country: string("Country is required")
      .min(1, "Country is required")
      .regex(/^[A-Za-z\s]+$/, { message: "Only letters allowed" }),
    price: string("Price is required")
      .min(1, "Price is required")
      .refine((value) => !isNaN(Number(value)), "Price must be a number")
      .transform((value) => Number(value)),
    fasilitas: string("Fasilitas is required")
      .transform((val) => {
        try {
          return JSON.parse(val);
        } catch (error) {
          throw new Error("Fasilitas harus berupa array of string");
        }
      })
      .refine((arr) => {
        return (
          Array.isArray(arr) &&
          arr.every(
            (item) => typeof item === "string" && /^[0-9a-fA-F]{24}$/.test(item)
          )
        );
      }),
  }).strict() satisfies ZodType<HotelCreateRequestType>;
}
