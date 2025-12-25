import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { ResponseType } from "../types/request-response";

const validationMiddlewareForQuery = <T>(schema: ZodType<T>) => {
  return async (
    req: Request<{}, {}, {}, T>,
    res: Response<ResponseType<null>>,
    next: NextFunction
  ) => {
    try {
      // cek body
      if (!req.query)
        return res.status(400).json({
          status: "failed",
          message: "invalid request",
          data: null,
        });

      // cek schema
      schema.parse(req.query);

      // return next
      return next();
    } catch (error) {
      // cek error
      //   console.log(error);

      // mapping error zod
      if (error instanceof ZodError) {
        // error message
        const errorMessages = error.issues.map((err) => err.message)[0];

        // return error
        return res.status(400).json({
          status: "failed",
          message: errorMessages,
          data: null,
        });
      }

      // another error
      return res.status(500).json({
        status: "failed",
        message: "internal server error",
        data: null,
      });
    }
  };
};

export default validationMiddlewareForQuery;
