import { model, Schema } from "mongoose";
import { IBooking } from "../models/booking-model";

// inisialisasi schema
const BookingSchema = new Schema<IBooking>(
  {
    _id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    hotel: { type: Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
      required: true,
    },
    active: { type: Boolean, required: false },
    token: { type: String, required: true },
    visitor: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// inisialisasi model
const BookingModel = model("booking", BookingSchema);

// return default
export default BookingModel;
