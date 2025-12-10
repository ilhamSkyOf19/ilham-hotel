import { model, Schema } from "mongoose";
import { IFasilitas } from "../models/fasilitas-model";

const FasilitasSchema = new Schema<IFasilitas>(
  {
    fasilitas: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
); // TODO: add fields here

// export model
const FasilitasModel = model<IFasilitas>("Fasilitas", FasilitasSchema);

// export default
export default FasilitasModel;
