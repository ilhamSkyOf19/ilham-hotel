import { Router } from "express";
import { BookingCallBackController } from "../controllers/booking-callback.controller";

// inisialisasi router
const bookingCallbackRoute: Router = Router();

// payment
bookingCallbackRoute.post(
  "/booking-callback",
  BookingCallBackController.callback
);

// export default
export default bookingCallbackRoute;
