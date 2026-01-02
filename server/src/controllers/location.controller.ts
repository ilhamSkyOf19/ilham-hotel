import { NextFunction, Request, Response } from "express";
import {
  LocationCreateRequestType,
  LocationResponseType,
} from "../models/location-model";
import { ResponseType } from "../types/request-response";
import { LocationService } from "../services/location.service";

export class LocationController {
  // create
  static async create(
    req: Request<{}, {}, LocationCreateRequestType>,
    res: Response<ResponseType<LocationResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get req from body
      const { city, country } = req.body;

      //   cek
      const findField = await LocationService.readByCityAndCountry(
        city.toLocaleLowerCase().trim(),
        country.toLocaleLowerCase().trim()
      );

      // cek
      if (findField) {
        return res.status(400).json({
          status: "failed",
          message: "field sudah ada",
          data: null,
        });
      }

      // call service
      const response = await LocationService.create({ city, country });

      // cek response
      if (!response) {
        return res.status(400).json({
          status: "failed",
          message: "gagal membuat location",
          data: null,
        });
      }

      // return
      return res.status(201).json({
        status: "failed",
        message: "berhasil membuat location",
        data: response,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  //   read all
  static async readAll(
    _req: Request,
    res: Response<ResponseType<LocationResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      //   cek
      const response = await LocationService.readAll();

      // return
      return res.status(201).json({
        status: "failed",
        message: "berhasil membuat location",
        data: response,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}
