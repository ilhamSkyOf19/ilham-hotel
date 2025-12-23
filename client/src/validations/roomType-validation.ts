import { object, string, ZodType } from "zod";
import type {
  RoomTypeCreateRequestType,
  RoomTypeUpdateRequestType,
} from "../models/roomType-model";

export class RoomTypeValidation {
  // create
  static readonly CREATE = object({
    roomType: string("Room Type harus berupa string")
      .min(1, "Room Type harus diisi")
      .regex(/^[a-zA-Z\s]+$/, "Room Type tidak valid"),
  }).strict() satisfies ZodType<RoomTypeCreateRequestType>;

  // update
  static readonly UPDATE = object({
    roomType: string("Room Type harus berupa string")
      .min(1, "Room Type harus diisi")
      .regex(/^[a-zA-Z\s]+$/, "Room Type tidak valid"),
  }).strict() satisfies ZodType<Partial<RoomTypeUpdateRequestType>>;
}
