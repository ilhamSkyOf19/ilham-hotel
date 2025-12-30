import { number, object, string, ZodType } from "zod";
import type { ReviewCreateRequestType } from "../models/review-model";

export class ReviewValidation {
  // create
  static readonly CREATFE = object({
    hotel: string("Id Hotel harus berupa string").regex(
      /^[0-9a-fA-F]{24}$/,
      "Id Hotel tidak valid"
    ),
    review: string("Review harus berupa string")
      .min(1, "minimal 1 karakter")
      .max(50, "maksimal 50 karakter"),
    rating: number("Rating harus berupa number")
      .min(1, "minimal 1")
      .max(5, "maksimal 5"),
  }).strict() satisfies ZodType<ReviewCreateRequestType>;
}
