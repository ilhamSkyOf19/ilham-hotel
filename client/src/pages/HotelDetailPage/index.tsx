import { useState, type FC } from "react";
import clsx from "clsx";
import DiscRating from "../../components/DiscRating";
import { FaLocationArrow } from "react-icons/fa6";
import ComponentPhoto from "../../fragments/hotelDetailPage/ComponentPhoto";
import { useLocation, useParams } from "react-router-dom";
import SectionGallery from "../../fragments/hotelDetailPage/SectionGallery";
import { useQueries } from "@tanstack/react-query";
import { GalleryService } from "../../services/gallery.service";
import SectionAbout from "../../fragments/hotelDetailPage/SectionAbout";
import { HotelService } from "../../services/hotel.service";
import type { HotelResponseType } from "../../models/hotel-model";
import SectionReview from "../../fragments/hotelDetailPage/SectionReview";
import { formatCurrency } from "../../utils/util";

// section
const sectionChoose: string[] = ["about", "gallery", "review"];

const HotelDetailPage: FC = () => {
  // location
  const location = useLocation();

  // get state from location
  const locationState = location.state?.from;

  // get params
  const { id: idHotel } = useParams<{ id: string }>();

  // query galleries
  const datas = useQueries({
    queries: [
      // galleris
      {
        queryKey: ["galleryForThumbnailHotelDetail", idHotel],
        queryFn: () => GalleryService.readByIdHotel(idHotel!),
      },

      // hotel
      {
        queryKey: ["hotelDetailForDasboard", idHotel],
        queryFn: () => HotelService.readDetail(idHotel!),
      },
    ],
  });

  // desctruct
  const [galleries, hotel] = datas;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      {/* photo */}
      <ComponentPhoto
        idHotel={idHotel ?? ""}
        galleries={galleries?.data?.data?.images ?? []}
        isLoading={galleries?.isLoading ?? false}
        locationState={locationState}
      />

      {/* content */}
      <ComponentContent
        idHotel={idHotel ?? ""}
        galleries={galleries?.data?.data?.images ?? []}
        hotel={hotel.data?.data ?? undefined}
        loading={hotel.isLoading}
      />

      {/* navbar payment */}
      <div className="w-screen fixed bottom-0 h-18 bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl px-6 py-2 flex flex-row justify-start items-center gap-2 ">
        {/* total price */}
        <div className="flex-1 flex flex-col justify-start items-item-center">
          <h4 className="text-base text-black capitalize">total price</h4>

          {/* price */}
          <h4 className="text-lg text-black font-medium">
            {formatCurrency(323)}{" "}
            <span className="text-xs ml-0.5 text-gray-600 font-medium">
              /night
            </span>
          </h4>
        </div>

        {/* button */}
        <div className="flex-2 h-full flex flex-row justify-end items-center ">
          <button
            type="button"
            className="h-full px-10 text-lg capitalize font-medium text-white bg-primary-skyblue rounded-full relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/20 before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100"
          >
            book now
          </button>
        </div>
      </div>
    </div>
  );
};

type ComponentContentProps = {
  idHotel: string;
  galleries: string[];
  hotel?: HotelResponseType;
  loading: boolean;
};

// component content
const ComponentContent: FC<ComponentContentProps> = ({
  idHotel,
  galleries,
  hotel,
  loading,
}) => {
  // state sction active
  const [sectionActive, setSectionActive] = useState<string>("about");

  return (
    <div className="w-full flex flex-col justify-start items-center mt-4">
      {/* disc & rating & total review */}
      <div className="w-full flex flex-row justify-between items-center  px-4">
        {/* disc */}
        <DiscRating
          discount={hotel?.discount ?? 0}
          rating={4.5}
          reviews={320}
        />
      </div>

      {/* title & address */}
      <div className="w-full flex flex-col justify-start items-start gap-0.5 mt-4  px-4">
        {/* title */}
        <h1 className="text-2xl font-semibold">{hotel?.name ?? ""}</h1>

        {/* address */}
        <a
          href={hotel?.linkMaps ?? ""}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-light text-gray-400 hover:text-primary-skyblue transition-all duration-150 ease-in-out flex flex-row justify-start items-center gap-1 group hover:underline"
        >
          {hotel?.city ?? ""}, {hotel?.country ?? ""}
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

      {/* content about */}
      {sectionActive === "about" && (
        <SectionAbout
          fasilitas={hotel?.fasilitas.map((item) => item.fasilitas) ?? []}
          description={hotel?.description ?? ""}
          loading={loading}
        />
      )}

      {/* content review */}
      {sectionActive === "review" && <SectionReview idHotel={idHotel} />}
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
