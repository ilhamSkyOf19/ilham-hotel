import { model, Schema } from "mongoose";
import { IGallery } from "../models/gallery-model";

const GallerySchema = new Schema<IGallery>(
  {
    idHotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

// model
const GalleryModel = model<IGallery>("Gallery", GallerySchema);

// export
export default GalleryModel;
