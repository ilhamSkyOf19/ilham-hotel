import { Types } from "mongoose";

// type hotel
export type IHotel = {
  idFasilitas: Types.ObjectId[];
  // idReview: Types.ObjectId[];
  linkMaps: string;
  name: string;
  description: string;
  location: Types.ObjectId;
  price: number;
  discount: number;
  rating: number;
  thumbnail: string;
  totalRoom: number;
  createdAt: Date;
  updatedAt: Date;
};

// create request
export type HotelCreateRequestType = Omit<
  IHotel,
  | "createdAt"
  | "updatedAt"
  | "idFasilitas"
  | "thumbnail"
  | "discount"
  | "rating"
  | "location"
> & {
  fasilitas: string[];
  location: string;
};

// create request for service
export type HotelCreateServiceRequestType = Omit<
  IHotel,
  "createdAt" | "updatedAt" | "idFasilitas" | "discount" | "rating" | "location"
> & {
  idFasilitas: string[];
  location: string;
};

// payload schema
export type PayloadHotel = {
  _id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  discount: number;
  rating: number;
  totalRoom: number;
  linkMaps: string;
  totalReviews: number;
  idFasilitas:
    | {
        _id: string;
        fasilitas: string;
      }[]
    | [];
  location:
    | {
        _id: string;
        city: string;
        country: string;
      }
    | {};
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
    price: response.price,
    rating: response.rating,
    discount: response.discount,
    totalRoom: response.totalRoom,
    thumbnail: response.thumbnail,
    linkMaps: response.linkMaps,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    location: response.location,
    totalReviews: response.totalReviews,
    fasilitas: response.idFasilitas
      ? response.idFasilitas.map((item) => ({
          _id: item._id,
          fasilitas: item.fasilitas,
        }))
      : [],
  };
};

// response for display
export type HotelResponseForDisplayType = Pick<
  PayloadHotel,
  "_id" | "name" | "rating" | "location" | "thumbnail" | "price" | "discount"
>;

// response for display
export const toHotelResponseForDisplayType = (
  response: Pick<
    PayloadHotel,
    "_id" | "name" | "rating" | "location" | "thumbnail" | "price" | "discount"
  >
): HotelResponseForDisplayType => {
  return {
    _id: response._id,
    name: response.name,
    rating: response.rating,
    location: response.location,
    thumbnail: response.thumbnail,
    price: response.price,
    discount: response.discount,
  };
};

// type filter
export type FilterTypeForQuery = {
  location?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  fasilitas?: string;
};

// type filter
export type FilterType = {
  location?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  fasilitas?: string[];
};
