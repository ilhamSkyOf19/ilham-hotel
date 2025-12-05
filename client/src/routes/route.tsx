import { createBrowserRouter } from "react-router";
import FirstPage from "../pages/FirstPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ActivationPage from "../pages/ActivationPage";

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
]);

// export
export default route;
