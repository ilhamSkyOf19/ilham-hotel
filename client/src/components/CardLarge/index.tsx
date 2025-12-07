import { type FC } from "react";
import { GrFavorite } from "react-icons/gr";
import { FaStar } from "react-icons/fa6";
import LocationGray from "../LocationGray";
import { formatCurrency } from "../../utils/util";
import { Link } from "react-router";

type Props = {
  thumbnail: string;
  title: string;
  location: string;
  price: number;
  discount: number;
  rating: number;
  link: string;
};
const CardLarge: FC<Props> = ({
  thumbnail,
  title,
  location,
  price,
  discount,
  rating,
  link,
}) => {
  return (
    <Link
      to={link}
      className="w-60 h-80 flex flex-col justify-start items-start bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] shrink-0 rounded-lg py-2.5 px-2.5"
    >
      {/* thumbnail */}
      <div className="w-full h-[50%] bg-black rounded-lg overflow-hidden relative">
        {/* thumbnail */}
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />

        {/* button favorite */}
        <button
          type="button"
          className="w-7.5 h-7.5 rounded-full bg-white flex flex-row justify-center items-center absolute top-1.5 right-1.5"
        >
          <GrFavorite className="text-base text-primary-skyblue" />
        </button>
      </div>

      {/* content */}
      <div className="w-full h-auto flex flex-col justify-start items-start mt-4">
        {/* discount & rating */}
        <div className="w-full flex flex-row justify-between items-center">
          {/* discount */}
          <h2 className="bg-primary-gray/30 text-xs font-medium text-primary-skyblue rounded-lg py-2 px-3">
            {discount} Off
          </h2>

          {/* rating */}
          <div className="flex flex-row justify-start items-center gap-1">
            {/* start */}
            <FaStar className="text-lg text-yellow-500" />

            {/* rating */}
            <h2 className="text-sm   text-black">{rating}</h2>
          </div>
        </div>

        {/* title */}
        <h2 className="text-lg font-semibold text-black mt-2">{title}</h2>

        {/* location */}
        <LocationGray address={location} />

        {/* price */}
        <div className="w-full flex flex-row justify-start items-center gap-1 mt-1">
          {/* price */}
          <h2 className="text-sm font-medium text-primary-skyblue mt-2">
            {formatCurrency(price)}
          </h2>

          {/* /* per night */}
          <h2 className="text-xs text-gray-400 mt-2">/night</h2>
        </div>
      </div>
    </Link>
  );
};

export default CardLarge;
