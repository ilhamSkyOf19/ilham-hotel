import type {
  RoomCreateRequestType,
  RoomRequestForInput,
} from "../models/room-validation";

import { z, ZodType } from "zod";

export class RoomValidation {
  static readonly CREATE = z
    .object({
      idHotel: z.string("Hotel is required").min(1, "Hotel is required"),

      roomType: z
        .array(
          z.object({
            idRoomType: z
              .string("Room type is required")
              .min(1, "Room type is required"),

            roomType: z
              .string("Room type name is required")
              .min(1, "Room type name is required"),
          })
        )
        .min(1, "Minimal harus ada 1 room type"),
    })
    .strict() satisfies ZodType<RoomRequestForInput>;
}
