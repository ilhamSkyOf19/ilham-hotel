import { type FC } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "../BottomNavigation";

const LayoutPage: FC = () => {
  // location path
  const location = useLocation();
  // use match
  const hotelDetail = !!matchPath(
    { path: "/dashboard/hotel/detail/:id", end: false },
    location.pathname
  );

  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-start relative pb-32">
      {/* children */}
      <Outlet />

      {/* bottom navigation */}
      {!hotelDetail && <BottomNavigation />}
    </div>
  );
};

export default LayoutPage;
