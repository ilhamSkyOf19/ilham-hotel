import { object, string, ZodType } from "zod";
import type { FasilitasCreateRequestType } from "../models/fasilitas-model";

export class FasilitasValidation {
  // create
  static readonly CREATE = object({
    fasilitas: string("Fasilitas berupa string")
      .min(1, "Fasilitas harus diisi")
      .regex(/^[a-zA-Z\s]+$/, "Fasilitas tidak valid"),
  }).strict() satisfies ZodType<FasilitasCreateRequestType>;
}
