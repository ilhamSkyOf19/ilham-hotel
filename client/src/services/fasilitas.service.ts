import api from "../libs/axios";
import type {
  FasilitasCreateRequestType,
  FasilitasResponseType,
  FasilitasUpdateRequestType,
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

  // read detail by id
  static async readById(
    id: string
  ): Promise<ResponseType<FasilitasResponseType | null>> {
    // call api
    const response = await api
      .get(`/fasilitas/read-detail/${id}`)
      .then((res) => res.data);

    // return response
    return response;
  }

  // update by id
  static async update(
    req: FasilitasUpdateRequestType & {
      id: string;
    }
  ): Promise<ResponseType<FasilitasResponseType | null>> {
    // call service
    const response = await api
      .patch(`/fasilitas/update/${req.id}`, {
        fasilitas: req.fasilitas,
      })
      .then((res) => res.data);

    // return response
    return response;
  }

  // delete by id
  static async deleteById(
    id: string
  ): Promise<ResponseType<FasilitasResponseType | null>> {
    // call service
    const response = await api
      .delete(`/fasilitas/delete/${id}`)
      .then((res) => res.data);

    // return response
    return response;
  }
}
