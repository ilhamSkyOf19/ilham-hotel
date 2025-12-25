import { type FC } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const PaginationNumber: FC = () => {
  return (
    <div className="w-full flex flex-row justify-start items-center gap-2 px-4">
      {/* button prev */}
      <button
        type="button"
        className="w-9 h-9 bg-gray-400 rounded-full flex flex-row justify-center items-center hover:bg-gray-600 transition-colors duration-200 ease-in-out"
      >
        <MdOutlineKeyboardArrowLeft className="text-2xl text-white" />
      </button>

      <button
        type="button"
        className="w-9 h-9 bg-gray-400 rounded-full flex flex-row justify-center items-center hover:bg-gray-600 transition-colors duration-200 ease-in-out"
      >
        <MdOutlineKeyboardArrowRight className="text-2xl text-white" />
      </button>
    </div>
  );
};

export default PaginationNumber;
