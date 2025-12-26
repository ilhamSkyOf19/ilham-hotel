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

const DashboardHotelPage: FC = () => {
  // state filter
  const [filter, setFilter] = useState<{
    fasilitas?: string;
    minPirce?: string;
    maxPrice?: string;
  }>({});

  // state modal
  const [active, setActive] = useState(false);

  // state facility
  const [facility, setFacility] = useState<number[]>([]);

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
  const { register } = useForm<{ search: string }>();

  // handle submit
  const handleSubmit = () => {
    // set timer 1.5 second

    setFilter({
      fasilitas: facility.join(","),
      minPirce: String(rangePrice[0]),
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
      filter.minPirce,
    ],
    queryFn: () =>
      HotelService.readByFilter({
        fasilitas: filter.fasilitas,
        minPrice: filter.minPirce,
        maxPrice: filter.maxPrice,
      }),
  });

  // debug
  useEffect(() => {
    console.log(hotel);
  }, [hotel]);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center mt-8 relative">
      {/* title */}
      <HeaderDashboardData label="hotels" />

      {/* search component */}
      <SearchHotel register={register} handleOpenModal={setActive} />

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
          <p>tidak ada data</p>
        )}
      </div>

      {/* pagination number */}
      {/* <PaginationNumber /> */}

      {/* modal filter*/}
      <ModalComponent active={active} handleClose={handleClose}>
        <ModalFilter
          handleClose={handleClose}
          handleSetRangePrice={handleSetRangePrice}
          handleSubmit={handleSubmit}
          setFacility={setFacility}
          setAccommodation={setAccommodation}
        />
      </ModalComponent>
    </div>
  );
};

export default DashboardHotelPage;
