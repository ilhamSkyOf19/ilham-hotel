import { createBrowserRouter } from "react-router";
import FirstPage from "../pages/FirstPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
]);

// export
export default route;
