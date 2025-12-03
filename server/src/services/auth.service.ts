import {
  toUserResponseType,
  UserCreateRequestType,
  UserResponseType,
} from "../models/user-model";
import UserModel from "../schemas/user.schema";

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
    activationCode: string
  ): Promise<UserResponseType | null> {
    try {
      // update
      const response = await UserModel.findOneAndUpdate(
        { activateCode: activationCode },
        { isActive: true },
        { new: true }
      );

      // cek response
      if (!response) {
        return null;
      }

      // return
      return toUserResponseType({
        ...response.toObject(),
        _id: response._id.toString(),
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
