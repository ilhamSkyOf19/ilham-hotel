import { array, number, object, string, ZodType } from "zod";
import { RoomCreateRequestType } from "../models/room-model";

export class RoomValidation {
  // create
  static readonly CREATE = object({
    numberRoom: array(
      number("Room number is required").min(1, "Room number is required")
    ),
    idRoomType: string("Room type is required").min(1, "Room type is required"),
    idHotel: string("Hotel id is required").min(1, "Hotel id is required"),
  }).strict() satisfies ZodType<RoomCreateRequestType>;
}
