import { type FC } from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "../BottomNavigation";

const DashboardLayoutPage: FC = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-start relative">
      <Outlet />

      {/* bottom navigation admin */}
      <BottomNavigation />
    </div>
  );
};

export default DashboardLayoutPage;
