import { Types } from "mongoose";
import {
  PayloadRoom,
  RoomCreateRequestType,
  RoomResponseType,
  toRoomResponseType,
} from "../models/room-model";
import RoomModel from "../schemas/room.schema";

export class RoomService {
  // create
  static async create(
    data: RoomCreateRequestType
  ): Promise<RoomResponseType | null> {
    // convert _id
    const idHotel = new Types.ObjectId(data.idHotel);
    const idRoomType = new Types.ObjectId(data.idRoomType);

    // call service
    const crated = await RoomModel.create({
      idHotel,
      idRoomType,
      numberRoom: data.numberRoom,
    });

    // get response
    const response = await RoomModel.findById(crated._id)
      .populate("idHotel", "_id name")
      .populate("idRoomType", "_id roomType")
      .lean<PayloadRoom>();

    // check response
    if (!response) {
      return null;
    }

    // return response
    return toRoomResponseType(response);
  }

  // read room by id
  static async readById(id: string): Promise<RoomResponseType | null> {
    // call response
    const response = await RoomModel.findById(id)
      .populate("idHotel", "_id name")
      .populate("idRoomType", "_id roomType")
      .lean<PayloadRoom>();

    // check response
    if (!response) {
      return null;
    }

    // return response
    return toRoomResponseType(response);
  }

  // read all
  static async readAll(): Promise<RoomResponseType[] | []> {
    // call response with aggregate
    const response = await RoomModel.find()
      .populate("idHotel", "_id name")
      .populate("idRoomType", "_id roomType")
      .lean<PayloadRoom[]>();

    // return
    return response.map((item) => toRoomResponseType(item));
  }

  // read by hotel id
  static async readRoomNumberByHotelId(id: string): Promise<number> {
    // call response with aggregate
    const response = await RoomModel.find({ idHotel: id })
      .select("numberRoom")
      .lean<{ numberRoom: number[] }[]>();

    // flat room number
    const flatRoomNumber = response.flatMap((item) => item.numberRoom).length;
    // return
    return flatRoomNumber;
  }
}
