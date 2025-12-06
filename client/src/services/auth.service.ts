import api from "../libs/axios";
import type {
  UserCreateRequestType,
  UserResponseType,
} from "../models/user-model";
import type { ResponseType } from "../utils/response-type";

export class AuthService {
  // register
  static async register(
    data: UserCreateRequestType
  ): Promise<ResponseType<UserResponseType | null>> {
    const response = api
      .post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);

    // handle response
    return response;
  }

  //   activation ode
  static async activationCode(data: {
    email: string;
    code: number;
  }): Promise<ResponseType<UserResponseType | null>> {
    const response = api
      .post(
        "/auth/activation",
        { email: data.email, code: data.code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);

    return response;
  }
}
