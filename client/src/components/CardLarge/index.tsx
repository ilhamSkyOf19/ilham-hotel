import { type FC } from "react";
import { Link } from "react-router-dom";
import ContentCard from "../ContentCard";
import ButtonFavorite from "../ButtonFavorite";

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
        <ButtonFavorite />
      </div>

      {/* content */}
      <div className="w-full mt-4">
        <ContentCard
          discount={discount}
          rating={rating}
          title={title}
          location={location}
          price={price}
        />
      </div>
    </Link>
  );
};

export default CardLarge;
