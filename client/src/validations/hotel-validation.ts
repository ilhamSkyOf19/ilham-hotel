import z, { array, object, string, ZodType } from "zod";
import type { HotelCreateServiceRequestType } from "../models/hotel-model";

export class HotelValidation {
  // create
  static readonly CREATE = object({
    name: string("Name is required")
      .min(1, "Name is required")
      .regex(/^[A-Za-z\s]+$/, { message: "Only letters allowed" }),
    description: string("Description is required").min(
      1,
      "Description is required"
    ),
    price: string("Price is required")
      .min(1, "Price is required")
      .regex(/^[0-9$,]+$/, { message: "Only numbers allowed" }),
    totalRoom: string("Total room is required")
      .min(1, "Total room is required")
      .refine((value) => !isNaN(Number(value)), "Total room must be a number"),
    thumbnail: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Thumbnail is required"),
    fasilitas: array(z.string()).min(1, "Fasilitas is required"),
    location: string("Location is required").regex(/^[0-9a-fA-F]{24}$/, {
      message: "id location tidak valid",
    }),
    linkMaps: string("Link Maps is required").min(1, "Link Maps is required"),
  }).strict() satisfies ZodType<HotelCreateServiceRequestType>;
}
