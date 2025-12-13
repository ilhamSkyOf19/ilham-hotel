import { type FC } from "react";
import { Outlet } from "react-router";
import BottomNavigation from "../BottomNavigation";

const DashboardLayoutPage: FC = () => {
  return (
    <div className="">
      <Outlet />

      {/* bottom navigation admin */}
      <BottomNavigation />
    </div>
  );
};

export default DashboardLayoutPage;
