import api from "../libs/axios";
import type { HotelResponseType } from "../models/hotel-model";
import type { ResponseType } from "../utils/response-type";

export class HotelService {
  // create
  static async create(
    data: FormData
  ): Promise<ResponseType<HotelResponseType | null>> {
    // call api
    const response = api
      .post("/hotel/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);

    // return response
    return response;
  }

  // read total room
  static async readTotalRoom(
    id: string
  ): Promise<ResponseType<{ totalRoom: number } | null>> {
    // call api
    const response = api
      .get(`/hotel/read-total-room/${id}`)
      .then((res) => res.data);

    // return response
    return response;
  }
}
