import type { HotelResponseForDisplayType } from "./hotel-model";

// IBooking
export type IBooking = {
  _id: string;
  user: string;
  hotel: string;
  checkIn: Date;
  checkOut: Date;
  visitor: number;
  totalPrice: number;
  token: string;
  active: boolean;
  status: "pending" | "success" | "failed";
  createdAt: Date;
  updatedAt: Date;
};

// payload
export type PayloadBooking = {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  hotel: {
    _id: string;
    name: string;
  };
  checkIn: Date;
  checkOut: Date;
  visitor: number;
  totalPrice: string;
  token: string;
  active: boolean;
  status: "pending" | "success" | "failed";
  createdAt: Date;
  updatedAt: Date;
};

// create request
export type BookingCreateRequestType = Pick<IBooking, "visitor"> & {
  hotel: string;
  checkIn: string;
  checkOut: string;
};

// response
export type BookingResponseType = PayloadBooking;

// to response
export const toBookingResponseType = (
  response: PayloadBooking
): BookingResponseType => {
  return {
    _id: response._id,
    user: {
      _id: response.user._id,
      email: response.user.email,
    },
    hotel: {
      _id: response.hotel._id,
      name: response.hotel.name,
    },
    token: response.token,
    active: response.active,
    checkIn: response.checkIn,
    checkOut: response.checkOut,
    visitor: response.visitor,
    totalPrice: response.totalPrice,
    status: response.status,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
};

// data booking with data hotel
export type BookingWithHotelPopulated = {
  _id: string;
  hotel: HotelResponseForDisplayType;
};

// booking for display
export type BookingForDisplayResponseType = BookingWithHotelPopulated;

// to response
export const toBookingForDisplayResponseType = (
  response: BookingForDisplayResponseType
): BookingForDisplayResponseType => {
  return response;
};
