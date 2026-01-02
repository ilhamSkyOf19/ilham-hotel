// type hotel
export type IHotel = {
  fasilitas: string[];
  name: string;
  description: string;
  city: string;
  country: string;
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
  city: string;
  country: string;
  price: number;
  thumbnail: string;
  discount: number;
  rating: number;
  linkMaps: string;
  totalRoom: number;
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
    rating: response.rating,
    discount: response.discount,
    totalRoom: response.totalRoom,
    thumbnail: response.thumbnail,
    linkMaps: response.linkMaps,
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

// response for display
export type HotelResponseForDisplayType = Pick<
  PayloadHotel,
  "_id" | "name" | "rating" | "city" | "country" | "thumbnail" | "price"
>;

// response for display
export const toHotelResponseForDisplayType = (
  response: PayloadHotel
): HotelResponseForDisplayType => {
  return {
    _id: response._id,
    name: response.name,
    rating: response.rating,
    city: response.city,
    country: response.country,
    thumbnail: response.thumbnail,
    price: response.price,
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
