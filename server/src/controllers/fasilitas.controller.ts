import { NextFunction, Request, Response } from "express";
import {
  FasilitasCreateRequestType,
  FasilitasResponseType,
} from "../models/fasilitas-model";
import { ResponseType } from "../types/request-response";
import { FasilitasService } from "../services/fasilitas.service";
import FasilitasModel from "../schemas/fasilitas.schema";

export class FasilitasController {
  // create
  static async create(
    req: Request<{}, {}, FasilitasCreateRequestType>,
    res: Response<ResponseType<FasilitasResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // cek find fasilitas
      const fasilitas = await FasilitasModel.findOne({
        fasilitas: body.fasilitas,
      });

      // cek fasilitas
      if (fasilitas) {
        return res.status(400).json({
          status: "failed",
          message: "fasilitas already exist",
          data: null,
        });
      }

      // call service
      const response = await FasilitasService.create(body);

      // cek response
      if (!response) {
        return res.status(400).json({
          status: "failed",
          message: "invalid request",
          data: null,
        });
      }

      // response success
      return res.status(200).json({
        status: "success",
        message: "fasilitas created",
        data: response,
      });
    } catch (error) {
      // cek error
      console.log(error);
      next(error);
    }
  }
}
