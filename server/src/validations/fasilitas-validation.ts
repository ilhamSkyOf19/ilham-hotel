import { ZodType, object, string } from "zod";
import { FasilitasCreateRequestType } from "../models/fasilitas-model";

export class FasilitasValidation {
  static readonly CREATE = object({
    fasilitas: string("Fasilitas is required"),
  }).strict() satisfies ZodType<FasilitasCreateRequestType>;
}
