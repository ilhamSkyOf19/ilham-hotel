import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../types/request-response";
import {
  GalleryCreateRequestType,
  GalleryResponseType,
} from "../models/gallery-model";
import { FileService } from "../services/file.service";
import { validation } from "../validations/validation";
import { GalleryValidation } from "../validations/gallery-validation";
import { GalleryService } from "../services/gallery.service";
import { HotelService } from "../services/hotel.service";

export class GalleryController {
  // service
  static async create(
    req: Request<{}, {}, GalleryCreateRequestType>,
    res: Response<ResponseType<GalleryResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get idHotel from body
      const { data: body } = validation<
        Omit<GalleryCreateRequestType, "images">
      >(GalleryValidation.CREATE, req.body);

      //   get request file by multer[]
      const files = req.files as Express.Multer.File[];

      //   cek hotel existence
      const hotel = await HotelService.readById(body.idHotel);

      // cek hotel
      if (!hotel) {
        // delete file
        if (req.files) {
          await FileService.deleteFileFromRequest(
            files.map((file) => file.path)
          );
        }

        return res.status(400).json({
          status: "failed",
          message: "hotel not found",
          data: null,
        });
      }

      // cek files
      if (!files || files.length === 0) {
        return res.status(400).json({
          status: "failed",
          message: "file not found",
          data: null,
        });
      }

      //   call service
      const response = await GalleryService.create({
        ...body,
        images: files.map((file) => file.filename),
      });

      // return response
      return res.status(200).json({
        status: "success",
        message: "success create gallery",
        data: response,
      });
    } catch (error) {
      // cek file
      if (req.files) {
        const files = req.files as Express.Multer.File[];
        // delete file
        await FileService.deleteFileFromRequest(files.map((file) => file.path));
      }
      // cek error
      console.log(error);
      next(error);
    }
  }
}
