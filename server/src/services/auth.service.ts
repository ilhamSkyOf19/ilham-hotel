import {
  toUserResponseType,
  UserCreateRequestType,
  UserResponseType,
} from "../models/user-model";
import UserModel from "../schemas/user.schema";
import { ResponseType } from "../types/request-response";

export class AuthService {
  // create
  static async create(
    req: UserCreateRequestType
  ): Promise<UserResponseType | null> {
    // create
    const response = (await UserModel.create(req)).toObject();

    // response
    return toUserResponseType(response);
  }

  // read by email & phone
  static async readByEmailAndPhone(
    email: string,
    phone: string
  ): Promise<UserResponseType | null> {
    // read
    const response = await UserModel.findOne({ email, phone });

    // cek response
    if (!response) {
      return null;
    }

    // response
    return toUserResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // update activation code
  static async updateActivationCode(
    activationCode: number,
    email: string
  ): Promise<ResponseType<UserResponseType | null>> {
    try {
      // update
      const response = await UserModel.findOneAndUpdate(
        { activateCode: activationCode, email },
        { isActive: true },
        { new: true }
      );

      // cek response
      if (!response) {
        return {
          status: "failed",
          message: "Invalid activation code",
          data: null,
        };
      }

      // get createdAt
      const createAt = new Date(response.createdAt);

      // expired duration
      const EXPIRE_TIME = 3 * 60 * 1000;

      // date now
      const dateNow = new Date();

      // cek expired
      if (dateNow.getTime() - createAt.getTime() > EXPIRE_TIME) {
        return {
          status: "failed",
          message: "Expired activation code",
          data: null,
        };
      }

      // return
      return {
        status: "success",
        message: "Success",
        data: toUserResponseType({
          ...response.toObject(),
          _id: response._id.toString(),
        }),
      };
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: "Internal server error",
        data: null,
      };
    }
  }
}
