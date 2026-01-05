import { useEffect, useRef, useState, type FC } from "react";
import clsx from "clsx";
import ComponentPhoto from "../../fragments/hotelDetailPage/ComponentPhoto";
import { useLocation, useParams } from "react-router-dom";
import SectionGallery from "../../fragments/hotelDetailPage/SectionGallery";
import { useQueries } from "@tanstack/react-query";
import { GalleryService } from "../../services/gallery.service";
import SectionAbout from "../../fragments/hotelDetailPage/SectionAbout";
import { HotelService } from "../../services/hotel.service";
import type { HotelResponseType } from "../../models/hotel-model";
import SectionReview from "../../fragments/hotelDetailPage/SectionReview";
import HeaderComponent from "../../fragments/hotelDetailPage/HeaderComponent";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import NavbarPayment from "../../fragments/hotelDetailPage/NavbarPayment";
import ButtonAction from "../../components/ButtonAction";

// section
const sectionChoose: string[] = ["about", "gallery", "review"];

const HotelDetailPage: FC = () => {
  // get user from redux
  const dataUser = useSelector((state: RootState) => state.user);
  // booking data
  const bookingData = useSelector((state: RootState) => state.booking);

  // state modal warning
  const [isModalWarning, setIsModalWarning] = useState<boolean>(false);

  // state modal booking
  const [isModalBookingOpen, setIsModalBookingOpen] = useState<boolean>(false);

  // ref modal booking
  const refModalBooking = useRef<HTMLDivElement>(null);

  // ref modal warning
  const refModalWarning = useRef<HTMLDivElement>(null);

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

    // set modal warning from out side
    const handleOutSideModalWarning = (e: MouseEvent) => {
      // cek target
      const target = e.target;

      if (
        refModalWarning.current &&
        !refModalWarning.current.contains(target as Node)
      ) {
        setIsModalWarning(false);
      }
    };

    // add event listener
    document.addEventListener("mousedown", handleOutSideModalBooking);
    document.addEventListener("mousedown", handleOutSideModalWarning);
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
    if (isModalBookingOpen || isModalWarning) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalBookingOpen, isModalWarning]);

  // handle button booking
  const handleButtonBooking = () => {
    // set modal warning
    if (idHotel !== bookingData.idHotel && bookingData.idHotel !== "") {
      setIsModalWarning(true);
    } else {
      setIsModalBookingOpen(true);
    }
  };

  // debug
  // useEffect(() => {
  //   console.log(bookingPending.data);
  // }, [bookingPending]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      {/* overlay */}
      <div
        className={clsx(
          "inset-0 fixed bg-black/50 z-40 transition-opacity duration-300 ease-in-out",
          isModalBookingOpen || isModalWarning
            ? "opacity-100"
            : "pointer-events-none opacity-0"
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
        isLoading={hotel.isLoading}
        isLoadingGalleries={galleries.isLoading}
      />

      {/* navbar payment */}
      {dataUser.role !== "admin" ? (
        <NavbarPayment
          refModalBooking={refModalBooking}
          isModalBookingOpen={isModalBookingOpen}
          handleButtonBooking={handleButtonBooking}
          handleModalBookingClose={() => setIsModalBookingOpen(false)}
          isModalWarning={isModalWarning}
          nameHotel={hotel?.data?.data?.name ?? ""}
          cityHotel={hotel?.data?.data?.location.city ?? ""}
          countryHotel={hotel?.data?.data?.location.country ?? ""}
          idHotel={idHotel ?? ""}
          discountHotel={hotel?.data?.data?.discount ?? 0}
          linkMapsHotel={hotel?.data?.data?.linkMaps ?? ""}
          priceHotel={hotel?.data?.data?.price ?? 0}
        />
      ) : (
        <div className="w-screen fixed bottom-0 h-18 bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-40 rounded-t-3xl py-2 flex flex-row justify-start items-center gap-2 transition-all duration-300 ease-in-out px-4">
          <ButtonAction
            label="Update Hotel"
            blue={true}
            link={`/dashboard/hotel/detail/${idHotel}/update`}
            linkFrom={`/dashboard/hotel/detail/${idHotel}`}
          />
        </div>
      )}

      {/* modal warning */}
      <div
        ref={refModalWarning}
        className={clsx(
          "w-full fixed h-[45vh] bottom-0 bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl flex flex-col justify-start items-center pt-8 px-6 transition-all duration-300 ease-in-out gap-8",
          isModalWarning
            ? "max-h-[45vh] translate-y-0"
            : "max-h-0 translate-y-full "
        )}
      >
        <h2 className="text-xl font-semibold text-black text-center">
          Anda memiliki pemesanan hotel yang sedang aktif
        </h2>
        <p className="text-base font-light text-black text-center">
          Apakah Anda ingin melanjutkan pemesanan di hotel ini dan membatalkan
          pemesanan sebelumnya?
        </p>

        {/* button action */}
        <div className="w-full flex flex-row justify-between items-center">
          {/* button batal */}
          <button
            onClick={() => setIsModalWarning(false)}
            type="button"
            className="py-4 px-10 border border-primary-skyblue rounded-full font-medium text-primary-skyblue relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100"
          >
            Batal
          </button>

          {/* button lanjutkan */}
          <button
            onClick={() => {
              setIsModalBookingOpen(true), setIsModalWarning(false);
            }}
            type="button"
            className="py-4 px-10 border border-primary-skyblue rounded-full bg-primary-skyblue text-white font-medium relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

// Content
type ComponentContentProps = {
  idHotel: string;
  galleries: string[];
  hotel?: HotelResponseType;
  loading: boolean;
  isLoading: boolean;
  isLoadingGalleries: boolean;
};

// component content
const ComponentContent: FC<ComponentContentProps> = ({
  idHotel,
  galleries,
  hotel,
  loading,
  isLoading,
  isLoadingGalleries,
}) => {
  // state sction active
  const [sectionActive, setSectionActive] = useState<string>("about");

  return (
    <div className="w-full flex flex-col justify-start items-center mt-4">
      {/* disc & rating & total review */}

      {isLoading ? (
        <div className="w-full flex flex-col justify-start items-start px-4 animate-pulse">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="w-22 h-7 bg-gray-200 rounded-lg" />
            <div className="w-28 h-7 bg-gray-200 rounded-lg" />
          </div>

          <div className="w-[70vw] h-9 bg-gray-200 rounded-lg mt-8" />
          <div className="w-[35vw] h-5 bg-gray-200 rounded-lg mt-2" />
        </div>
      ) : (
        <HeaderComponent
          nameHotel={hotel?.name ?? ""}
          linkMaps={hotel?.linkMaps ?? ""}
          city={hotel?.location.city ?? ""}
          country={hotel?.location.country ?? ""}
          discount={hotel?.discount ?? 0}
          rating={hotel?.rating ?? 0}
          totalReviews={hotel?.totalReviews ?? 0}
        />
      )}

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

      {/* content about */}
      {sectionActive === "about" && (
        <SectionAbout
          fasilitas={hotel?.fasilitas.map((item) => item.fasilitas) ?? []}
          description={hotel?.description ?? ""}
          loading={loading}
        />
      )}

      {/* content gallery */}
      {sectionActive === "gallery" && (
        <SectionGallery
          idHotel={idHotel}
          galleries={galleries}
          isLoading={isLoadingGalleries}
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
