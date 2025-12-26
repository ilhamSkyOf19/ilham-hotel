import { type FC } from "react";
import { GrFavorite } from "react-icons/gr";

const ButtonFavorite: FC = () => {
  return (
    <button
      type="button"
      className="w-7.5 h-7.5 rounded-full bg-white flex flex-row justify-center items-center absolute top-1.5 right-1.5"
    >
      <GrFavorite className="text-base text-primary-skyblue" />
    </button>
  );
};

export default ButtonFavorite;
