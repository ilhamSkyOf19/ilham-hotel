import { model, Schema } from "mongoose";
import { ILocation } from "../models/location-model";

const LocationSchema = new Schema<ILocation>(
  {
    city: { type: String, required: true, lowercase: true },
    country: { type: String, required: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

// model
const LocationModel = model<ILocation>("Location", LocationSchema);

// export
export default LocationModel;
