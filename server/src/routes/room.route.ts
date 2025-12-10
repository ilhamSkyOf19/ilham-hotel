import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { RoomCreateRequest } from "../models/room-model";
import { RoomValidation } from "../validations/room-validation";
import { RoomController } from "../controllers/room.controller";

// inisialisasi
const roomRoute: Router = Router();

// auth middleware
roomRoute.use(authMiddleware("admin"));

// create
roomRoute.post(
  "/create",
  validationMiddleware<RoomCreateRequest>(RoomValidation.create),
  RoomController.create
);

// export
export default roomRoute;
