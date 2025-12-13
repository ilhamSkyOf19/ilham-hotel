import { ZodType } from "zod";
import { ResponseType } from "../types/request-response";

export const validation = <T>(schema: ZodType<T>, req: T): ResponseType<T> => {
  // cek result
  const result = schema.parse(req);

  // return success
  return {
    status: "success",
    message: "validation successful",
    data: result,
  };
};
