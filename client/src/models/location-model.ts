// ILocation
export type ILocation = {
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
};

// payload location
export type PayloadLocation = ILocation & {
  _id: string;
};

// create request
export type LocationCreateRequestType = Pick<ILocation, "city" | "country">;

// response
export type LocationResponseType = PayloadLocation;

// to response
export const toLocationResponseType = (
  response: PayloadLocation
): LocationResponseType => {
  return {
    _id: response._id,
    city: response.city,
    country: response.country,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
};
