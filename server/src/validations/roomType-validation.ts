import { object, string, ZodType } from "zod";
import { RoomTypeCreateRequest } from "../models/roomType-model";

export class RoomTypeValidation {
  static readonly CREATE = object({
    roomType: string("Room type is required"),
  }).strict() satisfies ZodType<RoomTypeCreateRequest>;
}
