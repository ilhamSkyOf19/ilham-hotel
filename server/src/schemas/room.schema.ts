import { model, Schema } from "mongoose";
import { IRoom } from "../models/room-model";

const RoomSchema = new Schema<IRoom>(
  {
    roomNumber: { type: Number, required: true, unique: true },
    roomType: { type: Schema.Types.ObjectId, ref: "RoomType", required: true },
    fasilitas: [
      { type: Schema.Types.ObjectId, ref: "Fasilitas", required: true },
    ],
    status: {
      type: String,
      enum: ["available", "unavailable"],
      required: true,
    },
    description: { type: String, required: true },
    floor: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// create model
const RoomModel = model<IRoom>("Room", RoomSchema);

// export
export default RoomModel;
