import { type FC } from "react";

const LoadingPulseCardLarge: FC = () => {
  return (
    <div className="w-60 h-80 flex flex-col justify-start items-start bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.08)] shrink-0 rounded-lg py-2.5 px-2.5 animate-pulse">
      <div className="h-[50%] w-full rouned rounded-lg bg-gray-200" />

      <div className="pt-4 w-full flex flex-col justify-start items-start">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-12 h-6 bg-gray-200 rounded-sm" />
          <div className="w-12 h-6 bg-gray-200 rounded-sm" />
        </div>

        <div className="w-[70%] h-8 bg-gray-200 mt-4" />
        <div className="w-[40%] h-3 bg-gray-200 mt-2" />
        <div className="w-[60%] h-4 bg-gray-200 mt-2" />
      </div>
    </div>
  );
};

export default LoadingPulseCardLarge;
