import z, { ZodType } from "zod";
import {
  UserCreateRequestType,
  UserLoginRequestType,
} from "../models/user-model";

export class AuthValidation {
  static readonly REGISTER = z
    .object({
      fullName: z.string("Full name is required"),
      email: z.email("Email is required"),
      phone: z.string("Phone is required"),
      password: z.string("Password is required"),
      confirmPassword: z.string("Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .strict() satisfies ZodType<
    UserCreateRequestType & { confirmPassword: string }
  >;

  // activation code
  static readonly ACTIVATION_CODE = z.object({ code: z.number() }).strict();

  // login
  static readonly LOGIN = z
    .object({
      email: z.email("Email is required"),
      password: z.string("Password is required"),
    })
    .strict() satisfies ZodType<UserLoginRequestType>;
}
