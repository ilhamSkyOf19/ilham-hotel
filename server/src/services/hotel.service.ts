import { Types } from "mongoose";
import {
  FilterType,
  HotelCreateServiceRequestType,
  HotelResponseForDisplayType,
  HotelResponseType,
  PayloadHotel,
  toHotelResponseForDisplayType,
  toHotelResponseType,
} from "../models/hotel-model";
import HotelModel from "../schemas/hotel.schema";
import LocationModel from "../schemas/location.schema";

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
      location: data.location,
    });

    // findy by id to populate fasilitas
    const response = await HotelModel.findById(created._id)
      .populate("idFasilitas", "fasilitas")
      .populate("location", "_id city country")
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
    const response = await HotelModel.find()
      .select("_id name thumbnail price discount rating locatiin")
      .populate("location", "_id city country")
      .lean<PayloadHotel[]>();

    // return
    return response.map((item) => toHotelResponseForDisplayType(item));
  }

  // read all
  static async readAll(): Promise<HotelResponseType[] | []> {
    // call response with aggregate
    const response = await HotelModel.find()
      .populate("idFasilitas", "fasilitas")
      .populate("location", "_id city country")
      .lean<PayloadHotel[]>();

    // return
    return response.map((item) => toHotelResponseType(item));
  }

  // read by id
  static async readById(id: string): Promise<HotelResponseType | null> {
    // call response
    const response = await HotelModel.findById(id)
      .populate("idFasilitas", "_id fasilitas")
      .populate("location", "_id city country")
      .lean<PayloadHotel>();

    // check response
    if (!response) {
      return null;
    }

    // return response
    return toHotelResponseType(response);
  }

  // read by id, data : total room & id
  static async readByIdGetTotalRoom(
    id: string
  ): Promise<{ totalRoom: number } | null> {
    // call response
    const response = await HotelModel.findById(id)
      .populate("idFasilitas", "_id fasilitas")
      .populate("location", "_id city country")
      .lean<PayloadHotel>();

    // check response
    if (!response) {
      return null;
    }

    // return response
    return { totalRoom: response.totalRoom };
  }

  // read by id for cek
  static async readByIdforCheck(id: string): Promise<boolean> {
    // call model
    const response = HotelModel.findById(id);

    // cek response
    if (!response) {
      return false;
    }

    return true;
  }

  // read hotel by filter
  static async readHotelByFilter(
    filter: FilterType
  ): Promise<HotelResponseForDisplayType[] | []> {
    const { minPrice, maxPrice, fasilitas, search, location } = filter;

    // destruct location
    const cityAndCountry: string[] = location?.split(",") ?? [];

    // find location
    const locationDoc =
      cityAndCountry.length === 2
        ? await LocationModel.findOne({
            city: cityAndCountry[0].trim(),
            country: cityAndCountry[1].trim(),
          }).select("_id")
        : null;

    // call response
    const response = await HotelModel.find({
      ...(minPrice || maxPrice
        ? {
            price: {
              ...(minPrice ? { $gte: minPrice } : {}),
              ...(maxPrice ? { $lte: maxPrice } : {}),
            },
          }
        : {}),
      ...(fasilitas && fasilitas.length > 0
        ? {
            idFasilitas: {
              $all: fasilitas.map((id) => new Types.ObjectId(id)),
            },
          }
        : {}),
      ...(locationDoc ? { location: locationDoc._id } : {}),
      ...(search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { city: { $regex: search, $options: "i" } },
              { country: { $regex: search, $options: "i" } },
            ],
          }
        : {}),
    })
      .sort({ createAt: -1 })
      .limit(10)
      .select("_id name thumbnail price discount rating locatiin")
      .populate("location", "_id city country")
      .lean<PayloadHotel[]>();

    // return
    return response.map((item) => toHotelResponseForDisplayType(item));
  }
}
