import api from "../libs/axios";
import type { GalleryResponseType } from "../models/gallery-model";
import type { ResponseType } from "../utils/response-type";

export class GalleryService {
  // create
  static async create(
    data: FormData
  ): Promise<ResponseType<GalleryResponseType | null>> {
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

  // read by id hotel
  static async readByIdHotel(
    idHotel: string
  ): Promise<ResponseType<GalleryResponseType | null>> {
    // call api
    const response = await api
      .get(`/gallery/read-by-id-hotel/${idHotel}`)
      .then((res) => res.data);

    // return response
    return response;
  }

  // delete
  static async deleteById(req: {
    idGallery: string;
    idHotel: string;
    img: string;
  }): Promise<ResponseType<null>> {
    // call api
    const response = await api
      .delete(`/gallery/delete/${req.idGallery}/${req.idHotel}/${req.img}`)
      .then((res) => res.data);

    return response;
  }
}
