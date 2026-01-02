import { type FC } from "react";
import { useNavigate } from "react-router-dom";
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
  handleShowImg: () => void;
};
const CardLarge: FC<Props> = ({
  thumbnail,
  title,
  location,
  price,
  discount,
  rating,
  link,
  handleShowImg,
}) => {
  // navigate
  const navigate = useNavigate();
  return (
    <div className="w-60 h-80 flex flex-col justify-start items-start bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] shrink-0 rounded-lg py-2.5 px-2.5">
      {/* thumbnail */}
      <div
        onClick={() => handleShowImg()}
        className="w-full h-[50%] bg-black rounded-lg overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100 cursor-pointer"
      >
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
      <button
        type="button"
        onClick={() =>
          navigate(link, {
            state: { from: "/hotel" },
          })
        }
        className="w-full pt-4"
      >
        <ContentCard
          discount={discount}
          rating={rating}
          title={title}
          location={location}
          price={price}
        />
      </button>
    </div>
  );
};

export default CardLarge;
