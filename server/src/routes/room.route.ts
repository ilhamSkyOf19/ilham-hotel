// inisialisasi
import { Router } from "express";
import { RoomController } from "../controllers/room.controller";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { RoomCreateRequestType } from "../models/room-model";
import { RoomValidation } from "../validations/room-validation";

// inisialisasi route
const roomRoute: Router = Router();

// read all
roomRoute.get("/read", RoomController.readAll);

// read detial
roomRoute.get("/read-detail/:id", RoomController.readById);

// auth middleware
roomRoute.use(authMiddleware("admin"));

// create
roomRoute.post(
  "/create",
  validationMiddleware<RoomCreateRequestType>(RoomValidation.CREATE),
  RoomController.create
);

// export
export default roomRoute;
