import { NextFunction, Request, Response } from "express";
import { RoomCreateRequest, RoomResponseType } from "../models/room-model";
import { ResponseType } from "../types/request-response";
import { RoomService } from "../services/room.service";

export class RoomController {
  // create
  static async create(
    req: Request<{}, {}, RoomCreateRequest>,
    res: Response<ResponseType<RoomResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // call service
      const createdRoom = await RoomService.create(body);

      // cek response
      if (!createdRoom) {
        return res.status(400).json({
          status: "failed",
          message: "Failed to create room",
          data: null,
        });
      }

      // return response
      return res.status(201).json({
        status: "success",
        message: "Room created successfully",
        data: createdRoom,
      });
    } catch (error) {
      // call next with error
      console.log(error);
      next(error);
    }
  }
}
