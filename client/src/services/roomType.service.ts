import api from "../libs/axios";
import type {
  RoomTypeCreateRequestType,
  RoomTypeResponseType,
  RoomTypeUpdateRequestType,
} from "../models/roomType-model";
import type { ResponseType } from "../utils/response-type";

export class RoomTypeService {
  // create
  static async create(
    data: RoomTypeCreateRequestType
  ): Promise<ResponseType<RoomTypeResponseType>> {
    // call api
    const response = api
      .post("/room-type/create", data)
      .then((res) => res.data);

    // return response
    return response;
  }

  // read
  static async readAll(): Promise<ResponseType<RoomTypeResponseType[] | []>> {
    // call api
    const response = api.get("/room-type/read").then((res) => res.data);

    // return response
    return response;
  }

  // read by id
  static async readonlyById(id: string): Promise<RoomTypeResponseType | null> {
    // call api
    const response = api
      .get(`/room-type/read-detail/${id}`)
      .then((res) => res.data);

    // return response
    return response;
  }

  // update by id
  static async updateById(
    id: string,
    data: RoomTypeUpdateRequestType
  ): Promise<ResponseType<RoomTypeResponseType | null>> {
    // call api
    const response = api
      .patch(`/room-type/update/${id}`, data)
      .then((res) => res.data);

    // return response
    return response;
  }
}
