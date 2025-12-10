import { Types } from "mongoose";
import {
  PopulatedRoom,
  RoomCreateRequest,
  toRoomResponseType,
} from "../models/room-model";
import RoomModel from "../schemas/room.schema";

export class RoomService {
  static async create(data: RoomCreateRequest) {
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
}
