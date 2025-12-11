import { ZodType, object, string } from "zod";
import {
  FasilitasCreateRequestType,
  FasilitasUpdateRequestType,
} from "../models/fasilitas-model";

export class FasilitasValidation {
  // create
  static readonly CREATE = object({
    fasilitas: string("Fasilitas berupa string").min(
      1,
      "Fasilitas minimal 1 karakter"
    ),
  }).strict() satisfies ZodType<FasilitasCreateRequestType>;

  // update
  static readonly UPDATE = object({
    fasilitas: string("Fasilitas berupa string").min(
      1,
      "Fasilitas minimal 1 karakter"
    ),
  }).strict() satisfies ZodType<FasilitasUpdateRequestType>;
}
