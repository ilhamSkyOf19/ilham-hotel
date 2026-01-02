import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { LocationCreateRequestType } from "../models/location-model";
import { LocationValidation } from "../validations/location-validation";
import { LocationController } from "../controllers/location.controller";

const locationRoute: Router = Router();

// read all
locationRoute.get("/read-all", LocationController.readAll);

// auth middleware
locationRoute.use(authMiddleware("admin"));

// create
locationRoute.post(
  "/create",
  validationMiddleware<LocationCreateRequestType>(LocationValidation.CREATE),
  LocationController.create
);

// export
export default locationRoute;
