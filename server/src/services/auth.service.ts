import {
  toUserResponseType,
  UserCreateRequestType,
  UserLoginRequestType,
  UserResponseType,
} from "../models/user-model";
import UserModel from "../schemas/user.schema";
import { ResponseType } from "../types/request-response";
import { renderEmail, sendEmail } from "../utils/mail/mail";
import { generateCode } from "../utils/util";
import bcrypt from "bcrypt";

export class AuthService {
  // get user for activation
  static async getAuthUserForActivation(
    email: string
  ): Promise<UserResponseType | null> {
    const response = await UserModel.findOne({ email });

    if (!response) {
      return null;
    }

    return toUserResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // get user for auth
  static async getAuthUser(email: string): Promise<UserResponseType | null> {
    const response = await UserModel.findOne({ email, isActive: true });

    if (!response) {
      return null;
    }

    return toUserResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

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
      const timeCode = new Date(response.updatedAt);

      // expired duration
      const EXPIRE_TIME = 2 * 60 * 1000;

      // date now
      const dateNow = new Date();

      // cek expired
      if (dateNow.getTime() - timeCode.getTime() > EXPIRE_TIME) {
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

  // read user by email
  static async readUserByEmail(
    email: string
  ): Promise<UserResponseType | null> {
    // call model
    const response = await UserModel.findOne({ email });

    // cek response
    if (!response) {
      return null;
    }

    // return
    return toUserResponseType({
      ...response.toObject(),
      _id: response._id.toString(),
    });
  }

  // update code
  static async resend(email: string): Promise<UserResponseType | null> {
    const response = await UserModel.findOneAndUpdate(
      { email },
      { activateCode: generateCode() },
      { new: true }
    );

    // send email
    if (response) {
      const contentEmail = await renderEmail("registration-succes.ejs", {
        fullname: response.fullName,
        email: response.email,
        phone: response.phone,
        registeredAt: response.createdAt,
        activateCode: response.activateCode,
      });

      // send email
      await sendEmail(response.email, "Activation Code", contentEmail);

      // return

      return toUserResponseType({
        ...response.toObject(),
        _id: response._id.toString(),
      });
    }

    return null;
  }

  // cek user
  static async login(
    req: UserLoginRequestType
  ): Promise<ResponseType<UserResponseType | null>> {
    try {
      // call model
      const response = await UserModel.findOne({
        email: req.email,
        isActive: true,
      });

      // cek response
      if (!response) {
        return {
          status: "failed",
          message: "email or password is wrong",
          data: null,
        };
      }

      // verify password
      const isMatch = await bcrypt.compare(req.password, response.password);

      // cek password
      if (!isMatch) {
        return {
          status: "failed",
          message: "email or password is wrong",
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
