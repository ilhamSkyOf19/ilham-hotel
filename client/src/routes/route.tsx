import FirstPage from "../pages/FirstPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ActivationPage from "../pages/ActivationPage";
import HomePage from "../pages/HomePage";
import { AuthService } from "../services/auth.service";
import LayoutPage from "../fragments/LayoutPage";
import Grafik from "../pages/Grafik";
import DashboardAdmin from "../pages/DashboardAdmin";
import AddHotelPage from "../pages/AddHotelPage";
import { createBrowserRouter } from "react-router";
import OtherPage from "../pages/OtherPage";
import AddRoomTypePage from "../pages/AddRoomTypePage";
import AddFacilityPage from "../pages/AddFacility";
import RoomPage from "../pages/RoomPage";
import AddRoomPage from "../pages/AddRoomPage";
import { RoomTypeService } from "../services/roomType.service";

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
    path: "/coba",
    element: <Grafik />,
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
  {
    path: "/dashboard",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <DashboardAdmin />,
      },
      {
        path: "hotel",
        element: <AddHotelPage />,
      },
      {
        path: "hotel/add",
        element: <AddHotelPage />,
      },
      {
        path: "room",
        element: <RoomPage />,
      },
      {
        path: "room/add",
        element: <AddRoomPage />,
      },
      {
        path: "other",
        element: <OtherPage />,
      },
      {
        path: "other/add-room-type",
        element: <AddRoomTypePage />,
      },
      {
        path: "other/update-room-type/:id",
        loader: async ({ params }) => {
          return await RoomTypeService.readonlyById(params.id!);
        },
        element: <AddRoomTypePage />,
      },
      {
        path: "other/add-facility",
        element: <AddFacilityPage />,
      },
    ],
  },
]);

// export
export default route;
