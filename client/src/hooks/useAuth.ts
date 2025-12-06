import { AuthService } from "../services/auth.service";

// get auth
export const useGetAuthActivation = async () => {
  try {
    // call response
    const response = await AuthService.getAuthActivation();

    return response;
  } catch (error) {
    console.log(error);
  }
};
