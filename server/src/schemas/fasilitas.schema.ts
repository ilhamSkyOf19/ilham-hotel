import { model, Schema } from "mongoose";
import { IFasilitas } from "../models/fasilitas-model";
import RoomModel from "./room.schema";

// create schema
const FasilitasSchema = new Schema<IFasilitas>(
  {
    fasilitas: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// update room schema
FasilitasSchema.pre("findOneAndUpdate", async function () {
  const deleted = await this.model.findOne(this.getFilter());

  // cek deleted
  if (!deleted) return;

  // update room schema
  await RoomModel.updateMany(
    { fasilitas: deleted._id },
    { $set: { updatedAt: new Date() } }
  );
});

// export model
const FasilitasModel = model<IFasilitas>("Fasilitas", FasilitasSchema);

// export default
export default FasilitasModel;
