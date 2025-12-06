import { Request } from "express";
import { PayloadType } from "./payload";

export type ResponseType<T> = {
  status: "success" | "failed";
  message: string;
  data: T;
};

// auth request
export interface AuthRequest<params = {}, _ = {}, body = {}, query = {}>
  extends Request<params, _, body, query> {
  data?: PayloadType;
}
