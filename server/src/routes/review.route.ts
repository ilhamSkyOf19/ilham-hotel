import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { ReviewValidation } from "../validations/review-validation";
import { ReviewCreateRequestType } from "../models/review-model";
import { ReviewController } from "../controllers/review.controller";

// inisialisasi route
const reviewRoute: Router = Router();

// read all by id hotel
reviewRoute.get(
  "/read-all-by-id-hotel/:idHotel",
  ReviewController.readAllReviewByIdHotel
);

// auth middleware
reviewRoute.use(authMiddleware("admin"));

// create
reviewRoute.post(
  "/create",
  validationMiddleware<ReviewCreateRequestType>(ReviewValidation.CREATFE),
  ReviewController.create
);

// export default
export default reviewRoute;
