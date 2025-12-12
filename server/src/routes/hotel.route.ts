import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { FileService } from "../services/file.service";

// inisialisasi route
const hotelRoute: Router = Router();

// inisialisasi file service
const upload = FileService.upload("hotels", "thumbnail");

// read all
hotelRoute.get("/read", HotelController.readAll);

// auth middleware
hotelRoute.use(authMiddleware("admin"));

// create
hotelRoute.post("/create", upload.single("thumbnail"), HotelController.create);

// export
export default hotelRoute;
