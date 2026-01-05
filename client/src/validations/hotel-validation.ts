import z, { array, object, string, ZodType } from "zod";
import type {
  HotelCreateServiceRequestType,
  HotelUpdateServiceRequestType,
} from "../models/hotel-model";

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
    taxAndFees: string("Tax & Fees is required")
      .min(1, "Tax & Fees is required")
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

  static readonly UPDATE = object({
    name: string("Name is required")
      .min(1, "Name is required")
      .regex(/^[A-Za-z\s]+$/, { message: "Only letters allowed" })
      .optional(),
    description: string("Description is required")
      .min(1, "Description is required")
      .optional(),
    price: string("Price is required")
      .min(1, "Price is required")
      .regex(/^[0-9$,]+$/, { message: "Only numbers allowed" })
      .optional(),
    taxAndFees: string("Tax & Fees is required")
      .min(1, "Tax & Fees is required")
      .regex(/^[0-9$,]+$/, { message: "Only numbers allowed" })
      .optional(),
    totalRoom: string("Total room is required")
      .min(1, "Total room is required")
      .refine((value) => !isNaN(Number(value)), "Total room must be a number")
      .optional(),
    thumbnail: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Thumbnail is required")
      .optional(),
    fasilitas: array(z.string()).min(1, "Fasilitas is required").optional(),
    location: string("Location is required")
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: "id location tidak valid",
      })
      .optional(),
    linkMaps: string("Link Maps is required")
      .min(1, "Link Maps is required")
      .optional(),
  }).strict() satisfies ZodType<HotelUpdateServiceRequestType>;
}
