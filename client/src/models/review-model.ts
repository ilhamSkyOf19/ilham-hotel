// iReview
export type iReview = {
  user: string;
  hotel: string;
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
    fullName: string;
    title: "BEGINNER" | "REGULAR" | "VERIFIED";
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
      fullName: response.user.fullName,
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
