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
    const response = await GalleryModel.create(req);

    // get payload
    const payload = await GalleryModel.findById(
      response._id
    ).lean<PayloadGallery>();

    // cek payload
    if (!payload) {
      return null;
    }

    // response
    return toGalleryResponseType(payload);
  }

  // read by id hotel
  static async readByIdHotel(req: {
    idHotel: string;
    limit?: number;
  }): Promise<GalleryResponseType[] | []> {
    // call schema
    const response = await GalleryModel.find({
      idHotel: req.idHotel,
    })
      .limit(req.limit ?? 0)
      .lean<PayloadGallery[]>();

    // response
    return response.map((item) => toGalleryResponseType(item));
  }
}
