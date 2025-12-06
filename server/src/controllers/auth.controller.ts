import { NextFunction, Request, Response } from "express";
import {
  UserCreateRequestType,
  UserLoginRequestType,
  UserResponseType,
} from "../models/user-model";
import { AuthRequest, ResponseType } from "../types/request-response";
import { AuthService } from "../services/auth.service";
import { PayloadType } from "../types/payload";
import jwt from "jsonwebtoken";

export class AuthController {
  // get auth user
  static async getAuthUserForActivation(
    req: AuthRequest,
    res: Response<ResponseType<PayloadType | null>>
  ) {
    try {
      // get email from req
      const email = req.data?.email ?? "";

      // get auth user
      const response = await AuthService.getAuthUserForActivation(email);

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
    res: Response<
      ResponseType<Omit<UserResponseType, "isActive" | "_id"> | null>
    >,
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
        data: {
          fullName: response?.fullName ?? "",
          email: response?.email ?? "",
          role: response?.role ?? "customer",
          phone: response?.phone ?? "",
          avatar: response?.avatar ?? "",
          createdAt: response?.createdAt ?? "",
          updatedAt: response?.updatedAt ?? "",
        },
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

  // login
  static async login(
    req: Request<{}, {}, UserLoginRequestType>,
    res: Response<
      ResponseType<Pick<
        UserResponseType,
        "email" | "fullName" | "role" | "phone" | "avatar"
      > | null>
    >,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // find user by email
      const user = await AuthService.login(body);

      // cek user
      if (user?.status === "failed") {
        return res.status(400).json(user);
      }

      // generate token
      const payload: PayloadType = {
        _id: user.data?._id ?? "",
        fullName: user.data?.fullName ?? "",
        email: user.data?.email ?? "",
        isActive: user.data?.isActive ?? false,
        role: user.data?.role ?? "customer",
        createAt: user.data?.createdAt ?? "",
        updatedAt: user.data?.updatedAt ?? "",
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
        data: {
          fullName: user.data?.fullName ?? "",
          email: user.data?.email ?? "",
          phone: user.data?.phone ?? "",
          role: user.data?.role ?? "customer",
          avatar: user.data?.avatar ?? "",
        },
      });
    } catch (error) {
      // cek
      console.log(error);
      next(error);
    }
  }

  // get user for auth
  static async getAuthUser(
    req: AuthRequest,
    res: Response<
      ResponseType<Omit<UserResponseType, "_id" | "isActive"> | null>
    >,
    next: NextFunction
  ) {
    try {
      // get email from req data
      const email = req.data?.email ?? { email: "" };

      // cek user
      const user = await AuthService.getAuthUser(email as string);

      // cek user
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "Unauthorized",
          data: null,
        });
      }
      // response
      res.status(200).json({
        status: "success",
        message: "success",
        data: {
          fullName: user?.fullName ?? "",
          email: user?.email ?? "",
          phone: user?.phone ?? "",
          role: user?.role ?? "customer",
          avatar: user?.avatar ?? "",
          createdAt: user?.createdAt ?? "",
          updatedAt: user?.updatedAt ?? "",
        },
      });
    } catch (error) {
      // cek
      console.log(error);
      next(error);
    }
  }
}
