import { Request, Response, NextFunction } from "express";
import { ResponseType } from "../types/request-response";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response<ResponseType<null>>,
  _next: NextFunction
) => {
  try {
    console.log(err);

    // cek error form validation
    if (err instanceof ZodError) {
      // map error
      const errorMessages = err.issues.map((err) => err.message)[0];

      // return response
      return {
        status: "failed",
        message: errorMessages,
        data: null,
      };
    }

    // cek error dari mongoose duplicate key
    if (err.code === 11000) {
      return res.status(409).json({
        status: "failed",
        message: "User already exists",
        data: null,
      });
    }

    return res.status(500).json({
      status: "failed",
      message: err.message || "Internal server error",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
      data: null,
    });
  }
};
