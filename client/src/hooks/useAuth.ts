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
export const useGetAuthUser = async () => {
  try {
    // call response
    const response = await AuthService.getAuthUser();

    return response;
  } catch (error) {
    console.log(error);
  }
};
