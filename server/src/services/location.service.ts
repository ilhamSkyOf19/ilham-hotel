import {
  LocationCreateRequestType,
  LocationResponseType,
  PayloadLocation,
  toLocationResponseType,
} from "../models/location-model";
import LocationModel from "../schemas/location.schema";

export class LocationService {
  // create
  static async create(
    req: LocationCreateRequestType
  ): Promise<LocationResponseType | null> {
    // call model
    const model = await LocationModel.create(req);

    // get location
    const response = await LocationModel.findById(
      model._id
    ).lean<PayloadLocation>();

    // cek
    if (!response) return null;

    return toLocationResponseType(response);
  }

  //   read all
  static async readAll(): Promise<LocationResponseType[] | []> {
    // call model
    const response = await LocationModel.find().lean<PayloadLocation[]>();

    // return response
    return response.map((data) => toLocationResponseType(data));
  }

  //   read by city & country
  static async readByCityAndCountry(
    city: string,
    country: string
  ): Promise<LocationResponseType | null> {
    // call model
    const response = await LocationModel.findOne({
      city,
      country,
    }).lean<PayloadLocation>();

    // cek
    if (!response) return null;

    return toLocationResponseType(response);
  }
}
