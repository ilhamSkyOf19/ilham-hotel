import { object, string, ZodType } from "zod";
import {
  FilterTypeForQuery,
  HotelCreateRequestType,
  HotelUpdateRequestType,
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
    linkMaps: string("Link Maps is required").min(1, "Link Maps is required"),
    location: string("Location is required").regex(/^[0-9a-fA-F]{24}$/, {
      message: "id location tidak valid",
    }),
    price: string("Price is required")
      .min(1, "Price is required")
      .refine((value) => !isNaN(Number(value)), "Price must be a number")
      .transform((value) => Number(value)),
    taxAndFees: string("tax & fees is required")
      .min(1, "tax & fees is required")
      .refine((value) => !isNaN(Number(value)), "tax & fees must be a number")
      .transform((value) => Number(value)),
    totalRoom: string("Price is required")
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

  // update
  static readonly UPDATE = object({
    name: string("Name is required")
      .min(1, "Name is required")
      .regex(/^[A-Za-z\s]+$/, { message: "Only letters allowed" })
      .optional(),
    description: string("Description is required")
      .min(1, "Description is required")
      .optional(),
    linkMaps: string("Link Maps is required")
      .min(1, "Link Maps is required")
      .optional(),
    location: string("Location is required")
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: "id location tidak valid",
      })
      .optional(),
    price: string("Price is required")
      .min(1, "Price is required")
      .refine((value) => !isNaN(Number(value)), "Price must be a number")
      .transform((value) => Number(value))
      .optional(),
    taxAndFees: string("tax & fees is required")
      .min(1, "tax & fees is required")
      .refine((value) => !isNaN(Number(value)), "tax & fees must be a number")
      .transform((value) => Number(value))
      .optional(),
    totalRoom: string("Price is required")
      .min(1, "Price is required")
      .refine((value) => !isNaN(Number(value)), "Price must be a number")
      .transform((value) => Number(value))
      .optional(),
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
      })
      .optional(),
  }).strict() satisfies ZodType<HotelUpdateRequestType>;

  // vaidasi params query
  static readonly FILTER = object({
    search: string("Search is required").max(40, "max search").optional(),
    location: string("Location is required").max(40, "location max").optional(),
    minPrice: string("Min Price is required")
      .min(1, "Min Price is required")
      .regex(/^[0-9]+$/, { message: "Min Price Only letters allowed" })
      .optional(),
    maxPrice: string("Max Price is required")
      .min(1, "Max Price is required")
      .regex(/^[0-9]+$/, { message: "Max Price Only letters allowed" })
      .optional(),
    fasilitas: string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true; // optional, boleh kosong
          const arr = val.split(","); // split sementara untuk validasi saja
          return arr.every((id) => /^[0-9a-fA-F]{24}$/.test(id));
        },
        { message: "Each id must be a valid ObjectId" }
      ),
  }).strict() satisfies ZodType<FilterTypeForQuery>;
}
