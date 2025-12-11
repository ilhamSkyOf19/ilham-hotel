import { Types } from "mongoose";
import {
  PopulatedRoom,
  RoomCreateRequest,
  RoomResponseType,
  toRoomResponseType,
} from "../models/room-model";
import RoomModel from "../schemas/room.schema";

export class RoomService {
  // service
  static async create(
    data: RoomCreateRequest
  ): Promise<RoomResponseType | null> {
    const roomTypeId = new Types.ObjectId(data.roomType);
    const fasilitasIds = data.fasilitas.map((id) => new Types.ObjectId(id));

    // STEP 1: create raw document
    const created = await RoomModel.create({
      roomNumber: data.roomNumber,
      roomType: roomTypeId,
      fasilitas: fasilitasIds,
      status: data.status,
      description: data.description,
      floor: data.floor,
    });

    // STEP 2: query ulang + populate
    const populated = await RoomModel.findById(created._id)
      .populate("roomType")
      .populate("fasilitas")
      .lean<PopulatedRoom>();

    if (!populated) {
      return null;
    }

    // STEP 3: mapping response API
    return toRoomResponseType(populated);
  }

  // read all
  static async readAll(): Promise<RoomResponseType[] | []> {
    // call response
    const response = await RoomModel.find()
      .populate("roomType")
      .populate("fasilitas")
      .lean<PopulatedRoom[]>();

    // return
    return response.map((item) => toRoomResponseType(item));
  }
}
