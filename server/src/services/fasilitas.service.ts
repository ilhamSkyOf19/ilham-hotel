import {
  FasilitasCreateRequestType,
  FasilitasResponseType,
  FasilitasUpdateRequestType,
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

  // read fasilitas
  static async readAll(): Promise<FasilitasResponseType[] | []> {
    // call response
    const response = await FasilitasModel.find();

    // return
    return response.map((item) =>
      toFasilitasResponseType({
        ...item.toObject(),
        _id: item._id.toString(),
      })
    );
  }

  // read by email
  static async readById(id: string): Promise<FasilitasResponseType | null> {
    // call response
    const response = await FasilitasModel.findById(id);

    // cek response
    if (!response) {
      return null;
    }

    // return
    return toFasilitasResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // update fasilitas by id
  static async updateById(
    id: string,
    data: FasilitasUpdateRequestType
  ): Promise<FasilitasResponseType | null> {
    // call response
    const response = await FasilitasModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    // cek response
    if (!response) {
      return null;
    }

    // return
    return toFasilitasResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // delete fasilitas by id
  static async deleteById(id: string): Promise<FasilitasResponseType | null> {
    // call response
    const response = await FasilitasModel.findOneAndDelete({ _id: id });

    // cek response
    if (!response) {
      return null;
    }

    // return
    return toFasilitasResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }
}
