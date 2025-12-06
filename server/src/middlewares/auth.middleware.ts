import { NextFunction, Response } from "express";
import { AuthRequest, ResponseType } from "../types/request-response";
import { PayloadType } from "../types/payload";
import jwt from "jsonwebtoken";

const authMiddleware =
  (role: "customer" | "admin" | "activation") =>
  (
    req: AuthRequest,
    res: Response<ResponseType<PayloadType | null>>,
    next: NextFunction
  ) => {
    try {
      // get token from cookies
      const token = req.cookies?.token as string;

      // cek token
      if (!token) {
        return res.status(401).json({
          status: "failed",
          message: "Unauthorized",
          data: null,
        });
      }

      //   get payload
      const payload = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as PayloadType;

      // cek role
      switch (role) {
        case "admin":
          if (payload.role !== "admin") {
            return res.status(401).json({
              status: "failed",
              message: "Unauthorized admin",
              data: null,
            });
          }
          break;
        case "activation":
          if (payload.role !== "customer") {
            return res.status(401).json({
              status: "failed",
              message: "Unauthorized admin",
              data: null,
            });
          }
          break;
        case "customer":
          if (payload.role !== "customer" && payload.isActive === false) {
            return res.status(401).json({
              status: "failed",
              message: "Unauthorized customer",
              data: null,
            });
          }
          break;
        default:
          return res.status(401).json({
            status: "failed",
            message: "Unauthorized",
            data: null,
          });
      }

      //   set req data
      req.data = {
        _id: payload._id,
        fullName: payload.fullName,
        email: payload.email,
        role: payload.role,
        isActive: payload.isActive,
        createAt: payload.createAt,
        updatedAt: payload.updatedAt,
      };

      // next
      next();
    } catch (error) {
      // return error
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized",
        data: null,
      });
    }
  };

//   export middleware
export default authMiddleware;
