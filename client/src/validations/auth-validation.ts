import z, { ZodType } from "zod";
import type { UserCreateRequestType } from "../models/user-model";
import type { AuthLoginRequestType } from "../models/auth-model";

export class AuthValidation {
  static readonly REGISTER = z
    .object({
      fullName: z
        .string("Full Name tidak valid")
        .min(1, "Full Name harus diisi")
        .max(50, "Full Name maksimal 50 karakter")
        .regex(/^[a-zA-Z\s]+$/, "Full Name tidak valid"),
      email: z
        .email("Email tidak valid")
        .min(1, "Email harus diisi")
        .max(50, "Email maksimal 50 karakter"),
      phone: z
        .string()
        .min(10, "Phone minimum 10 digits")
        .max(15, "Phone maximum 15 digits")
        .regex(/^\d+$/, "Phone tidak valid"),
      password: z
        .string("Password is required")
        .min(6, "Password minimal 6 karakter")
        .max(20, "Password maksimal 20 karakter"),
      confirmPassword: z
        .string("Confirm password is required")
        .min(6, "Password minimal 6 karakter")
        .max(20, "Password maksimal 20 karakter"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .strict() satisfies ZodType<UserCreateRequestType>;

  // activation code
  // static readonly ACTIVATION_CODE = z.object({ code: z.string() }).strict();

  // login
  static readonly LOGIN = z
    .object({
      email: z
        .email("Email tidak valid")
        .min(1, "Email harus diisi")
        .max(50, "Email maksimal 50 karakter"),
      password: z
        .string("Password is required")
        .min(6, "Password minimal 6 karakter")
        .max(20, "Password maksimal 20 karakter"),
    })
    .strict() satisfies ZodType<AuthLoginRequestType>;

  // activation code
  static readonly ACTIVATION_CODE = z
    .object({
      code: z
        .string("Code is required")
        .min(4, "Code harus diisi")
        .max(4, "Code maksimal 4 karakter")
        .regex(/^[0-9]+$/, "Code tidak valid"),
      email: z.email("Email is required"),
    })
    .strict();
}
