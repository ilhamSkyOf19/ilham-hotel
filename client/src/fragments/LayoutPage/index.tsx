import { Suspense, useEffect, type FC } from "react";
import {
  matchPath,
  Outlet,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import BottomNavigation from "../BottomNavigation";
import type { ResponseType } from "../../utils/response-type";
import type { UserResponseType } from "../../models/user-model";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const LayoutPage: FC = () => {
  // get loader
  const user = useLoaderData() as ResponseType<Omit<
    UserResponseType,
    "_id" | "isActive"
  > | null>;

  // set dispatch redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        setUser({
          email: user?.data?.email,
          fullName: user?.data?.fullName,
          role: user?.data?.role,
        })
      );
    }
  }, [user, dispatch]);

  // location path
  const location = useLocation();
  // use match
  const hiddenNavigatinBottom =
    !!matchPath(
      { path: "/dashboard/hotel/detail/:id", end: false },
      location.pathname
    ) ||
    !!matchPath({ path: "/hotel/detail/:id", end: false }, location.pathname) ||
    !!matchPath(
      { path: "/bookings/ereceipt/:id", end: false },
      location.pathname
    ) ||
    !!matchPath(
      { path: "/success-booking/:id", end: false },
      location.pathname
    ) ||
    !!matchPath({ path: "/error-booking", end: false }, location.pathname) ||
    !!matchPath(
      { path: "/pending-booking/:id", end: false },
      location.pathname
    ) ||
    !!matchPath(
      { path: "/bookings/detail/:idHotel", end: false },
      location.pathname
    );

  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-start relative pb-32">
      {/* children */}
      <Suspense fallback={<div className="w-full h-screen bg-white" />}>
        <Outlet />
      </Suspense>

      {/* bottom navigation */}
      {!hiddenNavigatinBottom && <BottomNavigation />}
    </div>
  );
};

export default LayoutPage;
