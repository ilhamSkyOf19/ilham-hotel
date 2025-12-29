import { type FC } from "react";
import ContentCard from "../ContentCard";
import { useNavigate } from "react-router-dom";
import { generateUrlImg } from "../../utils/util";

// props
type Props = {
  thumbnail: string;
  discount: number;
  rating: number;
  title: string;
  location: string;
  price: number;
  linkDetail?: string;
};

const CardMedium: FC<Props> = ({
  thumbnail,
  discount,
  rating,
  title,
  location,
  price,
  linkDetail,
}) => {
  // navigate
  const navigate = useNavigate();
  return (
    <div className="w-full h-44 flex flex-row justify-start items-start bg-white shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] rounded-xl px-4 py-2 gap-2">
      {/* thumbnail */}
      <div className="flex-4 h-full bg-black rounded-lg overflow-hidden group">
        <img
          src={generateUrlImg({ path: "galleries", img: thumbnail })}
          alt="thumbnail"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out origin-center"
        />
      </div>

      {/* content */}
      <button
        type="button"
        onClick={() =>
          navigate(linkDetail ?? "", {
            state: { from: "/dashboard/hotel" },
          })
        }
        className="flex-5 h-full flex flex-col justify-start items-start"
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

export default CardMedium;
