import { type FC } from "react";
import loadingBlue from "../../assets/animation/loading-blue.svg";

// Props

const LoadingBlue: FC = () => {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      <img src={loadingBlue} alt="loading blue" className="w-10" />
    </div>
  );
};

export default LoadingBlue;
