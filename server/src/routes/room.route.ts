import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { RoomController } from "../controllers/room.controller";
import { FileService } from "../services/file.service";

// inisialisasi
const roomRoute: Router = Router();

// read all public
roomRoute.get("/read", RoomController.readAll);

// read by room number
roomRoute.get("/read/room-number/:roomNumber", RoomController.readByRoomNumber);

// auth middleware
roomRoute.use(authMiddleware("admin"));

const uploadThumbnail = FileService.upload("rooms", "thumbnail");

// create
roomRoute.post(
  "/create",
  uploadThumbnail.single("thumbnail"),
  RoomController.create
);

// export
export default roomRoute;
