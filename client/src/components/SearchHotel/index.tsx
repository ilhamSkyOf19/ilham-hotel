import { type FC } from "react";
import type { UseFormRegister } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import InputRaw from "../InputRaw";
import { PiSlidersHorizontal } from "react-icons/pi";
import clsx from "clsx";

// search hotel
type SearchHotelProps = {
  register: UseFormRegister<{ search: string }>;
  handleOpenModal: (active: boolean) => void;
  errors?: string;
};
const SearchHotel: FC<SearchHotelProps> = ({
  register,
  handleOpenModal,
  errors,
}) => {
  return (
    <div className="w-[90vw] flex flex-row justify-between items-start gap-3 mt-6">
      {/* search */}
      <div
        className={clsx(
          "flex-4 flex flex-row justify-start items-center  bg-primary-gray/20 rounded-xl px-5 h-14 transition-all duration-200 ease-in-out",
          errors ? "ring-1 ring-red-500" : "ring-1 ring-transparent"
        )}
      >
        {/* icon search  */}
        <FiSearch className="text-3xl text-primary-skyblue" />

        {/* input */}
        <InputRaw
          type="text"
          name="search"
          placeholder="Search hotel..."
          register={register("search")}
        />
      </div>

      {/* filter */}
      <button
        type="button"
        onClick={() => handleOpenModal(true)}
        className="flex-1 h-full bg-primary-skyblue flex flex-row justify-center items-center rounded-xl"
      >
        <PiSlidersHorizontal className="text-3xl text-white" />
      </button>
    </div>
  );
};

export default SearchHotel;
