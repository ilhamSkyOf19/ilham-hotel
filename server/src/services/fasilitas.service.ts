import {
  FasilitasCreateRequestType,
  FasilitasResponseType,
  toFasilitasResponseType,
} from "../models/fasilitas-model";
import FasilitasModel from "../schemas/fasilitas.schema";

export class FasilitasService {
  // crate
  static async create(
    data: FasilitasCreateRequestType
  ): Promise<FasilitasResponseType | null> {
    // call schema
    const response = await FasilitasModel.create(data);

    // response
    return toFasilitasResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }
}
