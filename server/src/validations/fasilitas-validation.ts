import { ZodType, object, string } from "zod";
import {
  FasilitasCreateRequestType,
  FasilitasUpdateRequestType,
} from "../models/fasilitas-model";

export class FasilitasValidation {
  // create
  static readonly CREATE = object({
    fasilitas: string("Fasilitas is required"),
  }).strict() satisfies ZodType<FasilitasCreateRequestType>;

  // update
  static readonly UPDATE = object({
    fasilitas: string("Fasilitas is required").min(1).optional(),
  }).strict() satisfies ZodType<FasilitasUpdateRequestType>;
}
