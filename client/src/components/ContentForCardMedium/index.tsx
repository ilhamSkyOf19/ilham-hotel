import { type FC } from "react";
import { generateUrlImg } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import ContentCard from "../ContentCard";

type Props = {
  thumbnail: string;
  linkDetail: string;
  discount: number;
  rating: number;
  title: string;
  location: string;
  price: number;
  disableDetail?: boolean;
};

const ContentForCardMedium: FC<Props> = ({
  discount,
  linkDetail,
  location,
  price,
  rating,
  thumbnail,
  title,
  disableDetail,
}) => {
  //   navigate
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-4 h-full rounded-lg overflow-hidden group">
        <img
          src={generateUrlImg({ path: "galleries", img: thumbnail })}
          alt="thumbnail"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out origin-center"
        />
      </div>

      {/* content */}
      <button
        disabled={disableDetail}
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
    </>
  );
};

export default ContentForCardMedium;
