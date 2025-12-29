import { model, Schema } from "mongoose";
import { iReview } from "../models/review-model";

// review schema
const ReviewScema = new Schema<iReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// inisialisasi model review
const ReviewModel = model<iReview>("Review", ReviewScema);

// export
export default ReviewModel;
