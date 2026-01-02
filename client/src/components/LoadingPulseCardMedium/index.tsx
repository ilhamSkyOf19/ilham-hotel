import { type FC } from "react";

const LoadingPulseCardMedium: FC = () => {
  return (
    <div className="w-full h-44 flex flex-row justify-start items-start bg-white shadow-[0_0_10px_0px_rgba(0,0,0,0.08)] rounded-xl px-4 py-2 gap-3 animate-pulse">
      <div className="flex-4 h-full bg-gray-200 rounded-lg overflow-hidden group"></div>
      <div className="flex-5 h-full rounded-lg overflow-hidden group">
        <div className="pt-4 w-full flex flex-col justify-start items-start">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="w-12 h-6 bg-gray-200 rounded-sm" />
            <div className="w-12 h-6 bg-gray-200 rounded-sm" />
          </div>

          <div className="w-full h-8 bg-gray-200 mt-4" />
          <div className="w-[40%] h-3 bg-gray-200 mt-2" />
          <div className="w-[60%] h-4 bg-gray-200 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPulseCardMedium;
