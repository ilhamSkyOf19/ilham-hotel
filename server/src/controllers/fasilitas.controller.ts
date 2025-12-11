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
        fasilitas: body.fasilitas.toLowerCase().trim(),
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

  // read
  static async readAll(
    _req: Request,
    res: Response<ResponseType<FasilitasResponseType[] | []>>,
    next: NextFunction
  ) {
    try {
      // call service
      const response = await FasilitasService.readAll();

      // response success
      return res.status(200).json({
        status: "success",
        message: "fasilitas retrieved successfully",
        data: response,
      });
    } catch (error) {
      // cek error
      console.log(error);
      next(error);
    }
  }

  // update by id
  static async updateById(
    req: Request<{ id: string }, {}, FasilitasCreateRequestType>,
    res: Response<ResponseType<FasilitasResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id from params
      const { id } = req.params;

      // cek fasilitas by id
      const fasilitas = await FasilitasModel.findById(id);

      // cek fasilitas
      if (!fasilitas) {
        return res.status(400).json({
          status: "failed",
          message: "fasilitas not found",
          data: null,
        });
      }

      // call response for update
      const response = await FasilitasService.updateById(id, req.body);

      // response success
      return res.status(200).json({
        status: "success",
        message: "fasilitas updated successfully",
        data: response,
      });
    } catch (error) {
      // cek error
      console.log(error);
      next(error);
    }
  }

  // delete by id
  static async deleteById(
    req: Request<{ id: string }>,
    res: Response<ResponseType<FasilitasResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id
      const { id } = req.params;

      // cek fasilitas
      const fasilitas = await FasilitasModel.findById(id);

      // cek fasilitas
      if (!fasilitas) {
        return res.status(400).json({
          status: "failed",
          message: "fasilitas not found",
          data: null,
        });
      }

      // call service
      const response = await FasilitasService.deleteById(id);

      // response success
      return res.status(200).json({
        status: "success",
        message: "fasilitas deleted successfully",
        data: response,
      });
    } catch (error) {
      // cek error
      console.log(error);
      next(error);
    }
  }
}
