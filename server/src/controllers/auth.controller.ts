import { NextFunction, Request, Response } from "express";
import { UserCreateRequestType, UserResponseType } from "../models/user-model";
import { ResponseType } from "../types/request-response";
import { AuthService } from "../services/auth.service";
import { PayloadType } from "../types/payload";
import jwt from "jsonwebtoken";

export class AuthController {
  // register
  static async register(
    req: Request<{}, {}, UserCreateRequestType>,
    res: Response<ResponseType<UserResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // cek user
      const user = await AuthService.readByEmailAndPhone(
        body.email,
        body.phone
      );

      //   cek user
      if (user) {
        return res.status(400).json({
          status: "failed",
          message: "User already exists",
          data: null,
        });
      }

      // creater user
      const response = await AuthService.create(body);

      // response
      res.status(200).json({
        status: "success",
        message: "success",
        data: response,
      });
    } catch (error) {
      // cek
      console.log(error);
      next(error);
    }
  }

  // activation code
  static async activationCode(
    req: Request<{}, {}, { code: number; email: string }>,
    res: Response<ResponseType<UserResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // update activation code
      const response = await AuthService.updateActivationCode(
        body.code,
        body.email
      );

      // cek response
      if (response.status === "failed") {
        return res.status(400).json({
          status: "failed",
          message: "Invalid activation code",
          data: null,
        });
      }

      //   generate token
      const payload: PayloadType = {
        _id: response.data?._id ?? "",
        fullName: response.data?.fullName ?? "",
        email: response.data?.email ?? "",
        role: response.data?.role ?? "",
      };

      // generate token
      const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
        expiresIn: "1h",
      });

      //   set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
      });

      // response
      res.status(200).json({
        status: "success",
        message: "success",
        data: response.data,
      });
    } catch (error) {
      // cek
      console.log(error);
      next(error);
    }
  }
}
