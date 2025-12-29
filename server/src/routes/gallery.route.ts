import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { FileService } from "../services/file.service";
import { GalleryController } from "../controllers/gallery.controller";

// inisialisasi route
const galleryRoute: Router = Router();

// inisialisasi file service
const upload = FileService.upload("galleries", "images");

// read by id hotel
galleryRoute.get("/read-by-id-hotel/:idHotel", GalleryController.readByIdHotel);

// auth middleware
galleryRoute.use(authMiddleware("admin"));

// create
galleryRoute.post(
  "/create",
  upload.array("images", 5),
  GalleryController.create
);

// export
export default galleryRoute;
