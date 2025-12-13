import { model, Schema, UpdateQuery } from "mongoose";
import { IFasilitas } from "../models/fasilitas-model";
import HotelModel from "./hotel.schema";

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

// convert to lowercase before save
FasilitasSchema.pre("save", async function () {
  if (this.fasilitas) {
    this.fasilitas = this.fasilitas.toLowerCase().trim();
  }
});

// convert to lowercase before update
FasilitasSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as UpdateQuery<IFasilitas>;

  if (!update) return;

  // CASE 1: Jika user pakai $set
  if (update.$set && update.$set.fasilitas) {
    update.$set.fasilitas = update.$set.fasilitas.toLowerCase();
  }

  // CASE 2: Jika user update tanpa $set
  if (update.fasilitas) {
    update.fasilitas = update.fasilitas.toLowerCase();
  }
});

// update room schema after delete fasilitas
FasilitasSchema.pre("findOneAndDelete", async function () {
  const deleted = await this.model.findOne(this.getFilter());
  if (!deleted) return;

  // Hapus semua room yg punya FK ke fasilitas ini
  await HotelModel.updateMany(
    { idFasilitas: deleted._id },
    { $pull: { idFasilitas: deleted._id } }
  );
});

// export model
const FasilitasModel = model<IFasilitas>("Fasilitas", FasilitasSchema);

// export default
export default FasilitasModel;
