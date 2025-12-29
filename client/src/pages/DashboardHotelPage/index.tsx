import { useEffect, useState, type FC } from "react";
import HeaderDashboardData from "../../components/HeaderDashboardData";
import { useForm } from "react-hook-form";
import ModalComponent from "../../components/ModalComponent";
import ModalFilter from "../../fragments/homePage/ModalFilter";
import SearchHotel from "../../components/SearchHotel";
import { useQuery } from "@tanstack/react-query";
import { HotelService } from "../../services/hotel.service";
import CardMedium from "../../components/CardMedium";
import loadingIcon from "../../assets/animation/loading-blue.svg";
import { Helmet } from "react-helmet-async";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DashboardHotelPage: FC = () => {
  // navigate
  const navigate = useNavigate();

  // state filter
  const [filter, setFilter] = useState<{
    fasilitas?: string;
    minPrice?: string;
    maxPrice?: string;
  }>({});

  // search
  const [search, setSearch] = useState<string>("");

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
  const handleSubmit = () => {
    // set timer 1.5 second

    setFilter({
      fasilitas: facility.join(","),
      minPrice: String(rangePrice[0]),
      maxPrice: String(rangePrice[1]),
    });

    // modal close
    handleClose();
  };

  // use query
  const { data: hotel, isLoading } = useQuery({
    queryKey: [
      "dashboardHotel",
      filter.fasilitas,
      filter.maxPrice,
      filter.minPrice,
      search,
    ],
    queryFn: () =>
      HotelService.readByFilter({
        fasilitas: filter.fasilitas,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        search,
      }),
  });

  return (
    <>
      {/* helmet */}
      <Helmet>
        <title>Dashboard | Hotel</title>
      </Helmet>

      <div className="w-full h-screen flex flex-col justify-start items-center mt-8 relative">
        {/* title */}
        <HeaderDashboardData label="hotels" />

        {/* search component */}
        <SearchHotel
          register={register}
          handleOpenModal={setActive}
          errors={errors?.search?.message}
        />

        {/* container card small hotel */}
        <div className="w-full flex flex-col justify-start items-start gap-4 mt-8 px-4 pb-32">
          {isLoading ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img src={loadingIcon} alt="laoding" className="w-12" />
            </div>
          ) : hotel && hotel.data && hotel.data.length > 0 ? (
            hotel.data.map((item, _) => (
              <CardMedium
                key={item._id}
                discount={0}
                location={`${item.city}, ${item.country}`}
                price={item.price}
                rating={item.rating}
                thumbnail={item.thumbnail}
                title={item.name}
                linkDetail={`/dashboard/hotel/detail/${item._id}`}
              />
            ))
          ) : (
            <div className="w-full h-[40vh] flex flex-col justify-center items-center">
              <p className="text-center">
                <span className="text-primary-skyblue font-medium">Hotel</span>{" "}
                tidak tersedia
              </p>
            </div>
          )}
        </div>

        {/* pagination number */}
        {/* <PaginationNumber /> */}

        {/* modal filter*/}
        <ModalComponent active={active} handleClose={handleClose}>
          <ModalFilter
            filter={filter}
            handleClose={handleClose}
            handleSetRangePrice={handleSetRangePrice}
            handleSubmit={handleSubmit}
            setFacility={setFacility}
            setAccommodation={setAccommodation}
          />
        </ModalComponent>

        {/* button add */}
        <button
          type="button"
          onClick={() =>
            navigate("/dashboard/hotel/add", {
              state: { from: "/dashboard/hotel" },
            })
          }
          className="fixed z-30 bottom-24 overflow-hidden right-4 w-12 h-12 rounded-full bg-primary-green flex flex-row justify-center items-center before:content-[''] before:inset-0 before:bg-black/20 before:absolute before:opacity-0 before:transition-opacity before:duration-200 before:ease-in-out hover:before:opacity-100"
        >
          <MdAdd className="text-3xl text-white" />
        </button>
      </div>
    </>
  );
};

export default DashboardHotelPage;
