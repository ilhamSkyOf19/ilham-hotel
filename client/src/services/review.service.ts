import api from "../libs/axios";
import type { ReviewResponseType } from "../models/review-model";
import type { ResponseType } from "../utils/response-type";

export class ReviewService {
  // create
  static async readAllByIdHotel(
    idHotel: string
  ): Promise<ResponseType<ReviewResponseType[] | null>> {
    // call api
    const response = await api
      .get(`/review/read-all-by-id-hotel/${idHotel}`)
      .then((res) => res.data);

    // return response
    return response;
  }
}
