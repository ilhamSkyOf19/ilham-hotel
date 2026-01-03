import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";

const pdfRoute: Router = Router();

pdfRoute.get("/ereceipt", BookingController.ereceipt);

export default pdfRoute;
