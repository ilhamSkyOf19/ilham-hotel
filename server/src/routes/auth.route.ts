import { Router } from "express";
import { AuthValidation } from "../validations/auth-validation";
import { UserCreateRequestType } from "../models/user-model";
import { AuthController } from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/vaidation.middleware";

// route auth
const authRoute: Router = Router();

// register
authRoute.post(
  "/register",
  validationMiddleware<UserCreateRequestType>(AuthValidation.REGISTER),
  AuthController.register
);

// export route auth
export default authRoute;
