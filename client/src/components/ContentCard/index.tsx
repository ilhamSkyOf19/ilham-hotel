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
    <div className="w-full h-auto flex flex-col justify-start items-start">
      {/* discount & rating */}
      <DiscRating discount={discount} rating={rating} />

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
  );
};

export default ContentCard;
