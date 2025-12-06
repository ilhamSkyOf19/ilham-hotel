import { NextFunction, Request, Response } from "express";
import { UserCreateRequestType, UserResponseType } from "../models/user-model";
import { AuthRequest, ResponseType } from "../types/request-response";
import { AuthService } from "../services/auth.service";
import { PayloadType } from "../types/payload";
import jwt from "jsonwebtoken";
import { email } from "zod";

export class AuthController {
  // get auth user
  static async getAuthUser(
    req: AuthRequest,
    res: Response<ResponseType<PayloadType | null>>
  ) {
    try {
      // get email from req
      const email = req.data?.email ?? "";

      // get auth user
      const response = await AuthService.getAuthUser(email);

      // return response
      return res.status(200).json({
        status: "success",
        message: "success",
        data: {
          _id: response?._id ?? "",
          fullName: response?.fullName ?? "",
          email: response?.email ?? "",
          isActive: response?.isActive ?? false,
          role: response?.role ?? "customer",
          createAt: response?.createdAt ?? "",
          updatedAt: response?.updatedAt ?? "",
        },
      });
    } catch (error) {
      // return error
      return res.status(500).json({
        status: "failed",
        message: "Internal server error",
        data: null,
      });
    }
  }
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
        return res.status(409).json({
          status: "failed",
          message: "User already exists",
          data: null,
        });
      }

      // creater user
      const response = await AuthService.create(body);

      //   generate token
      const payload: PayloadType = {
        _id: response?._id ?? "",
        fullName: response?.fullName ?? "",
        email: response?.email ?? "",
        isActive: response?.isActive ?? false,
        role: response?.role ?? "customer",
        createAt: response?.createdAt ?? "",
        updatedAt: response?.updatedAt ?? "",
      };

      // generate token
      const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
        expiresIn: "1h",
      });

      //   set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // ⬅️ development
        sameSite: "lax", // NONE tidak boleh jika secure:false
        maxAge: 60 * 60 * 1000,
      });

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
    req: AuthRequest<{}, {}, { code: number }>,
    res: Response<ResponseType<UserResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // get email from req data
      const email = req.data?.email ?? "";

      // update activation code
      const response = await AuthService.updateActivationCode(body.code, email);

      // cek response
      if (response.status === "failed") {
        return res.status(410).json({
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
        isActive: response.data?.isActive ?? false,
        role: response.data?.role ?? "customer",
        createAt: response.data?.createdAt ?? "",
        updatedAt: response.data?.updatedAt ?? "",
      };

      // generate token
      const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
        expiresIn: "1h",
      });

      //   set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // ⬅️ development
        sameSite: "lax", // NONE tidak boleh jika secure:false
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

  // resend
  static async resend(
    req: AuthRequest,
    res: Response<ResponseType<UserResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get email from req data
      const email = req.data?.email ?? { email: "" };

      // cek user
      const user = await AuthService.readUserByEmail(email as string);

      // cek user
      if (!user) {
        return res.status(409).json({
          status: "failed",
          message: "User not found",
          data: null,
        });
      }

      // cek activate
      if (user.isActive === true) {
        return res.status(409).json({
          status: "failed",
          message: "User already activated",
          data: null,
        });
      }

      // update activation code
      const response = await AuthService.resend(email as string);

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
}
