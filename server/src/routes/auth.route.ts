import { Router } from "express";
import { AuthValidation } from "../validations/auth-validation";
import { UserCreateRequestType } from "../models/user-model";
import { AuthController } from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/vaidation.middleware";
import authMiddleware from "../middlewares/auth.middleware";

// route auth
const authRoute: Router = Router();

// register
authRoute.post(
  "/register",
  validationMiddleware<UserCreateRequestType>(AuthValidation.REGISTER),
  AuthController.register
);

// login
authRoute.post(
  "/login",
  validationMiddleware(AuthValidation.LOGIN),
  AuthController.login
);

// get auth user
authRoute.get(
  "/get-auth",
  authMiddleware("customer"),
  AuthController.getAuthUser
);

// activation code
authRoute.post(
  "/activation",
  authMiddleware("activation"),
  validationMiddleware(AuthValidation.ACTIVATION_CODE),
  AuthController.activationCode
);

// get auth
authRoute.get(
  "/get-auth-activation",
  authMiddleware("activation"),
  AuthController.getAuthUserForActivation
);

// resend
authRoute.post("/resend", authMiddleware("activation"), AuthController.resend);

// export route auth
export default authRoute;
