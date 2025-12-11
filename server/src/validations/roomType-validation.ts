import { object, string, ZodType } from "zod";
import {
  RoomTypeCreateRequestType,
  RoomTypeUpdateRequestType,
} from "../models/roomType-model";

export class RoomTypeValidation {
  // create
  static readonly CREATE = object({
    roomType: string("Room Type harus berupa string").min(
      1,
      "Room Type tidak boleh kosong"
    ),
  }).strict() satisfies ZodType<RoomTypeCreateRequestType>;

  // update
  static readonly UPDATE = object({
    roomType: string("Room Type harus berupa string").min(
      1,
      "Room Type minimal 1 karakter"
    ),
  }).strict() satisfies ZodType<Partial<RoomTypeUpdateRequestType>>;
}
