import api from "../libs/axios";
import type {
  BookingCreateRequestType,
  BookingResponseType,
} from "../models/booking-model";
import type { ResponseType } from "../utils/response-type";

export class BookingService {
  // booking
  static async booking(
    data: BookingCreateRequestType
  ): Promise<ResponseType<BookingResponseType | null>> {
    // call api
    const response = await api
      .post("/booking", data, {
        withCredentials: true,
      })
      .then((res) => res.data);

    return response;
  }
}
