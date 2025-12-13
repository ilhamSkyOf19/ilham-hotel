import { object, string, ZodType } from "zod";
import { GalleryCreateRequestType } from "../models/gallery-model";

export class GalleryValidation {
  // crate
  static readonly CREATE = object({
    idHotel: string("Hotel id harus berupa string")
      .nonempty("Hotel id is required")
      .regex(/^[a-fA-F0-9]{24}$/, "Invalid hotel id"),
  }).strict() satisfies ZodType<Omit<GalleryCreateRequestType, "images">>;
}
