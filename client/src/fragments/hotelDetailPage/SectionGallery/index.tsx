import { useState, type FC } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { Link } from "react-router-dom";
import { generateUrlImg } from "../../../utils/util";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// Props
type Props = {
  idHotel: string;
  galleries: string[];
};

const SectionGallery: FC<Props> = ({ idHotel, galleries }) => {
  // state display data
  const [displayImages, setDisplayImages] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: 10,
  });

  // handle prev
  const handlePrev = () => {
    setDisplayImages((prev) => ({
      start: prev.start - 10,
      end: prev.end - 10,
    }));
  };

  // handle next
  const handleNext = () => {
    setDisplayImages((prev) => ({
      start: prev.start + 10,
      end: prev.end + 10,
    }));
  };

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
            .slice(displayImages.start, displayImages.end)
            .map((image, index) => <CardImage key={index} image={image} />)
        ) : (
          <div className="col-span-2 flex flex-row justify-center items-center">
            <p className="text-sm text-center">Tidak ada gambar</p>
          </div>
        )}
      </div>
      {/* button prev & next */}
      <div className="w-full flex flex-row justify-between items-center mt-8">
        {/* prev */}
        <div className="w-full flex flex-row justify-start items-center">
          {displayImages.start > 0 && (
            <button
              onClick={() => handlePrev()}
              type="button"
              className="flex flex-row justify-start items-center py-1.5 px-2 border-2 border-gray-300 gap-2 rounded-lg hover:bg-black/5"
            >
              {/* icon */}
              <GoArrowLeft className="text-2xl text-black" />

              {/* label */}
              <p className="text-sm capitalize font-medium">previous</p>
            </button>
          )}
        </div>

        {/* next */}
        <div className="w-full flex flex-row justify-end items-center">
          {galleries.length >= displayImages.end && (
            <button
              type="button"
              onClick={() => handleNext()}
              className="flex flex-row justify-start items-center py-1.5 px-3 border-2 border-transparent gap-2 rounded-lg bg-primary-green overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 hover:before:opacity-100 before:box-border"
            >
              {/* label */}
              <p className="text-sm capitalize text-white">next</p>

              {/* icon */}
              <GoArrowRight className="text-2xl text-white font-medium" />
            </button>
          )}
        </div>
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
