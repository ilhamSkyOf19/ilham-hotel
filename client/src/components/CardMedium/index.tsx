import { type FC } from "react";
import ContentForCardMedium from "../ContentForCardMedium";

// props
type Props = {
  thumbnail: string;
  discount: number;
  rating: number;
  title: string;
  location: string;
  price: number;
  linkDetail: string;
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
  return (
    <div className="w-full h-40 flex flex-row justify-start items-start bg-white shadow-[0_0_10px_0px_rgba(0,0,0,0.08)] rounded-xl px-4 py-2 gap-3">
      <ContentForCardMedium
        discount={discount}
        linkDetail={linkDetail}
        thumbnail={thumbnail}
        rating={rating}
        title={title}
        location={location}
        price={price}
      />
    </div>
  );
};

export default CardMedium;
