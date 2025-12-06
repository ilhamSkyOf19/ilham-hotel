import { createBrowserRouter } from "react-router";
import FirstPage from "../pages/FirstPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ActivationPage from "../pages/ActivationPage";
import HomePage from "../pages/HomePage";
import { AuthService } from "../services/auth.service";

const route = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/activation",
    element: <ActivationPage />,
  },
  {
    path: "/home",
    loader: async () => {
      return await AuthService.getAuthUser();
    },
    element: <HomePage />,
  },
]);

// export
export default route;
