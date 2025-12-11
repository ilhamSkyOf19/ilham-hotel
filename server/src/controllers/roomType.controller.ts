import { NextFunction, Request, Response } from "express";
import {
  RoomTypeCreateRequestType,
  RoomTypeResponseType,
  RoomTypeUpdateRequestType,
} from "../models/roomType-model";
import { ResponseType } from "../types/request-response";
import RoomTypeModel from "../schemas/roomType.schema";
import { RoomTypeService } from "../services/roomType.service";
import { RoomService } from "../services/room.service";

export class RoomTypeController {
  // create
  static async create(
    req: Request<{}, {}, RoomTypeCreateRequestType>,
    res: Response<ResponseType<RoomTypeResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // get room type
      const roomType = await RoomTypeModel.findOne({
        roomType: body.roomType.toLowerCase().trim(),
      });

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

  // read all
  static async readAll(
    req: Request,
    res: Response<ResponseType<RoomTypeResponseType[] | []>>,
    next: NextFunction
  ) {
    try {
      // call service
      const response = await RoomTypeService.readAll();

      // return response
      return res.status(200).json({
        status: "success",
        message: "success retrieve all room type",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }

  // read by id
  static async readById(
    req: Request<{ id: string }>,
    res: Response<ResponseType<RoomTypeResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id from params
      const { id } = req.params;

      // call response
      const response = await RoomTypeService.readonlyById(id);

      // cek response
      if (!response) {
        return res.status(404).json({
          status: "failed",
          message: "room type not found",
          data: null,
        });
      }
      // return response
      return res.status(200).json({
        status: "success",
        message: "success retrieve room type by id",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }

  // update by id
  static async updateById(
    req: Request<{ id: string }, {}, RoomTypeUpdateRequestType>,
    res: Response<ResponseType<RoomTypeResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id from params
      const { id } = req.params;

      // cek find room type by id
      const findRoomType = await RoomTypeService.readonlyById(id);

      // cek existing room type
      if (!findRoomType) {
        return res.status(404).json({
          status: "failed",
          message: "room type not found",
          data: null,
        });
      }

      // get body
      const body = req.body;

      // cek duplicate room type
      if (body.roomType!.toLowerCase().trim() === findRoomType.roomType) {
        return res.status(400).json({
          status: "failed",
          message: "room type the same as before",
          data: null,
        });
      }

      // find room type by room type
      const checkRoomType = await RoomTypeService.readByRoomType(
        body.roomType!.toLowerCase().trim()
      );

      // cek existing room type
      if (checkRoomType) {
        return res.status(400).json({
          status: "failed",
          message: "room type already exist",
          data: null,
        });
      }

      // call service
      const respone = await RoomTypeService.updateById(id, body);

      // return response success
      return res.status(200).json({
        status: "success",
        message: "success update room type by id",
        data: respone,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }

  // delete by id
  static async deleteById(
    req: Request<{ id: string }>,
    res: Response<ResponseType<RoomTypeResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id from params
      const { id } = req.params;

      // call service
      const response = await RoomTypeService.deleteById(id);

      // return response success
      return res.status(200).json({
        status: "success",
        message: "success delete room type by id",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }
}
