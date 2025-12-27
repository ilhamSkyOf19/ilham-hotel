export type IGallery = {
  idHotel: string;
  images: File[];
  createdAt: Date;
  updatedAt: Date;
};

// payload schema
export type PayloadGallery = Omit<IGallery, "idHotel" | "images"> & {
  _id: string;
  idHotel: {
    _id: string;
    name: string;
  };
  images: string[];
};

// request create
export type GalleryCreateRequestType = Omit<
  IGallery,
  "idHotel" | "createdAt" | "updatedAt"
> & {
  idHotel: string;
  images: File[];
};

// response for gallery
export type GalleryResponseType = Omit<IGallery, "idHotel" | "images"> & {
  _id: string;
  idHotel: {
    _id: string;
    name: string;
  };
  images: string[];
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
