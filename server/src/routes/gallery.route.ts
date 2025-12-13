import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { FileService } from "../services/file.service";
import { GalleryController } from "../controllers/gallery.controller";

// inisialisasi route
const galleryRoute: Router = Router();

// inisialisasi file service
const upload = FileService.upload("galleries", "images");

// auth middleware
galleryRoute.use(authMiddleware("admin"));

// create
galleryRoute.post(
  "/create",
  upload.array("images", 2),
  GalleryController.create
);

// export
export default galleryRoute;
