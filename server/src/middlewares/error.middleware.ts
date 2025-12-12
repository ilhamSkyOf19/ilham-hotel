import { Request, Response, NextFunction } from "express";
import { ResponseType } from "../types/request-response";
import { ZodError } from "zod";
import { MulterError } from "multer";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response<ResponseType<null>>,
  _next: NextFunction
) => {
  try {
    console.log(err);

    // error from multer
    if (err instanceof MulterError) {
      switch (err.code) {
        case "LIMIT_FILE_SIZE":
          return res.status(400).json({
            status: "failed",
            message: "File size is too large",
            data: null,
          });

        case "LIMIT_FILE_COUNT":
          return res.status(400).json({
            status: "failed",
            message: "File count is too large",
            data: null,
          });

        case "LIMIT_UNEXPECTED_FILE":
          return res.status(400).json({
            status: "failed",
            message: "File count not expected",
            data: null,
          });
      }
    }

    // cek error form validation
    if (err instanceof ZodError) {
      // map error
      const errorMessages = err.issues.map((err) => err.message)[0];

      // return response
      return res.status(400).json({
        status: "failed",
        message: errorMessages,
        data: null,
      });
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
