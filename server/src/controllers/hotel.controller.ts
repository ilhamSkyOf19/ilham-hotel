import { NextFunction, Request, Response } from "express";
import {
  FilterTypeForQuery,
  HotelCreateRequestType,
  HotelResponseForDisplayType,
  HotelResponseType,
} from "../models/hotel-model";
import { ResponseType } from "../types/request-response";
import { validation } from "../validations/validation";
import { HotelValidation } from "../validations/hotel-validation";
import { FasilitasService } from "../services/fasilitas.service";
import { FileService } from "../services/file.service";
import { HotelService } from "../services/hotel.service";
import { GalleryService } from "../services/gallery.service";

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

      // call service gallery add
      await GalleryService.create({
        idHotel: response._id,
        images: [response.thumbnail],
      });

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

  // read for display
  static async readForDisplay(
    _req: Request,
    res: Response<ResponseType<HotelResponseForDisplayType[] | []>>,
    next: NextFunction
  ) {
    try {
      // call service
      const response = await HotelService.readForDisplay();

      // return
      return res.status(200).json({
        status: "success",
        message: "success retrieve all hotel for display",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }

  // read by id, get data total room & id
  static async readByIdGetTotalRoom(
    req: Request<{ id: string }>,
    res: Response<ResponseType<{ totalRoom: number } | null>>,
    next: NextFunction
  ) {
    try {
      // get id from params
      const { id } = req.params;

      // call service
      const response = await HotelService.readByIdGetTotalRoom(id);

      // return response
      return res.status(200).json({
        status: "success",
        message: "success retrieve total room by id hotel",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }

  // read by filter
  static async readByFilter(
    req: Request<{}, {}, {}, FilterTypeForQuery>,
    res: Response<ResponseType<HotelResponseForDisplayType[] | []>>,
    next: NextFunction
  ) {
    try {
      // get query from params
      const { fasilitas, maxPrice, minPrice, search, location } = req.query;

      // conver fasilitas
      const fasilitasArray: string[] = fasilitas ? fasilitas.split(",") : [];

      // call service
      const response = await HotelService.readHotelByFilter({
        fasilitas: fasilitasArray,
        minPrice: Number(minPrice || ""),
        maxPrice: Number(maxPrice || ""),
        search,
        location,
      });

      // return response
      return res.status(200).json({
        status: "success",
        message: "success read hotel",
        data: response,
      });
    } catch (error) {
      // cek error
      console.log(error);
      next(error);
    }
  }

  // read detail by id full data
  static async readDetail(
    req: Request<{ id: string }>,
    res: Response<ResponseType<HotelResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id from params
      const { id } = req.params;

      // get service
      const response = await HotelService.readById(id);

      // cek response
      if (!response) {
        return res.status(400).json({
          status: "failed",
          message: "data not found",
          data: null,
        });
      }

      // return response
      return res.status(200).json({
        status: "success",
        message: "success read data",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
