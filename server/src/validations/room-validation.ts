import { z, ZodType } from "zod";
import { RoomCreateRequest } from "../models/room-model";

export class RoomValidation {
  // create
  static readonly create = z
    .object({
      roomNumber: z.number().min(1),

      roomType: z.string().regex(/^[0-9a-fA-F]{24}$/), // valid ObjectId

      fasilitas: z
        .array(
          z.string().regex(/^[0-9a-fA-F]{24}$/) // ObjectId
        )
        .nonempty(),

      status: z.enum(["available", "unavailable"]),

      description: z.string().min(3),

      floor: z.number().int().min(1),
    })
    .strict() satisfies ZodType<RoomCreateRequest>;
}
