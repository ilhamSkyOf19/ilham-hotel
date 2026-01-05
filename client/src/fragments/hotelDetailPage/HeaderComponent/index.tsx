import { FaLocationArrow } from "react-icons/fa6";
import DiscRating from "../../../components/DiscRating";
import type { FC } from "react";

// header component
type Props = {
  nameHotel: string;
  linkMaps: string;
  city: string;
  country: string;
  discount: number;
  rating: number;
  totalReviews: number;
};
const HeaderComponent: FC<Props> = ({
  nameHotel,
  linkMaps,
  city,
  country,
  discount,
  rating,
  totalReviews,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="w-full flex flex-row justify-between items-center  px-4">
        {/* disc */}
        <DiscRating
          discount={discount}
          rating={rating}
          reviews={totalReviews}
        />
      </div>

      {/* title & address */}
      <div className="w-full flex flex-col justify-start items-start gap-0.5 mt-4  px-4">
        {/* title */}
        <h1 className="text-2xl font-semibold">{nameHotel}</h1>

        {/* address */}
        <a
          href={linkMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-light text-gray-400 hover:text-primary-skyblue transition-all duration-150 ease-in-out flex flex-row justify-start items-center gap-1 group hover:underline"
        >
          {city}, {country}
          {/* icon */}
          <FaLocationArrow className="text-base text-primary-skyblue scale-0 group-hover:scale-100 transition-all duration-200 ease-in-out origin-bottom-left" />
        </a>
      </div>
    </div>
  );
};

// export default
export default HeaderComponent;
