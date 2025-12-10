import { model, Schema } from "mongoose";
import { IRoomType } from "../models/roomType-model";

const RoomTypeSchema = new Schema<IRoomType>(
  {
    roomType: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

// export model
const RoomTypeModel = model<IRoomType>("RoomType", RoomTypeSchema);

// export default
export default RoomTypeModel;
