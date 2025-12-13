import { Types } from "mongoose";
import {
  HotelCreateRequestType,
  HotelCreateServiceRequestType,
  HotelResponseForDisplayType,
  HotelResponseType,
  PayloadHotel,
  toHotelResponseForDisplayType,
  toHotelResponseType,
} from "../models/hotel-model";
import HotelModel from "../schemas/hotel.schema";

export class HotelService {
  // create
  static async create(
    data: HotelCreateServiceRequestType & { thumbnail: string }
  ): Promise<HotelResponseType | null> {
    // covert fasilitas ids to ObjectId
    const fasilitasIds = data.idFasilitas.map((id) => new Types.ObjectId(id));

    // create hotel document
    const created = await HotelModel.create({
      ...data,
      idFasilitas: fasilitasIds,
    });

    // findy by id to populate fasilitas
    const response = await HotelModel.findById(created._id)
      .populate("idFasilitas", "fasilitas")
      .lean<PayloadHotel>();

    //   check response
    if (!response) {
      return null;
    }

    // return response
    return toHotelResponseType(response);
  }

  // read for display
  static async readForDisplay(): Promise<HotelResponseForDisplayType[] | []> {
    // call response
    const response = await HotelModel.find().lean<PayloadHotel[]>();

    // return
    return response.map((item) => toHotelResponseForDisplayType(item));
  }

  // read all
  static async readAll(): Promise<HotelResponseType[] | []> {
    // call response with aggregate
    const response = await HotelModel.find()
      .populate("idFasilitas", "fasilitas")
      .lean<PayloadHotel[]>();

    // return
    return response.map((item) => toHotelResponseType(item));
  }

  // read by id
  static async readById(id: string): Promise<HotelResponseType | null> {
    // call response
    const response = await HotelModel.findById(id)
      .populate("idFasilitas", "_id fasilitas")
      .lean<PayloadHotel>();

    // check response
    if (!response) {
      return null;
    }

    // return response
    return toHotelResponseType(response);
  }
}
