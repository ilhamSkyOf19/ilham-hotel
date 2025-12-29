import { custom, object, string, ZodType } from "zod";
import type { GalleryCreateRequestType } from "../models/gallery-model";

// max file size
const MAX_FILE_SIZE = 2_000_000; // mb
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export class GalleryValidation {
  // create
  static readonly CREATE = object({
    idHotel: string("Hotel id harus berupa string")
      .nonempty("Hotel id is required")
      .regex(/^[a-fA-F0-9]{24}$/, "Invalid hotel id"),
    images: custom<File[]>(
      (files) => files instanceof Array && files.length > 0,
      "file harus di isi"
    )
      .refine((file) => file.length <= 5, "maksimal upload 5 file")
      .refine((files) =>
        files.every(
          (file) => file.size <= MAX_FILE_SIZE,
          "maksimal ukuran file 2 mb"
        )
      )
      .refine((files) =>
        files.every(
          (file) => ACCEPTED_TYPES.includes(file.type),
          "file tidak valid"
        )
      ),
  }).strict() satisfies ZodType<GalleryCreateRequestType>;
}
