import { useState, type FC } from "react";
import clsx from "clsx";
import DiscRating from "../../components/DiscRating";
import { FaLocationArrow } from "react-icons/fa6";
import ComponentPhoto from "../../fragments/hotelDetailPage/ComponentPhoto";
import { useParams } from "react-router-dom";
import SectionGallery from "../../fragments/hotelDetailPage/SectionGallery";
import { useQueries } from "@tanstack/react-query";
import { GalleryService } from "../../services/gallery.service";

// section
const sectionChoose: string[] = ["about", "gallery", "review"];

const HotelDetailPage: FC = () => {
  // get params
  const { id: idHotel } = useParams<{ id: string }>();

  // const { data: hotel, isLoading } = useQuery({
  //   queryKey: ["hotelDetailForDasboard", idHotel],
  //   queryFn: () => HotelService.readDetail(idHotel!),
  // });

  // query galleries
  const datas = useQueries({
    queries: [
      {
        queryKey: ["galleryForThumbnailHotelDetail", idHotel],
        queryFn: () => GalleryService.readByIdHotel(idHotel!),
      },
    ],
  });

  // desctruct
  const [galleries] = datas;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* photo */}
      <ComponentPhoto
        idHotel={idHotel ?? ""}
        galleries={galleries?.data?.data?.images ?? []}
        isLoading={galleries?.isLoading ?? false}
      />

      {/* content */}
      <ComponentContent
        idHotel={idHotel ?? ""}
        galleries={galleries?.data?.data?.images ?? []}
      />
    </div>
  );
};

type ComponentContentProps = {
  idHotel: string;
  galleries: string[];
};

// component content
const ComponentContent: FC<ComponentContentProps> = ({
  idHotel,
  galleries,
}) => {
  // state sction active
  const [sectionActive, setSectionActive] = useState<string>("about");

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center mt-4">
      {/* disc & rating & total review */}
      <div className="w-full flex flex-row justify-between items-center  px-4">
        {/* disc */}
        <DiscRating discount={10} rating={4.5} reviews={320} />
      </div>

      {/* title & address */}
      <div className="w-full flex flex-col justify-start items-start gap-0.5 mt-4  px-4">
        {/* title */}
        <h1 className="text-2xl font-medium">HarborHaven Hideaway</h1>

        {/* address */}
        {/* link */}
        <a
          href="https://maps.app.goo.gl/y91yfPTzh2WiaWVW7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-light text-gray-400 hover:text-primary-skyblue transition-all duration-150 ease-in-out flex flex-row justify-start items-center gap-1 group hover:underline"
        >
          Metro, Lampung
          {/* icon */}
          <FaLocationArrow className="text-base text-primary-skyblue scale-0 group-hover:scale-100 transition-all duration-200 ease-in-out origin-bottom-left" />
        </a>
      </div>

      {/* navigatin section */}
      <div
        className={clsx(
          "w-full flex flex-row justify-evenly items-center mt-2 relative",
          "before:content-[''] before:absolute before:left-0 before:right-0 before:h-px before:bottom-0 before:bg-black/20"
        )}
      >
        {sectionChoose.map((item, index) => (
          <ButtonChooseSection
            key={index}
            label={item}
            active={sectionActive === item}
            handleChoose={() => setSectionActive(item)}
          />
        ))}
      </div>

      {/* content gallery */}
      {sectionActive === "gallery" && (
        <SectionGallery idHotel={idHotel} galleries={galleries} />
      )}
    </div>
  );
};

// button choose section
type ButtonChooseSectionProps = {
  label: string;
  handleChoose: () => void;
  active: boolean;
};

const ButtonChooseSection: FC<ButtonChooseSectionProps> = ({
  active,
  handleChoose,
  label,
}) => {
  return (
    <button
      type="button"
      onClick={() => handleChoose()}
      className={clsx(
        "py-4 px-5 text-base font-medium relative capitalize transition-colors duration-200 ease-in-out hover:text-primary-skyblue",
        "before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-0 before:h-1 before:bg-primary-skyblue before:rounded-t-full before:origin-center before:scale-0 hover:before:scale-100 before:transition-all before:duration-500 before:ease-in-out ",
        active && "before:scale-100 text-primary-skyblue"
      )}
    >
      {label}
    </button>
  );
};

export default HotelDetailPage;
