import { useEffect, useState, type FC } from "react";
import HeaderHomePage from "../../fragments/homePage/HeaderHomePage";
import { useForm } from "react-hook-form";
import ModalComponent from "../../components/ModalComponent";
import TitleSeAll from "../../components/TitleSeeAll";
import CardLarge from "../../components/CardLarge";
import ModalFilter from "../../fragments/homePage/ModalFilter";
import CardMedium from "../../components/CardMedium";
import SearchHotel from "../../components/SearchHotel";
import { useQuery } from "@tanstack/react-query";
import { HotelService } from "../../services/hotel.service";
import { generateUrlImg } from "../../utils/util";
import ModalImage from "../../components/ModalImage";
import LoadingPulseCardLarge from "../../components/LoadingPulseCardLarge";
import LoadingPulseCardMedium from "../../components/LoadingPulseCardMedium";

const HomePage: FC = () => {
  // state show img
  const [isShowImg, setIsShowImg] = useState<{ active: boolean; img: string }>({
    active: false,
    img: "",
  });

  // search
  const [search, setSearch] = useState<string>("");

  const [filter, setFilter] = useState<{
    fasilitas?: string;
    minPrice?: string;
    maxPrice?: string;
  }>({});

  // state modal
  const [active, setActive] = useState(false);

  // state facility
  const [facility, setFacility] = useState<string[]>([]);

  // state accommodation
  const [accommodation, setAccommodation] = useState<string[]>([]);

  // state range price
  const [rangePrice, setRangePrice] = useState<number[]>([0, 0]);

  // handle close modal
  const handleClose = () => setActive(false);

  // state choose
  const [chooseLocation, setChooseLocation] = useState<string>("");

  // handle choose
  const handleChooseLocation = (location: string) =>
    setChooseLocation(location);

  // handle set range
  const handleSetRangePrice = (value: number[]) => {
    setRangePrice(value);
  };

  // use form
  const {
    register,
    watch,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<{ search: string }>();

  const searchValue = watch("search");

  // handle search value
  useEffect(() => {
    // cek search if max character
    if (searchValue && searchValue.length >= 20) {
      setError("search", {
        message: "max character",
      });

      return;
    }

    // clear errors
    clearErrors("search");

    const timer = setTimeout(() => {
      setSearch(searchValue);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // handle submit
  const handleFilterSubmit = () => {
    setFilter({
      fasilitas: facility.join(","),
      minPrice: String(rangePrice[0]),
      maxPrice: String(rangePrice[1]),
    });

    handleClose();
  };

  // query hotel
  const { data: hotel, isLoading } = useQuery({
    queryKey: [
      "dashboardHotel",
      filter.fasilitas,
      filter.maxPrice,
      filter.minPrice,
      search,
      chooseLocation,
    ],
    queryFn: () =>
      HotelService.readByFilter({
        fasilitas: filter.fasilitas,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        search,
        location: chooseLocation,
      }),
  });

  // handle reset
  const handleReset = () => {
    setFilter({});
    setFacility([]);
    setAccommodation([]);
    setRangePrice([0, 0]);
    setActive(false);
  };

  return (
    <div className="w-screen flex flex-col justify-start items-center pt-8">
      {/* header */}
      <HeaderHomePage
        chooseLocation={chooseLocation}
        handleChooseLocation={handleChooseLocation}
      />

      {/* search hotel */}
      <SearchHotel
        register={register}
        handleOpenModal={setActive}
        errors={errors?.search?.message}
      />

      {/* title recommended hotel */}
      <div className="w-[90vw] mt-4">
        <TitleSeAll label="Recommended Hotel" link="#" />
      </div>

      {/* container card large hotel */}
      <div className="w-full flex flex-row justify-start items-start overflow-x-scroll py-6 px-4 gap-4 scrollbar-hidden">
        {/* card large */}
        {isLoading ? (
          Array.from({ length: 3 }, (_, i) => <LoadingPulseCardLarge key={i} />)
        ) : hotel?.data && hotel.data.length > 0 ? (
          hotel.data.slice(0, 3).map((item) => (
            <CardLarge
              key={item._id}
              thumbnail={generateUrlImg({
                path: "galleries",
                img: item.thumbnail,
              })}
              title={item.name}
              location={`${item.location.city}, ${item.location.country}`}
              price={item.price}
              discount={item.discount}
              rating={item.rating}
              link={`/hotel/detail/${item._id}`}
              handleShowImg={() =>
                setIsShowImg({ active: true, img: item.thumbnail })
              }
            />
          ))
        ) : (
          <div className="w-full h-[45vh] flex flex-col justify-center items-center">
            <h2 className="text-sm text-primary-skyblue">
              hotel tidak tersedia
            </h2>
          </div>
        )}
      </div>

      {/* title Nearby Hotel */}
      <div className="w-[90vw] mt-2">
        <TitleSeAll label="Nearby Hotel" link="#" />
      </div>

      {/* card hotel small */}
      <div className="w-full px-5 flex flex-col justify-start items-center mt-4 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }, (_, i) => (
            <LoadingPulseCardMedium key={i} />
          ))
        ) : hotel?.data && hotel.data.length > 0 ? (
          hotel.data
            .slice(0, 3)
            .map((item) => (
              <CardMedium
                key={item._id}
                thumbnail={item.thumbnail}
                title={item.name}
                location={`${item.location.city}, ${item.location.country}`}
                price={item.price}
                discount={item.discount}
                rating={item.rating}
                linkDetail={`/hotel/detail/${item._id}`}
              />
            ))
        ) : (
          <div className="w-full h-[10vh] flex flex-col justify-center items-center">
            <h2 className="text-sm text-primary-skyblue">
              hotel tidak tersedia
            </h2>
          </div>
        )}
      </div>

      {/* modal filter*/}
      <ModalComponent active={active} handleClose={handleClose}>
        <ModalFilter
          handleClose={handleClose}
          handleSetRangePrice={handleSetRangePrice}
          handleSubmit={handleFilterSubmit}
          setFacility={setFacility}
          setAccommodation={setAccommodation}
          filter={filter}
          handleReset={handleReset}
        />
      </ModalComponent>

      {/* modal show img */}
      <ModalImage
        active={isShowImg.active}
        handleClose={() => setIsShowImg({ active: false, img: "" })}
        img={isShowImg.img}
      />
    </div>
  );
};

export default HomePage;
