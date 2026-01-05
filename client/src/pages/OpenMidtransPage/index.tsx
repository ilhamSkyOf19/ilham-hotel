import { type FC } from "react";
import loadingWhite from "../../assets/animation/loading-white.svg";

const OpenMidtransPage: FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-primary-skyblue relative">
      <h1 className="text-3xl font-semibold text-white">Open Payment</h1>

      {/* loading */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50">
        <img src={loadingWhite} alt="loading white" className="w-20 mb-32" />
      </div>
    </div>
  );
};

export default OpenMidtransPage;
