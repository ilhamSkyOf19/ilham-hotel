import {
  PayloadReview,
  ReviewCreateRequestType,
  ReviewResponseType,
  toReviewResponseType,
} from "../models/review-model";
import ReviewModel from "../schemas/review.schema";

export class ReviewService {
  // create
  static async create(
    req: ReviewCreateRequestType & {
      user: string;
    }
  ): Promise<ReviewResponseType | null> {
    // call model
    const response = await ReviewModel.create(req);

    // get payload
    const payload = await ReviewModel.findById(response._id)
      .populate("user", "_id fullName title avatar")
      .populate("hotel", "_id name")
      .lean<PayloadReview>();

    // cek
    if (!payload) {
      return null;
    }

    // return response
    return toReviewResponseType(payload);
  }

  //   cek exist review by id hotel & user
  static async checkExistReviewByIdHotelAndUser(req: {
    idHotel: string;
    user: string;
  }): Promise<boolean> {
    // call response
    const response = await ReviewModel.findOne({
      hotel: req.idHotel,
      user: req.user,
    });

    // cek
    if (!response) {
      return false;
    }

    return true;
  }

  //   get all review by id hotel
  static async readAllReviewByIdHotel(
    idHotel: string
  ): Promise<ReviewResponseType[] | null> {
    // call model
    const response = await ReviewModel.find({ hotel: idHotel })
      .populate("user", "_id fullName title avatar")
      .populate("hotel", "_id name")
      .lean<PayloadReview[]>();

    //   cek response
    if (!response) {
      return null;
    }

    // return response
    return response.map((item) => toReviewResponseType(item));
  }
}
