import { type FC } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { generateUrlImg } from "../../../utils/util";
import { FaArrowRightLong } from "react-icons/fa6";
// Props
type Props = {
  idHotel: string;
  galleries: string[];
};

const SectionGallery: FC<Props> = ({ idHotel, galleries }) => {
  // navigate
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-start items-start px-4 pt-5 pb-32">
      {/* header */}
      <div className="w-full flex flex-row justify-between items-center">
        {/* title */}
        <h2 className="text-base font-medium">Gallery (400)</h2>

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
        {galleries.length > 0 ? (
          galleries
            .slice(0, 6)
            .map((image, index) => <CardImage key={index} image={image} />)
        ) : (
          <div className="col-span-2 flex flex-row justify-center items-center">
            <p className="text-sm text-center">Tidak ada gambar</p>
          </div>
        )}
      </div>
      {/* button more */}
      <div className="w-full flex flex-row justify-end items-start mt-8">
        <button
          type="button"
          onClick={() =>
            navigate(`/dashboard/hotel/detail/${idHotel}/galleries`, {
              state: { from: location.pathname },
            })
          }
          className="py-2 px-4 bg-primary-skyblue/85 transition-all duration-200 hover:bg-primary-skyblue rounded-lg flex flex-row justify-start items-center gap-2"
        >
          <p className=" text-white font-medium">More</p>

          {/* icon */}
          <FaArrowRightLong className="text-white text-lg" />
        </button>
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
        loading="lazy"
      />
    </div>
  );
};

export default SectionGallery;
