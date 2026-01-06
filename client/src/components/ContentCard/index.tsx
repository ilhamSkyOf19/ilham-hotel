import { type FC } from "react";
import DiscRating from "../DiscRating";
import LocationGray from "../LocationGray";
import { formatCurrency } from "../../utils/util";

type Props = {
  discount: number;
  rating: number;
  title: string;
  location: string;
  price: number;
};
const ContentCard: FC<Props> = ({
  discount,
  rating,
  title,
  location,
  price,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start relative">
      {/* discount & rating */}
      <DiscRating discount={discount} rating={rating} reviews={0} />

      {/* title */}
      <h3 className="text-lg font-semibold text-black mt-2 text-left">
        {title.length >= 12 ? title.slice(0, 12).concat("...") : title}
      </h3>

      {/* location */}
      <LocationGray address={location} />

      {/* price */}
      <div className="w-full flex flex-row justify-start items-center gap-1 mt-1">
        {/* price */}
        <span className="text-sm font-medium text-primary-skyblue mt-2">
          {formatCurrency(price)}
        </span>

        {/* /* per night */}
        <span className="text-xs text-gray-400 mt-2">/night</span>
      </div>
    </div>
  );
};

export default ContentCard;
