import { type FC } from "react";
import ContentForCardMedium from "../ContentForCardMedium";
import clsx from "clsx";
import ButtonDeleteText from "../ButtonDeleteText";

// props
type Props = {
  thumbnail: string;
  discount: number;
  rating: number;
  title: string;
  location: string;
  price: number;
  linkDetail: string;
  admin: boolean;
  handleDelete: () => void;
};

const CardMedium: FC<Props> = ({
  thumbnail,
  discount,
  rating,
  title,
  location,
  price,
  linkDetail,
  admin,
  handleDelete,
}) => {
  return (
    <div
      className={clsx(
        "w-full flex flex-col justify-start items-start bg-white shadow-[0_0_10px_0px_rgba(0,0,0,0.08)] rounded-xl px-4 py-2 gap-1",
        admin ? "h-54" : "h-40"
      )}
    >
      <div
        className={clsx(
          "w-full flex flex-row justify-start items-start gap-3 relative pb-4",
          admin
            ? 'before:content-[""] before:absolute before:h-[0.5px] before:left-0 before:right-0 before:bg-black/20 before:bottom-0 h-[75%]'
            : "h-full"
        )}
      >
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

      {/* container button */}
      {admin && (
        <div className="w-full h-[22%] overflow-hidden flex flex-row justify-end items-center pb-0.5">
          <ButtonDeleteText handleDelete={() => handleDelete()} />
        </div>
      )}
    </div>
  );
};

export default CardMedium;
