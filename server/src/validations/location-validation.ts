import { object, string, ZodType } from "zod";
import { LocationCreateRequestType } from "../models/location-model";

export class LocationValidation {
  // create
  static readonly CREATE = object({
    city: string("city berupa string")
      .min(1, "minimal karakter city 1")
      .max(20, "maksimal karakter city 20"),
    country: string("country berupa string")
      .min(1, "minimal karakter country 1")
      .max(20, "maksimal karakter country 20"),
  }).strict() satisfies ZodType<LocationCreateRequestType>;
}
