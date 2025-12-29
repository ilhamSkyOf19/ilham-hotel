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
import { createBrowserRouter } from "react-router-dom";
import AddFacilityPage from "../pages/AddFacility";
import { FasilitasService } from "../services/fasilitas.service";
import DashboardOtherPage from "../pages/DashboardOtherPage";
import DashboardHotelPage from "../pages/DashboardHotelPage";
import HotelDetailPage from "../pages/HotelDetailPage";
import { HotelService } from "../services/hotel.service";
import AddGallery from "../pages/AddGallery";
import GalleriesPage from "../pages/GalleriesPage";

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
        element: <DashboardHotelPage />,
      },

      {
        path: "hotel/add",
        element: <AddHotelPage />,
      },
      {
        path: "hotel/detail/:id",
        element: <HotelDetailPage />,
      },
      {
        path: "hotel/detail/:id/galleries",
        element: <GalleriesPage />,
      },
      {
        path: "hotel/detail/:id/add-gallery",
        element: <AddGallery />,
      },
      {
        path: "other",
        element: <DashboardOtherPage />,
      },
      {
        path: "other/add-facility",
        element: <AddFacilityPage />,
      },
      {
        path: "other/update-facility/:id",
        loader: async ({ params }) => {
          try {
            return await FasilitasService.readById(params.id!);
          } catch (error) {
            console.log("error", error);
            return;
          }
        },
        element: <AddFacilityPage />,
      },
    ],
  },
]);

// export
export default route;
