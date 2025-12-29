import { NextFunction, Request, Response } from "express";
import {
  ReviewCreateRequestType,
  ReviewResponseType,
} from "../models/review-model";
import { AuthRequest, ResponseType } from "../types/request-response";
import { ReviewService } from "../services/review.service";
import { HotelService } from "../services/hotel.service";

export class ReviewController {
  // create
  static async create(
    req: AuthRequest<{}, {}, ReviewCreateRequestType>,
    res: Response<ResponseType<ReviewResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get request from body
      const body = req.body;

      //   get user from req data
      const idUser = req.data?._id ?? "";

      //   cek existing
      const existingReview =
        await ReviewService.checkExistReviewByIdHotelAndUser({
          idHotel: body.hotel,
          user: idUser,
        });

      // cek
      if (existingReview) {
        return res.status(404).json({
          status: "failed",
          message: "Review sudah ada",
          data: null,
        });
      }

      // cek hotel
      const findHotel = await HotelService.readByIdforCheck(body.hotel);

      // cek
      if (!findHotel) {
        return res.status(404).json({
          status: "failed",
          message: "Hotel not found",
          data: null,
        });
      }

      // call service
      const response = await ReviewService.create({
        ...body,
        user: idUser,
      });

      // cek response
      if (!response) {
        return res.status(400).json({
          status: "failed",
          message: "invalid request",
          data: null,
        });
      }

      //   return response
      return res.status(201).json({
        status: "success",
        message: "review success created",
        data: response,
      });
    } catch (error) {
      // cek
      console.log(error);
      next(error);
    }
  }

  //   read review by id hotel
  static async readAllReviewByIdHotel(
    req: Request<{ idHotel: string }>,
    res: Response<ResponseType<ReviewResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      // get id hotel from params
      const idHotel = req.params.idHotel;

      // call service
      const response = await ReviewService.readAllReviewByIdHotel(idHotel);

      // cek response
      if (!response) {
        return res.status(404).json({
          status: "failed",
          message: "Review not found",
          data: null,
        });
      }

      //   return
      return res.status(200).json({
        status: "success",
        message: "Review berhasil dibaca",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
