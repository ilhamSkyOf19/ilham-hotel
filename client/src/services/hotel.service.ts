import api from "../libs/axios";
import type {
  FilterTypeForQuery,
  HotelResponseForDisplayType,
  HotelResponseType,
} from "../models/hotel-model";
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

  // read for display
  static async readForDisplay(): Promise<
    ResponseType<HotelResponseForDisplayType[] | null>
  > {
    // call api
    const response = api.get("/hotel/read-for-display").then((res) => res.data);

    // return response
    return response;
  }

  // read by filter
  static async readByFilter(
    params: FilterTypeForQuery
  ): Promise<ResponseType<HotelResponseForDisplayType[] | null>> {
    // call api
    const response = api
      .get("hotel/read-by-filter", {
        params: {
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          fasilitas: params.fasilitas,
          search: params.search,
        },
      })
      .then((res) => res.data);

    // return response
    return response;
  }

  // read detail
  static async readDetail(
    id: string
  ): Promise<ResponseType<HotelResponseType | null>> {
    // call api
    const response = api
      .get(`/hotel/read-detail/${id}`)
      .then((res) => res.data);

    // return response
    return response;
  }
}
