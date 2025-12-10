import { createBrowserRouter } from "react-router";
import FirstPage from "../pages/FirstPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ActivationPage from "../pages/ActivationPage";
import HomePage from "../pages/HomePage";
import { AuthService } from "../services/auth.service";
import LayoutPage from "../fragments/LayoutPage";

const route = createBrowserRouter([
  {
    path: "/welcome",
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
    path: "/",
    loader: async () => {
      return await AuthService.getAuthUser();
    },
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/history",
        element: <HomePage />,
      },
      {
        path: "/room",
        element: <HomePage />,
      },
      {
        path: "/favorite",
        element: <HomePage />,
      },
      {
        path: "/user",
        element: <HomePage />,
      },
    ],
  },
]);

// export
export default route;
