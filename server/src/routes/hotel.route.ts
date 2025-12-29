import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { FileService } from "../services/file.service";
import validationMiddlewareForQuery from "../middlewares/validationQuery.middleware";
import { FilterTypeForQuery } from "../models/hotel-model";
import { HotelValidation } from "../validations/hotel-validation";

// inisialisasi route
const hotelRoute: Router = Router();

// inisialisasi file service
const upload = FileService.upload("galleries", "thumbnail");

// read all
hotelRoute.get("/read", HotelController.readAll);

// read by id, get data total room & id
hotelRoute.get("/read-total-room/:id", HotelController.readByIdGetTotalRoom);

// read detail by id
hotelRoute.get("/read-detail/:id", HotelController.readDetail);

// read by filter
hotelRoute.get(
  "/read-by-filter",
  validationMiddlewareForQuery<FilterTypeForQuery>(HotelValidation.FILTER),
  HotelController.readByFilter
);

// read for display
hotelRoute.get("/read-for-display", HotelController.readForDisplay);

// auth middleware
hotelRoute.use(authMiddleware("admin"));

// create
hotelRoute.post("/create", upload.single("thumbnail"), HotelController.create);

// export
export default hotelRoute;
