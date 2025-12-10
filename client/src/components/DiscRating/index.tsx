import { type FC } from "react";
import { FaStar } from "react-icons/fa6";

type Props = {
  discount: number;
  rating: number;
};
const DiscRating: FC<Props> = ({ discount, rating }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      {/* discount */}
      <h2 className="bg-primary-gray/30 text-xs font-medium text-primary-skyblue rounded-lg py-2 px-3">
        {`${discount}%`} Off
      </h2>

      {/* rating */}
      <div className="flex flex-row justify-start items-center gap-1">
        {/* start */}
        <FaStar className="text-lg text-yellow-500" />

        {/* rating */}
        <h2 className="text-sm   text-black">{rating}</h2>
      </div>
    </div>
  );
};

export default DiscRating;
