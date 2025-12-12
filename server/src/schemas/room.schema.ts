import { model, Schema } from "mongoose";
import { IRoom } from "../models/room-model";

// inisialisasi
const RoomSchema = new Schema<IRoom>(
  {
    idHotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    idRoomType: {
      type: Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
    },
    numberRoom: { type: [Number], required: true },
    bookedRoom: { type: [Number], required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

// model
const RoomModel = model<IRoom>("Room", RoomSchema);

// export
export default RoomModel;
