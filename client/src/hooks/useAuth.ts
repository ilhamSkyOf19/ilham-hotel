import { redirect } from "react-router-dom";
import { AuthService } from "../services/auth.service";

// get user for activation
export const useGetAuthActivation = async () => {
  try {
    // call response
    const response = await AuthService.getAuthActivation();

    return response;
  } catch (error) {
    console.log(error);
  }
};

// get user for auth
export const useGetAuthUser = async (role: "admin" | "customer" | "all") => {
  try {
    // call response
    const response = await AuthService.getAuthUser();

    // cek admin
    if (role === "admin" && response?.data?.role !== "admin") {
      throw redirect("/");
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};
