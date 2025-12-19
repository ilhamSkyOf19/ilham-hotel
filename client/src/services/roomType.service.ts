import api from "../libs/axios";
import type {
  RoomTypeCreateRequestType,
  RoomTypeResponseType,
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
}
