import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { BookingCreateRequestType } from "../models/booking-model";
import { BookingValidation } from "../validations/booking-validation";
import { BookingController } from "../controllers/booking.controller";

// inisialisasi router
const bookingRoute: Router = Router();

// auth middelware
bookingRoute.use(authMiddleware("user"));

// get booking
bookingRoute.get("/read", BookingController.readBookings);

// get id booking is pending
bookingRoute.get(
  "/get-id-booking/:idHotel",
  BookingController.getIdBookingIsPending
);

//  read detail
bookingRoute.get("/read-detail/:id", BookingController.readDetail);

// payment
bookingRoute.post(
  "/",
  validationMiddleware<BookingCreateRequestType>(BookingValidation.CREATE),
  BookingController.booking
);
// export default
export default bookingRoute;
