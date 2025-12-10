import {
  RoomTypeCreateRequest,
  RoomTypeResponseType,
  toRoomTypeResponseType,
} from "../models/roomType-model";
import RoomTypeModel from "../schemas/roomType.schema";

export class RoomTypeService {
  // crate
  static async create(
    data: RoomTypeCreateRequest
  ): Promise<RoomTypeResponseType | null> {
    const response = await RoomTypeModel.create(data);

    // respons
    return toRoomTypeResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }
}
