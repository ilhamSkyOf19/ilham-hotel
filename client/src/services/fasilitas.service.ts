import api from "../libs/axios";
import type {
  FasilitasCreateRequestType,
  FasilitasResponseType,
} from "../models/fasilitas-model";
import type { ResponseType } from "../utils/response-type";

export class FasilitasService {
  // create
  static async create(
    data: FasilitasCreateRequestType
  ): Promise<ResponseType<FasilitasResponseType | null>> {
    // call api
    const response = await api
      .post("/fasilitas/create", data)
      .then((res) => res.data);

    // return response
    return response;
  }

  //   read all
  static async readAll(): Promise<ResponseType<FasilitasResponseType[] | []>> {
    // call api
    const response = await api.get("/fasilitas/read").then((res) => res.data);

    // return response
    return response;
  }
}
