import { type FC } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { Link } from "react-router-dom";
import { generateUrlImg } from "../../../utils/util";

// Props
type Props = {
  idHotel: string;
  galleries: string[];
};

const SectionGallery: FC<Props> = ({ idHotel, galleries }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start px-4 pt-5 pb-32">
      {/* header */}
      <div className="w-full flex flex-row justify-between items-center">
        {/* title */}
        <h2 className="text-base">Gallery (400)</h2>

        {/* button add photo */}
        <div className="flex flex-row justify-end items-center">
          <Link
            to={`/dashboard/hotel/detail/${idHotel}/add-gallery`}
            className="flex flex-row justify-start items-center gap-1 group"
          >
            <MdAddPhotoAlternate className="text-3xl text-gray-400 group-hover:text-gray-600 transition-all duration-200 ease-in-out" />
            <p className="text-sm text-gray-400 group-hover:text-gray-600 transition-all duration-200 ease-in-out">
              add photo
            </p>
          </Link>
        </div>
      </div>

      {/* images */}
      <div className="w-full grid grid-cols-2 justify-start items-start gap-2 mt-5">
        {/* card image */}
        {galleries.slice(0, 10).map((image, index) => (
          <CardImage key={index} image={image} />
        ))}
      </div>
    </div>
  );
};

// card img
type CardImageProps = {
  image: string;
};
const CardImage: FC<CardImageProps> = ({ image }) => {
  return (
    <div className="col-span-1 h-48 bg-black rounded-2xl overflow-hidden shrink-0 relative before:content-[''] before:absolute before:inset-0 before:bg-black/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:ease-in-out">
      <img
        src={generateUrlImg({ path: "galleries", img: image })}
        alt="image"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default SectionGallery;
