import { refine, z, ZodType } from "zod";
import { RoomCreateRequestType } from "../models/room-model";

export class RoomValidation {
  // create
  static readonly CREATE = z
    .object({
      roomNumber: z
        .number("Room Number harus berupa angka")
        .min(1, "Room Number minimal 1"),

      roomType: z.string().regex(/^[0-9a-fA-F]{24}$/), // valid ObjectId

      fasilitas: z
        .string("Fasilitas harus berupa array of string")
        .transform((val) => {
          try {
            return JSON.parse(val);
          } catch (error) {
            throw new Error("Fasilitas harus berupa array of string");
          }
        })
        .refine((arr) => {
          return (
            Array.isArray(arr) &&
            arr.every(
              (item) =>
                typeof item === "string" && /^[0-9a-fA-F]{24}$/.test(item)
            )
          );
        }),

      status: z.enum(["available", "unavailable"]),

      description: z
        .string("Description harus berupa string")
        .min(3, "Description minimal 3 karakter"),

      floor: z
        .number("Floor harus berupa angka")
        .int("Floor harus berupa angka")
        .min(1, "Floor minimal 1"),
    })
    .strict() satisfies ZodType<RoomCreateRequestType>;
}
