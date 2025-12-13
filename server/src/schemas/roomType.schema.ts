import { model, Schema, UpdateQuery } from "mongoose";
import { IRoomType } from "../models/roomType-model";
import RoomModel from "./room.schema";

const RoomTypeSchema = new Schema<IRoomType>(
  {
    roomType: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

// convert to lowercase before save
RoomTypeSchema.pre("save", async function () {
  if (this.roomType) {
    this.roomType = this.roomType.toLowerCase().trim();
  }
});

// convert to lowercase before update
RoomTypeSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as UpdateQuery<IRoomType>;
  // celek update
  if (!update) return;

  // if user update with $set
  if (update.$set && update.$set.roomType) {
    update.$set.roomType = update.$set.roomType.toLowerCase().trim();
    this.setUpdate(update);
  }
  // if user update no $set
  if (update.roomType) {
    update.roomType = update.roomType.toLowerCase();
    this.setUpdate(update);
  }
});

// update room schema
RoomTypeSchema.pre("findOneAndDelete", async function () {
  const deleted = await this.model.findOne(this.getFilter());
  if (!deleted) return;

  // Hapus semua room yg punya FK ke roomType ini
  await RoomModel.updateMany(
    { idRoomType: deleted._id },
    {
      $set: { idRoomType: null },
    }
  );
});

// export model
const RoomTypeModel = model<IRoomType>("RoomType", RoomTypeSchema);

// export default
export default RoomTypeModel;
