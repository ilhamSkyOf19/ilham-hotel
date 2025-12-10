import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { RoomTypeCreateRequest } from "../models/roomType-model";
import { RoomTypeValidation } from "../validations/roomType-validation";
import { RoomTypeController } from "../controllers/roomType.controller";

// inisialisasi route
const roomTypeRoute: Router = Router();

// auth middleware
roomTypeRoute.use(authMiddleware("admin"));

// create
roomTypeRoute.post(
  "/create",
  validationMiddleware<RoomTypeCreateRequest>(RoomTypeValidation.CREATE),
  RoomTypeController.create
);

// export
export default roomTypeRoute;
