import { NextFunction, Request, Response } from "express";
import {
  HotelCreateRequestType,
  HotelResponseType,
} from "../models/hotel-model";
import { ResponseType } from "../types/request-response";
import { validation } from "../validations/validation";
import { HotelValidation } from "../validations/hotel-validation";
import { FasilitasService } from "../services/fasilitas.service";
import { FileService } from "../services/file.service";
import { HotelService } from "../services/hotel.service";

export class HotelController {
  // create
  static async create(
    req: Request<{}, {}, HotelCreateRequestType>,
    res: Response<ResponseType<HotelResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body & validation
      const { data: body } = validation<HotelCreateRequestType>(
        HotelValidation.CREATE,
        req.body
      );

      // cek fasilitas existence
      const fasilitas = await FasilitasService.readByIdMany(
        body?.fasilitas || []
      );

      // cek if all fasilitas exist
      if (fasilitas.length !== body?.fasilitas.length) {
        // cek file
        if (req.file) {
          await FileService.deleteFileFromRequest(req.file.path);
        }
        return res.status(400).json({
          status: "failed",
          message: "fasilitas not found",
          data: null,
        });
      }

      // call service
      const response = await HotelService.create({
        ...body,
        idFasilitas: body.fasilitas,
        thumbnail: req.file?.filename || "",
      });

      //   cek response
      if (!response) {
        // delete uploaded file if exists
        if (req.file) {
          await FileService.deleteFileFromRequest(req.file.path);
        }
        return res.status(400).json({
          status: "failed",
          message: "Failed to create hotel",
          data: null,
        });
      }

      // return response
      return res.status(201).json({
        status: "success",
        message: "Hotel created successfully",
        data: response,
      });
    } catch (error) {
      // delete file if exists
      if (req.file) {
        await FileService.deleteFileFromRequest(req.file.path);
      }

      // call next with error
      console.log(error);
      next(error);
    }
  }

  // read
  static async readAll(
    _req: Request,
    res: Response<ResponseType<HotelResponseType[] | []>>,
    next: NextFunction
  ) {
    try {
      // call service
      const response = await HotelService.readAll();

      // return response
      return res.status(200).json({
        status: "success",
        message: "success retrieve all hotel",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }
}
