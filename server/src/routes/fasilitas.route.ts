import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/vaidation.middleware";
import { FasilitasValidation } from "../validations/fasilitas-validation";
import { FasilitasCreateRequestType } from "../models/fasilitas-model";
import { FasilitasController } from "../controllers/fasilitas.controller";

// inisialisasi route
const fasilitasRoute: Router = Router();

// read public
fasilitasRoute.get("/read", FasilitasController.readAll);

// cek auth admin
fasilitasRoute.use(authMiddleware("admin"));

// create fasilitas
fasilitasRoute.post(
  "/create",
  validationMiddleware<FasilitasCreateRequestType>(FasilitasValidation.CREATE),
  FasilitasController.create
);

// update fasilitas by id
fasilitasRoute.patch(
  "/update/:id",
  validationMiddleware<FasilitasCreateRequestType>(FasilitasValidation.CREATE),
  FasilitasController.updateById
);

// delete fasilitas by id
fasilitasRoute.delete("/delete/:id", FasilitasController.deleteById);

// export
export default fasilitasRoute;
