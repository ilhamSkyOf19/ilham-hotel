import api from "../libs/axios";
import type { AuthLoginRequestType, PayloadType } from "../models/auth-model";
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

  // login
  static async login(
    data: AuthLoginRequestType
  ): Promise<
    ResponseType<Omit<
      UserResponseType,
      "isActive" | "_id" | "createdAt" | "updatedAt"
    > | null>
  > {
    const response = api
      .post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);

    return response;
  }

  //   activation ode
  static async activationCode(data: {
    code: number;
  }): Promise<ResponseType<UserResponseType | null>> {
    const response = api
      .post(
        "/auth/activation",
        { code: data.code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);

    return response;
  }

  // resend
  static async resend(): Promise<ResponseType<UserResponseType | null>> {
    // call api
    const response = await api.post("/auth/resend").then((res) => res.data);

    return response;
  }

  // get auth for activation
  static async getAuthActivation(): Promise<ResponseType<PayloadType | null>> {
    // call api
    const response = await api
      .get("/auth/get-auth-activation")
      .then((res) => res.data);

    return response;
  }

  // get user for auth
  static async getAuthUser(): Promise<
    ResponseType<Omit<UserResponseType, "_id" | "isActive"> | null>
  > {
    // call api
    const response = await api.get(`/auth/get-auth`).then((res) => res.data);

    return response;
  }
}
