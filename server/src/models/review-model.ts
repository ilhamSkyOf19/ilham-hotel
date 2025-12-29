import { Types } from "mongoose";

// iReview
export type iReview = {
  user: Types.ObjectId;
  hotel: Types.ObjectId;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

// create request
export type ReviewCreateRequestType = Omit<
  iReview,
  "createdAt" | "updatedAt" | "user" | "hotel"
> & {
  hotel: string;
};

// payload
export type PayloadReview = {
  user: {
    _id: string;
    name: string;
    title: string;
    avatar: string;
  };
  hotel: {
    _id: string;
    name: string;
  };
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

// response type
export type ReviewResponseType = PayloadReview;

// to response
export const toReviewResponseType = (
  response: PayloadReview
): ReviewResponseType => {
  return {
    user: {
      _id: response.user._id,
      name: response.user.name,
      title: response.user.title,
      avatar: response.user.avatar,
    },
    hotel: {
      _id: response.hotel._id,
      name: response.hotel.name,
    },
    review: response.review,
    rating: response.rating,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
};
