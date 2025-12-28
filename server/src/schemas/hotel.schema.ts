import { model, Schema } from "mongoose";
import { IHotel } from "../models/hotel-model";

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

// index

HotelSchema.index({
  name: "text",
  city: "text",
  country: "text",
});

// create model
const HotelModel = model<IHotel>("Hotel", HotelSchema);

// export
export default HotelModel;
