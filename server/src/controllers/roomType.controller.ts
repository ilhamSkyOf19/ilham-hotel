import { NextFunction, Request, Response } from "express";
import {
  RoomTypeCreateRequest,
  RoomTypeResponseType,
} from "../models/roomType-model";
import { ResponseType } from "../types/request-response";
import RoomTypeModel from "../schemas/roomType.schema";
import { RoomTypeService } from "../services/roomType.service";

export class RoomTypeController {
  // create
  static async create(
    req: Request<{}, {}, RoomTypeCreateRequest>,
    res: Response<ResponseType<RoomTypeResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // get room type
      const roomType = await RoomTypeModel.findOne({ roomType: body.roomType });

      // cek room type
      if (roomType) {
        return res.status(400).json({
          status: "failed",
          message: "room type already exist",
          data: null,
        });
      }

      // call service for create room type
      const response = await RoomTypeService.create(body);

      // return response
      return res.status(200).json({
        status: "success",
        message: "success",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }
}
