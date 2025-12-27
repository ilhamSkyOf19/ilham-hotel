import api from "../libs/axios";
import type { GalleryResponseType } from "../models/gallery-model";

export class GalleryService {
  // create
  static async create(data: FormData): Promise<GalleryResponseType | null> {
    // call api
    const response = api
      .post("/gallery/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);

    // return response
    return response;
  }
}
