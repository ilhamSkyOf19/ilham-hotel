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

  // read detail
  static async readDetail(
    idBooking: string
  ): Promise<ResponseType<BookingResponseType | null>> {
    // call api
    const response = await api
      .get(`/booking/read-detail/${idBooking}`)
      .then((res) => res.data);

    // return
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

    console.log(response);

    // return
    return response;
  }

  // get token is pending
  static async getIdBookingIsPending(
    idHotel: string
  ): Promise<ResponseType<null>> {
    // call api
    const response = await api
      .get(`/booking/get-id-booking/${idHotel}`)
      .then((res) => res.data);

    return response;
  }

  // download ereciept
  static async downloadEreceipt(idBooking: string): Promise<string> {
    const response = await api.get(`/pdf/ereceipt/${idBooking}`, {
      responseType: "blob",
    });

    // create url
    const url = window.URL.createObjectURL(new Blob([response.data]));

    return url;
  }
}
