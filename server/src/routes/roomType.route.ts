import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import {
  RoomTypeCreateRequestType,
  RoomTypeUpdateRequestType,
} from "../models/roomType-model";
import { RoomTypeValidation } from "../validations/roomType-validation";
import { RoomTypeController } from "../controllers/roomType.controller";

// inisialisasi route
const roomTypeRoute: Router = Router();

// read all public
roomTypeRoute.get("/read", RoomTypeController.readAll);

// auth middleware
roomTypeRoute.use(authMiddleware("admin"));

// create
roomTypeRoute.post(
  "/create",
  validationMiddleware<RoomTypeCreateRequestType>(RoomTypeValidation.CREATE),
  RoomTypeController.create
);

// update
roomTypeRoute.patch(
  "/update/:id",
  validationMiddleware<RoomTypeUpdateRequestType>(RoomTypeValidation.UPDATE),
  RoomTypeController.updateById
);

// delete
roomTypeRoute.delete("/delete/:id", RoomTypeController.deleteById);

// export
export default roomTypeRoute;
