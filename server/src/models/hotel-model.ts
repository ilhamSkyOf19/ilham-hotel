import { Types } from "mongoose";

// type hotel
export type IHotel = {
  idFasilitas: Types.ObjectId[];
  name: string;
  description: string;
  city: string;
  country: string;
  price: number;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};

// create request
export type HotelCreateRequestType = Omit<
  IHotel,
  "createdAt" | "updatedAt" | "idFasilitas" | "thumbnail"
> & {
  fasilitas: string[];
};

// create request for service
export type HotelCreateServiceRequestType = Omit<
  IHotel,
  "createdAt" | "updatedAt" | "idFasilitas"
> & {
  idFasilitas: string[];
};

// payload schema
export type PayloadHotel = {
  _id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  price: number;
  thumbnail: string;
  idFasilitas:
    | {
        _id: string;
        fasilitas: string;
      }[]
    | [];
  createdAt: string;
  updatedAt: string;
};

// hotel response
export type HotelResponseType = Omit<PayloadHotel, "idFasilitas"> & {
  fasilitas: { _id: string; fasilitas: string }[] | [];
};

// response hotel
export const toHotelResponseType = (
  response: PayloadHotel
): HotelResponseType => {
  return {
    _id: response._id,
    name: response.name,
    description: response.description,
    city: response.city,
    country: response.country,
    price: response.price,
    thumbnail: response.thumbnail,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    fasilitas: response.idFasilitas
      ? response.idFasilitas.map((item) => ({
          _id: item._id,
          fasilitas: item.fasilitas,
        }))
      : [],
  };
};
