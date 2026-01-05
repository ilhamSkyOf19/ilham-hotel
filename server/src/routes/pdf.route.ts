import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import authMiddleware from "../middlewares/auth.middleware";

const pdfRoute: Router = Router();

// auth middleware
pdfRoute.use(authMiddleware("user"));

pdfRoute.get("/ereceipt/:idBooking", BookingController.ereceipt);

export default pdfRoute;
