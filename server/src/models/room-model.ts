import { Types } from "mongoose";

export type IRoom = {
  _id: Types.ObjectId;
  roomNumber: number;
  roomType: Types.ObjectId; // belum populate
  fasilitas: Types.ObjectId[]; // belum populate
  status: "available" | "unavailable";
  description: string;
  floor: number;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomCreateRequest = {
  roomNumber: number;
  roomType: string; // FE kirim string
  fasilitas: string[]; // FE kirim string[]
  status: "available" | "unavailable";
  description: string;
  floor: number;
};

export type PopulatedRoom = {
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
};

export type RoomResponseType = {
  _id: string;
  roomNumber: number;

  roomType: {
    _id: string;
    roomType: string;
  };

  fasilitas: {
    _id: string;
    fasilitas: string;
  }[];

  status: "available" | "unavailable";
  description: string;
  floor: number;
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
    createdAt: room.createdAt.toISOString(),
    updatedAt: room.updatedAt.toISOString(),

    roomType: {
      _id: room.roomType._id.toString(),
      roomType: room.roomType.roomType,
    },

    fasilitas: room.fasilitas.map((f) => ({
      _id: f._id.toString(),
      fasilitas: f.fasilitas,
    })),
  };
};
