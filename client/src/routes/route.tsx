import FirstPage from "../pages/FirstPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ActivationPage from "../pages/ActivationPage";
import HomePage from "../pages/HomePage";
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
// import { HotelService } from "../services/hotel.service";
import AddGallery from "../pages/AddGallery";
import GalleriesPage from "../pages/GalleriesPage";
import NotFoundPage from "../pages/NotFoundPage";
import BookingsPage from "../pages/BookingsPage";
import { useGetAuthUser } from "../hooks/useAuth";
import NotificationPage from "../pages/NotificationPage";
import EreceiptPage from "../pages/EreceiptPage";
import BookingDetailPage from "../pages/BookingDetailPage";
import OpenMidtransPage from "../pages/OpenMidtransPage";

const route = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
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
    path: "/open-midtrans",
    element: <OpenMidtransPage />,
  },

  {
    path: "/",
    loader: async () => {
      return await useGetAuthUser("all");
    },
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      // success page
      {
        path: "/success-booking/:id",
        element: <NotificationPage typePage="success" />,
      },

      // error page
      {
        path: "/error-booking",
        element: <NotificationPage typePage="error" />,
      },

      // pending page
      {
        path: "/pending-booking/:id",
        element: <NotificationPage typePage="pending" />,
      },

      // update hotel
      {
        path: "/hotel/detail/:id/update",
        element: <HotelDetailPage />,
      },

      // hotel galleries
      {
        path: "hotel/detail/:id/galleries",
        element: <GalleriesPage />,
      },
      {
        path: "/history",
        element: <HomePage />,
      },
      // bookings
      {
        path: "bookings",
        element: <BookingsPage />,
      },
      {
        path: "bookings/ereceipt/:id",
        element: <EreceiptPage />,
      },
      {
        path: "bookings/detail/:id",
        element: <BookingDetailPage />,
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

      // dashboard admin
      {
        path: "dashboard",
        loader: async () => {
          return await useGetAuthUser("admin");
        },
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
          // update hotel
          {
            path: "hotel/detail/:id/update",
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
          // other
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
    ],
  },
]);

// export
export default route;
