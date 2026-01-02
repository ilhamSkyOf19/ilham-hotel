import api from "../libs/axios";
import type {
  BookingCreateRequestType,
  BookingForDisplayResponseType,
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

  // get bookings with data hotel
  static async readBookingsWithDataHotels(
    type: "upcoming" | "completed"
  ): Promise<ResponseType<BookingForDisplayResponseType[] | null>> {
    // call apu
    const response = await api
      .get("booking/read", {
        params: { type },
      })
      .then((res) => res.data);

    // return
    return response;
  }
}
