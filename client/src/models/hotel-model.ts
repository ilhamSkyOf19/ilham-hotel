// type hotel
export type IHotel = {
  fasilitas: string[];
  location: string;
  name: string;
  description: string;
  price: string;
  discount: string;
  rating: string;
  linkMaps: string;
  thumbnail: File;
  totalRoom: string;
  createdAt: Date;
  updatedAt: Date;
};

// create request for service
export type HotelCreateServiceRequestType = Omit<
  IHotel,
  "createdAt" | "updatedAt" | "discount" | "rating"
>;

// payload schema
export type PayloadHotel = {
  _id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  discount: number;
  rating: number;
  linkMaps: string;
  totalRoom: number;
  location: {
    _id: string;
    city: string;
    country: string;
  };
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
    price: response.price,
    rating: response.rating,
    discount: response.discount,
    totalRoom: response.totalRoom,
    thumbnail: response.thumbnail,
    linkMaps: response.linkMaps,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    location: response.location,
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
