import type { RoomRequestForInput } from "../models/room-validation";

import { array, z, ZodType } from "zod";

export class RoomValidation {
  static readonly CREATE = z
    .object({
      idHotel: z.string("Hotel is required").min(1, "Hotel is required"),

      rooms: z
        .array(
          z.object({
            idRoomType: z
              .string("Room type is required")
              .min(1, "Room type is required"),

            numberRoom: array(
              z
                .number("Room number is required")
                .min(1, "Room number is required")
            ),
          })
        )
        .min(1, "Minimal harus ada 1 room type"),
    })
    .strict() satisfies ZodType<RoomRequestForInput>;
}
