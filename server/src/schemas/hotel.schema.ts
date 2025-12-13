import { model, Schema } from "mongoose";
import { IHotel } from "../models/hotel-model";
import RoomModel from "./room.schema";

const HotelSchema = new Schema<IHotel>(
  {
    idFasilitas: [
      { type: Schema.Types.ObjectId, ref: "Fasilitas", required: true },
    ],
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    totalRoom: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

// delete room afte delete hotel
HotelSchema.pre("findOneAndDelete", async function () {
  const deleted = await this.model.findOne(this.getFilter());

  // cek deleted
  if (!deleted) return;

  // delete room schema
  await RoomModel.deleteMany({ idHotel: deleted._id });
});

// create model
const HotelModel = model<IHotel>("Hotel", HotelSchema);

// export
export default HotelModel;
