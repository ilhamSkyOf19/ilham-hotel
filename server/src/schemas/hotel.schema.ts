import { model, Schema } from "mongoose";
import { IHotel } from "../models/hotel-model";

const HotelSchema = new Schema<IHotel>(
  {
    idFasilitas: [
      { type: Schema.Types.ObjectId, ref: "Fasilitas", required: true },
    ],
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    totalRoom: { type: Number, required: true },
    taxAndFees: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    linkMaps: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// index

HotelSchema.index({
  name: "text",
});

// create model
const HotelModel = model<IHotel>("Hotel", HotelSchema);

// export
export default HotelModel;
