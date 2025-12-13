import { Types } from "mongoose";

export type IGallery = {
  idHotel: Types.ObjectId;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

// payload schema
export type PayloadGallery = Omit<IGallery, "idHotel"> & {
  _id: string;
  idHotel: {
    _id: string;
    name: string;
  };
};

// request create
export type GalleryCreateRequestType = Omit<
  IGallery,
  "idHotel" | "createdAt" | "updatedAt"
> & {
  idHotel: string;
};

// response for gallery
export type GalleryResponseType = Omit<IGallery, "idHotel"> & {
  _id: string;
  idHotel: {
    _id: string;
    name: string;
  };
};

// to response gallery
export const toGalleryResponseType = (
  response: PayloadGallery
): GalleryResponseType => {
  return {
    _id: response._id,
    idHotel: {
      _id: response.idHotel._id,
      name: response.idHotel.name,
    },
    images: response.images,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
};
