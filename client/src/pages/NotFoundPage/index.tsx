import { type FC } from "react";
import { PiLineVertical } from "react-icons/pi";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-center items-center gap-2">
      <div className="w-full flex flex-row justify-center items-center">
        <h3 className="text-2xl text-primary-skyblue font-medium">404</h3>
        <PiLineVertical className="text-3xl text-primary-skyblue" />
        <h3 className="text-xl text-primary-skyblue font-medium">Not Found</h3>
      </div>

      {/* button back */}
      <Link
        to={"/"}
        className="text-base hover:text-primary-skyblue transition-colors duration-200 ease-in-out"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
