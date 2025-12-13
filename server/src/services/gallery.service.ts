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
}
