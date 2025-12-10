import { type FC } from "react";
import { Outlet } from "react-router";
import BottomNavigation from "../BottomNavigation";

const LayoutPage: FC = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-start relative">
      {/* children */}
      <Outlet />

      {/* bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default LayoutPage;
