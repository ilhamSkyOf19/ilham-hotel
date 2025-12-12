import { Types } from "mongoose";

export type IRoom = {
  idHotel: Types.ObjectId;
  idRoomType: Types.ObjectId;
  numberRoom: number[];
  bookedRoom: number[];
  createdAt: Date;
  updatedAt: Date;
};

// payload room
export type PayloadRoom = {
  _id: string;
  idHotel: {
    _id: string;
    name: string;
  } | null;
  idRoomType: {
    _id: string;
    roomType: string;
  } | null;
  numberRoom: number[];
  bookedRoom: number[];
  createdAt: string;
  updatedAt: string;
};

// room create request
export type RoomCreateRequestType = Omit<
  IRoom,
  "createdAt" | "updatedAt" | "idHotel" | "idRoomType" | "bookedRoom"
> & {
  idHotel: string;
  idRoomType: string;
};

// response room
export type RoomResponseType = Omit<PayloadRoom, "idHotel" | "idRoomType"> & {
  roomType: {
    _id: string;
    roomType: string;
  } | null;
  hotel: {
    _id: string;
    name: string;
  } | null;
};

// to response
export const toRoomResponseType = (
  response: PayloadRoom
): RoomResponseType => ({
  _id: response._id,
  hotel: response.idHotel
    ? {
        _id: response.idHotel._id,
        name: response.idHotel.name,
      }
    : null,
  roomType: response.idRoomType
    ? {
        _id: response.idRoomType._id,
        roomType: response.idRoomType.roomType,
      }
    : null,
  numberRoom: response.numberRoom,
  bookedRoom: response.bookedRoom,
  createdAt: response.createdAt,
  updatedAt: response.updatedAt,
});
