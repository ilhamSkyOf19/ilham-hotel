import { model, Schema } from "mongoose";
import { IBooking } from "../models/booking-model";

// inisialisasi schema
const BookingSchema = new Schema<IBooking>(
  {
    _id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
      required: true,
    },
    active: { type: Boolean, required: true, default: false },
    token: { type: String, required: true },
    visitor: { type: Number, required: true },
    room: { type: Number, required: true },
    holdUntil: { type: Date, required: false },
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
