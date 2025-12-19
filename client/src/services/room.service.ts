import api from "../libs/axios";
import type {
  RoomCreateRequestType,
  RoomResponseType,
} from "../models/room-validation";
import type { ResponseType } from "../utils/response-type";

export class RoomService {
  // create
  static async create(
    data: RoomCreateRequestType
  ): Promise<ResponseType<RoomResponseType | null>> {
    // call api
    const response = api.post("/room/create", data).then((res) => res.data);

    // return response
    return response;
  }
}
