import { type FC } from "react";
import ContentCard from "../ContentCard";

// props
type Props = {
  thumbnail: string;
  discount: number;
  rating: number;
  title: string;
  location: string;
  price: number;
};

const CardMedium: FC<Props> = ({
  thumbnail,
  discount,
  rating,
  title,
  location,
  price,
}) => {
  return (
    <div className="w-full h-44 flex flex-row justify-start items-start bg-white shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] rounded-xl px-4 py-2 gap-2">
      {/* thumbnail */}
      <div className="flex-4 h-full bg-black rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* content */}
      <div className="flex-5 h-full flex flex-col justify-start items-start">
        <ContentCard
          discount={discount}
          rating={rating}
          title={title}
          location={location}
          price={price}
        />
      </div>
    </div>
  );
};

export default CardMedium;
