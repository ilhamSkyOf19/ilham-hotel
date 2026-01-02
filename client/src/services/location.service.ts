import api from "../libs/axios";
import type { LocationResponseType } from "../models/location-model";
import type { ResponseType } from "../utils/response-type";

export class LocationService {
  // create
  static async readAll(): Promise<ResponseType<LocationResponseType[] | null>> {
    // call api
    const response = await api
      .get("/location/read-all")
      .then((res) => res.data);

    return response;
  }
}
