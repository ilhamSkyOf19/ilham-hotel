import {
  RoomTypeCreateRequestType,
  RoomTypeResponseType,
  RoomTypeUpdateRequestType,
  toRoomTypeResponseType,
} from "../models/roomType-model";
import RoomTypeModel from "../schemas/roomType.schema";

export class RoomTypeService {
  // crate
  static async create(
    data: RoomTypeCreateRequestType
  ): Promise<RoomTypeResponseType | null> {
    const response = await RoomTypeModel.create(data);

    // respons
    return toRoomTypeResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // read all
  static async readAll(): Promise<RoomTypeResponseType[] | []> {
    // call response
    const response = await RoomTypeModel.find().exec();

    // return
    return response.map((item) =>
      toRoomTypeResponseType({
        ...item.toObject(),
        _id: item._id.toString(),
      })
    );
  }

  // read by id
  static async readonlyById(id: string): Promise<RoomTypeResponseType | null> {
    // call response
    const response = await RoomTypeModel.findById(id);

    // cek response
    if (!response) {
      return null;
    }

    // return
    return toRoomTypeResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // read by room type
  static async readByRoomType(
    roomType: string
  ): Promise<RoomTypeResponseType | null> {
    // call response
    const response = await RoomTypeModel.findOne({ roomType });

    // cek response
    if (!response) {
      return null;
    }

    // return
    return toRoomTypeResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // update by id
  static async updateById(
    id: string,
    data: RoomTypeUpdateRequestType
  ): Promise<RoomTypeResponseType | null> {
    // call response
    const response = await RoomTypeModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    // cek response
    if (!response) {
      return null;
    }

    // return
    return toRoomTypeResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // delete
  static async deleteById(id: string): Promise<RoomTypeResponseType | null> {
    // call response for delete
    const response = await RoomTypeModel.findByIdAndDelete(id);

    // cek response
    if (!response) {
      return null;
    }

    // return
    return toRoomTypeResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }
}
