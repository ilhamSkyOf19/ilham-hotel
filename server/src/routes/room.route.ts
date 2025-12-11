import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { RoomCreateRequestType } from "../models/room-model";
import { RoomValidation } from "../validations/room-validation";
import { RoomController } from "../controllers/room.controller";

// inisialisasi
const roomRoute: Router = Router();

// read all public
roomRoute.get("/read", RoomController.readAll);

// read by room number
roomRoute.get("/read/room-number/:roomNumber", RoomController.readByRoomNumber);

// auth middleware
roomRoute.use(authMiddleware("admin"));

// create
roomRoute.post(
  "/create",
  validationMiddleware<RoomCreateRequestType>(RoomValidation.create),
  RoomController.create
);

// export
export default roomRoute;
