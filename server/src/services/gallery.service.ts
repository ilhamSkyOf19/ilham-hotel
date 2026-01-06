import {
  GalleryCreateRequestType,
  GalleryResponseType,
  PayloadGallery,
  toGalleryResponseType,
} from "../models/gallery-model";
import GalleryModel from "../schemas/gallery.schema";

export class GalleryService {
  // create
  static async create(
    req: GalleryCreateRequestType
  ): Promise<GalleryResponseType | null> {
    // call schema
    const response = await GalleryModel.findOneAndUpdate(
      { idHotel: req.idHotel },
      {
        $set: { idHotel: req.idHotel },
        $push: { images: { $each: req.images } },
      },
      {
        new: true,
        upsert: true,
      }
    ).lean<PayloadGallery>();

    // response
    return toGalleryResponseType(response);
  }

  // read by id gallery
  static async readByIdGallery(req: {
    idGallery: string;
  }): Promise<GalleryResponseType | null> {
    // call model
    const response = await GalleryModel.findById(
      req.idGallery
    ).lean<PayloadGallery>();

    // cek payload
    if (!response) {
      return null;
    }
    // response
    return toGalleryResponseType(response);
  }

  // read by id hotel
  static async readByIdHotel(req: {
    idHotel: string;
  }): Promise<GalleryResponseType | null> {
    // call schema
    const response = await GalleryModel.findOne({
      idHotel: req.idHotel,
    }).lean<PayloadGallery>();

    // cek payload
    if (!response) {
      return null;
    }
    // response
    return toGalleryResponseType(response);
  }

  // delete single image by idHotel & img
  static async deleteByIdHotelAndImg(
    idHotel: string,
    img: string
  ): Promise<boolean> {
    const result = await GalleryModel.updateOne(
      { idHotel },
      { $pull: { images: img } }
    );

    return result.modifiedCount > 0;
  }

  // delete by id gallery
  static async deleteById(idGallery: string, img: string): Promise<boolean> {
    const result = await GalleryModel.updateOne(
      { _id: idGallery },
      { $pull: { images: img } }
    );

    return result.modifiedCount > 0;
  }
}
