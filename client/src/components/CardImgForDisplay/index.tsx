import clsx from "clsx";
import type { FC } from "react";
import { generateUrlImg } from "../../utils/util";

// card img
type Props = {
  image: string;
  handleModalActive: () => void;
  handleDelete: () => void;
  admin: boolean;
};
const CardImgForDisplay: FC<Props> = ({
  image,
  handleDelete,
  handleModalActive,
  admin,
}) => {
  return (
    <div
      className={clsx(
        "col-span-1 bg-white",
        admin ? "h-54 p-2.5 rounded-2xl" : "h-48",
        admin && "shadow-[0_0_10px_3px_rgba(0,0,0,0.05)]"
      )}
    >
      <button
        type="button"
        onClick={() => handleModalActive()}
        className={clsx(
          "w-full rounded-2xl overflow-hidden shrink-0 relative before:content-[''] before:absolute before:inset-0 before:bg-black/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:ease-in-out",
          admin ? "h-[80%]" : "h-full"
        )}
      >
        {/* img */}
        <img
          src={generateUrlImg({ path: "galleries", img: image })}
          alt="image"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </button>

      {/* button delete */}
      {admin && (
        <button
          type="button"
          onClick={() => handleDelete()}
          className="w-full h-[15%] rounded-lg flex flex-col justify-center items-center bg-red-500 text-white capitalize font-medium text-sm"
        >
          delete
        </button>
      )}
    </div>
  );
};

// card img
export default CardImgForDisplay;
