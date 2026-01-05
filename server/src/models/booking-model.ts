import { Types } from "mongoose";
import { HotelResponseForDisplayType } from "./hotel-model";

// IBooking
export type IBooking = {
  _id: string;
  user: Types.ObjectId;
  hotel: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  visitor: number;
  totalPrice: number;
  token: string;
  active: boolean;
  room: number;
  holdUntil: Date | null;
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
    fullName: string;
    phone: string;
  };
  hotel: {
    _id: string;
    name: string;
    taxAndFees: number;
    discount: number;
  };
  checkIn: Date;
  checkOut: Date;
  visitor: number;
  holdUntil: Date | null;
  totalPrice: number;
  room: number;
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

// booking update callback
export type BookingUpdateCallbackRequestType = {
  status: "pending" | "success" | "failed";
  active: boolean;
  holdUntil?: Date | null;
  token?: string;
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
      fullName: response.user.fullName,
      phone: response.user.phone,
    },
    hotel: {
      _id: response.hotel._id,
      name: response.hotel.name,
      taxAndFees: response.hotel.taxAndFees,
      discount: response.hotel.discount,
    },
    token: response.token,
    active: response.active,
    room: response.room,
    checkIn: response.checkIn,
    checkOut: response.checkOut,
    holdUntil: response.holdUntil,
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
