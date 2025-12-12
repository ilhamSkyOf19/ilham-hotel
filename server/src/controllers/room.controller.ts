import { NextFunction, Request, Response } from "express";
import { RoomCreateRequestType, RoomResponseType } from "../models/room-model";
import { ResponseType } from "../types/request-response";
import { HotelService } from "../services/hotel.service";
import { RoomTypeService } from "../services/roomType.service";
import { RoomService } from "../services/room.service";

export class RoomController {
  // create
  static async create(
    req: Request<{}, {}, RoomCreateRequestType>,
    res: Response<ResponseType<RoomResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const { idHotel, idRoomType, numberRoom } = req.body;

      // cek id hotel
      const hotel = await HotelService.readById(idHotel);

      // cek hotel
      if (!hotel) {
        return res.status(400).json({
          status: "failed",
          message: "hotel not found",
          data: null,
        });
      }

      // cek room type
      const roomType = await RoomTypeService.readonlyById(idRoomType);

      // cek room type
      if (!roomType) {
        return res.status(400).json({
          status: "failed",
          message: "room type not found",
          data: null,
        });
      }

      // create room
      const room = await RoomService.create({
        idHotel,
        idRoomType,
        numberRoom,
      });

      // cek room
      if (!room) {
        return res.status(400).json({
          status: "failed",
          message: "failed create room",
          data: null,
        });
      }

      // return response
      return res.status(200).json({
        status: "success",
        message: "success create room",
        data: room,
      });
    } catch (error) {
      // cek error
      console.log(error);
      next(error);
    }
  }

  // read room all
  static async readAll(
    req: Request,
    res: Response<ResponseType<RoomResponseType[] | []>>,
    next: NextFunction
  ) {
    try {
      // call service
      const response = await RoomService.readAll();

      // return response
      return res.status(200).json({
        status: "success",
        message: "success retrieve all room",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }

  // read room by id
  static async readById(
    req: Request<{ id: string }>,
    res: Response<ResponseType<RoomResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id from params
      const { id } = req.params;

      // call response
      const response = await RoomService.readById(id);

      // cek response
      if (!response) {
        return res.status(404).json({
          status: "failed",
          message: "room not found",
          data: null,
        });
      }
      // return response
      return res.status(200).json({
        status: "success",
        message: "success retrieve room by id",
        data: response,
      });
    } catch (error) {
      // cek response
      console.log(error);
      next(error);
    }
  }
}
