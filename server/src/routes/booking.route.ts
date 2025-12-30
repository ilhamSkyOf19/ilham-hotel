import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { BookingCreateRequestType } from "../models/booking-model";
import { BookingValidation } from "../validations/booking-validation";
import { BookingController } from "../controllers/booking.controller";

// inisialisasi router
const bookingRoute: Router = Router();

// auth middelware
bookingRoute.use(authMiddleware("admin"));

// payment
bookingRoute.post(
  "/payment-hotel",
  validationMiddleware<BookingCreateRequestType>(BookingValidation.CREATE),
  BookingController.booking
);

// export default
export default bookingRoute;
