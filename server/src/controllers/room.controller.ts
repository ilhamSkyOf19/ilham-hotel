import { NextFunction, Request, Response } from "express";
import { RoomCreateRequestType, RoomResponseType } from "../models/room-model";
import { ResponseType } from "../types/request-response";
import { RoomService } from "../services/room.service";
import { RoomTypeService } from "../services/roomType.service";
import { FasilitasService } from "../services/fasilitas.service";
import { validation } from "../validations/validation";
import { RoomValidation } from "../validations/room-validation";
import { FileService } from "../services/file.service";

export class RoomController {
  // create
  static async create(
    req: Request<{}, {}, RoomCreateRequestType>,
    res: Response<ResponseType<RoomResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get body
      const { data: body } = validation<RoomCreateRequestType>(
        RoomValidation.CREATE,
        {
          ...req.body,
          roomNumber: Number(req.body.roomNumber),
          floor: Number(req.body.floor),
        }
      );

      // cek validation

      // cek existence of room number
      const existingRoom = await RoomService.readByRoomNumber(
        Number(body?.roomNumber)
      );

      if (existingRoom) {
        // delete uploaded file if exists
        if (req.file) {
          await FileService.deleteFileFromRequest(req.file.path);
        }
        return res.status(400).json({
          status: "failed",
          message: "Room number already exist",
          data: null,
        });
      }

      // cek room type
      const roomType = await RoomTypeService.readonlyById(body?.roomType || "");

      if (!roomType) {
        // delete uploaded file if exists
        if (req.file) {
          await FileService.deleteFileFromRequest(req.file.path);
        }
        return res.status(400).json({
          status: "failed",
          message: "Room type not found",
          data: null,
        });
      }

      // cek fasilitas existence
      const fasilitasChecks = await FasilitasService.readByIdMany(
        body?.fasilitas || []
      );

      // cek if all fasilitas exist
      if (fasilitasChecks.length !== body?.fasilitas.length) {
        // delete uploaded file if exists
        if (req.file) {
          await FileService.deleteFileFromRequest(req.file.path);
        }
        return res.status(400).json({
          status: "failed",
          message: "One or more fasilitas not found",
          data: null,
        });
      }

      // call service
      const createdRoom = await RoomService.create({
        ...body,
        thumbnail: req.file ? req.file.filename : "",
      });

      // cek response
      if (!createdRoom) {
        // delete uploaded file if exists
        if (req.file) {
          await FileService.deleteFileFromRequest(req.file.path);
        }

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
      // delete file if exists
      if (req.file) {
        await FileService.deleteFileFromRequest(req.file.path);
      }
      // call next with error
      console.log(error);
      next(error);
    }
  }

  // read all
  static async readAll(
    _req: Request,
    res: Response<ResponseType<RoomResponseType[] | []>>,
    next: NextFunction
  ) {
    try {
      // call service
      const rooms = await RoomService.readAll();

      // return response
      return res.status(200).json({
        status: "success",
        message: "Rooms retrieved successfully",
        data: rooms,
      });
    } catch (error) {
      // call next with error
      console.log(error);
      next(error);
    }
  }

  // read by room number
  static async readByRoomNumber(
    req: Request<{ roomNumber: string }>,
    res: Response<ResponseType<RoomResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get params
      const { roomNumber } = req.params;

      // call service
      const room = await RoomService.readByRoomNumber(parseInt(roomNumber));

      // cek response
      if (!room) {
        return res.status(404).json({
          status: "failed",
          message: "Room not found",
          data: null,
        });
      }

      // return response
      return res.status(200).json({
        status: "success",
        message: "Room retrieved successfully",
        data: room,
      });
    } catch (error) {
      // call next with error
      console.log(error);
      next(error);
    }
  }
}
