import { Types } from "mongoose";

export type IRoom = {
  _id: Types.ObjectId;
  roomNumber: number;
  roomType: Types.ObjectId; // belum populate
  fasilitas: Types.ObjectId[]; // belum populate
  status: "available" | "unavailable";
  description: string;
  floor: number;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomCreateRequestType = {
  roomNumber: number;
  roomType: string;
  fasilitas: string[];
  status: "available" | "unavailable";
  description: string;
  floor: number;
};

export type PopulatedRoom = {
  map(arg0: (item: any) => RoomResponseType): unknown;
  _id: Types.ObjectId;
  roomNumber: number;

  roomType: {
    _id: Types.ObjectId;
    roomType: string;
  };

  fasilitas: {
    _id: Types.ObjectId;
    fasilitas: string;
  }[];

  status: "available" | "unavailable";
  description: string;
  floor: number;
  createdAt: Date;
  updatedAt: Date;
  thumbnail: string;
};

export type RoomResponseType = {
  _id: string;
  roomNumber: number;

  roomType: {
    _id: string;
    roomType: string;
  } | null;

  fasilitas:
    | {
        _id: string;
        fasilitas: string;
      }[]
    | [];

  status: "available" | "unavailable";
  description: string;
  floor: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
};

export const toRoomResponseType = (room: PopulatedRoom): RoomResponseType => {
  return {
    _id: room._id.toString(),
    roomNumber: room.roomNumber,
    status: room.status,
    description: room.description,
    floor: room.floor,
    thumbnail: room.thumbnail,
    createdAt: room.createdAt.toISOString(),
    updatedAt: room.updatedAt.toISOString(),

    roomType: room.roomType
      ? {
          _id: room.roomType._id.toString(),
          roomType: room.roomType.roomType,
        }
      : null,

    fasilitas: Array.isArray(room.fasilitas)
      ? room.fasilitas.map((f) => ({
          _id: f._id.toString(),
          fasilitas: f.fasilitas,
        }))
      : [],
  };
};
