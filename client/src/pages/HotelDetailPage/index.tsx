import { useEffect, useRef, useState, type FC } from "react";
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
import InputDateforBook from "../../components/InputDateForBook";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";

// section
const sectionChoose: string[] = ["about", "gallery", "review"];

const HotelDetailPage: FC = () => {
  // state visitor
  const [visitorCount, setVisitorCount] = useState<number>(1);

  // state modal booking
  const [isModalBookingOpen, setIsModalBookingOpen] = useState<boolean>(false);

  // ref modal booking
  const refModalBooking = useRef<HTMLDivElement>(null);

  // set active handle outside
  useEffect(() => {
    // set modal booking from out side
    const handleOutSideModalBooking = (e: MouseEvent) => {
      // cek target
      const target = e.target;

      if (
        refModalBooking.current &&
        !refModalBooking.current.contains(target as Node)
      ) {
        setIsModalBookingOpen(false);
      }
    };

    // add event listener
    document.addEventListener("mousedown", handleOutSideModalBooking);
  }, []);

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

  // event scroll
  useEffect(() => {
    if (isModalBookingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalBookingOpen]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      {/* overlay */}
      <div
        className={clsx(
          "inset-0 fixed bg-black/50 z-40 transition-opacity duration-300 ease-in-out",
          isModalBookingOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

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
      <div
        ref={refModalBooking}
        className={clsx(
          "w-screen fixed bottom-0 h-[70vh] bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl  py-2 flex flex-row justify-start items-center gap-2 transition-all duration-300 ease-in-out",
          isModalBookingOpen ? "max-h-[70vh]" : "max-h-18"
        )}
      >
        {/* total price */}
        {!isModalBookingOpen ? (
          <ButtonBooking
            handleModalActive={() => setIsModalBookingOpen(true)}
          />
        ) : (
          hotel?.data && (
            <div className="w-full h-full flex flex-col justify-start items-start pb-12 overflow-y-scroll">
              {/* button line */}
              <button
                type="button"
                onClick={() => setIsModalBookingOpen(false)}
                className="w-full flex flex-row justify-center items-center py-1.5 mb-4 group"
              >
                <div className="w-32 h-1.5 bg-gray-300 rounded-full group-hover:bg-gray-300 transition-all duration-200 ease-in-out" />
              </button>

              {/* header */}
              <div className="w-full relative pb-8 before:content-[''] before:absolute before:inset-x-4 before:bottom-0 before:h-px before:bg-black/20">
                <HeaderComponent
                  nameHotel={hotel?.data?.data?.name ?? ""}
                  linkMaps={hotel?.data?.data?.linkMaps ?? ""}
                  city={hotel?.data?.data?.city ?? ""}
                  country={hotel?.data?.data?.country ?? ""}
                  discount={hotel?.data?.data?.discount ?? 0}
                />
              </div>

              {/* content book */}
              <div className="w-full flex flex-col justify-start items-start py-4 px-4">
                {/* header */}
                <h1 className="text-base text-gray-400 uppercase">
                  book hotel
                </h1>

                {/* checkin */}
                <InputDateforBook title="Check In" />

                {/* check out */}
                <InputDateforBook title="Check Out" />

                {/* visitor */}
                <div className="w-full flex flex-col justify-start items-start gap-3 mt-4">
                  {/* title */}
                  <h2 className="text-xl text-black">Visitor</h2>

                  <div className="w-full flex flex-row justify-start items-start flex-wrap gap-3">
                    {/* card visitor */}
                    {[1, 2, 3].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setVisitorCount(item)}
                        type="button"
                        className={clsx(
                          "py-2 px-6 rounded-md text-sm capitalize hover:bg-primary-skyblue hover:text-white transition-all duration-200 ease-in-out",
                          visitorCount === item
                            ? "bg-primary-skyblue text-white"
                            : "bg-gray-200/70 text-black"
                        )}
                      >
                        {item} visitor
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* button booking */}
              <div className="w-full px-4 mt-2">
                <ButtonSubmitBox
                  label="booking"
                  type="button"
                  handleClick={() => {}}
                  handleNavigate={() => {}}
                />
              </div>
            </div>
          )
        )}
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

      <HeaderComponent
        nameHotel={hotel?.name ?? ""}
        linkMaps={hotel?.linkMaps ?? ""}
        city={hotel?.city ?? ""}
        country={hotel?.country ?? ""}
        discount={hotel?.discount ?? 0}
      />

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

// button booking
type ButtonBookinProps = {
  handleModalActive: () => void;
};
const ButtonBooking: FC<ButtonBookinProps> = ({ handleModalActive }) => {
  return (
    <div className="w-full h-full flex flex-row justify-start items-start gap-2 px-2">
      <div className="flex-1 h-full flex flex-col justify-start items-center">
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
      <div className="flex-2 h-14 flex flex-row justify-end items-center ">
        <button
          type="button"
          onClick={() => handleModalActive()}
          className="h-full px-10 text-lg capitalize font-medium text-white bg-primary-skyblue rounded-full relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/20 before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100"
        >
          book now
        </button>
      </div>
    </div>
  );
};

// header component
type HeaderComponentProps = {
  nameHotel: string;
  linkMaps: string;
  city: string;
  country: string;
  discount: number;
};
const HeaderComponent: FC<HeaderComponentProps> = ({
  nameHotel,
  linkMaps,
  city,
  country,
  discount,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="w-full flex flex-row justify-between items-center  px-4">
        {/* disc */}
        <DiscRating discount={discount} rating={4.5} reviews={320} />
      </div>

      {/* title & address */}
      <div className="w-full flex flex-col justify-start items-start gap-0.5 mt-4  px-4">
        {/* title */}
        <h1 className="text-2xl font-semibold">{nameHotel}</h1>

        {/* address */}
        <a
          href={linkMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-light text-gray-400 hover:text-primary-skyblue transition-all duration-150 ease-in-out flex flex-row justify-start items-center gap-1 group hover:underline"
        >
          {city}, {country}
          {/* icon */}
          <FaLocationArrow className="text-base text-primary-skyblue scale-0 group-hover:scale-100 transition-all duration-200 ease-in-out origin-bottom-left" />
        </a>
      </div>
    </div>
  );
};

export default HotelDetailPage;
