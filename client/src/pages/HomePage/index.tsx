import { useState, type FC } from "react";
import HeaderHomePage from "../../fragments/homePage/HeaderHomePage";
import { FiSearch } from "react-icons/fi";
import { useForm, type UseFormRegister } from "react-hook-form";
import InputRaw from "../../components/InputRaw";
import { PiSlidersHorizontal } from "react-icons/pi";
import ModalComponent from "../../components/ModalComponent";
import TitleSeAll from "../../components/TitleSeeAll";
import CardLarge from "../../components/CardLarge";
import kamar1 from "../../assets/thumb/kamar-3.jpg";
import kamar2 from "../../assets/thumb/kamar-2.jpg";
import ModalFilter from "../../fragments/homePage/ModalFilter";
import CardMedium from "../../components/CardMedium";

const location: string[] = [
  "New York, USA",
  "London, UK",
  "Tokyo, Japan",
  "Paris, France",
  "Sydney, Australia",
  "Beijing, China",
];

const HomePage: FC = () => {
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

  // state choose
  const [chooseLocation, setChooseLocation] = useState<string>("New York, USA");

  // handle choose
  const handleChooseLocation = (location: string) =>
    setChooseLocation(location);

  // handle set range
  const handleSetRangePrice = (value: number[]) => {
    setRangePrice(value);
  };

  // use form
  const { register } = useForm<{ search: string }>();

  // handle submit
  const handleSubmit = () => {
    // set timer 1.5 second
    const timer = setTimeout(() => {
      console.log(rangePrice, accommodation, facility);

      // close modal
      handleClose();
    }, 1300);

    return () => clearTimeout(timer);
  };

  return (
    <div className="w-screen h-[200vh] flex flex-col justify-start items-center pt-8">
      {/* header */}
      <HeaderHomePage
        locationList={location}
        chooseLocation={chooseLocation}
        handleChooseLocation={handleChooseLocation}
      />

      {/* search hotel */}
      <SearchHotel register={register} handleOpenModal={setActive} />

      {/* title recommended hotel */}
      <div className="w-[90vw] mt-4">
        <TitleSeAll label="Recommended Hotel" link="#" />
      </div>

      {/* container card large hotel */}
      <div className="w-full flex flex-row justify-start items-start overflow-x-scroll py-6 px-5 gap-4 scrollbar-hidden">
        {/* card large */}
        <CardLarge
          thumbnail={kamar1}
          title="OasisOverture"
          location="New York, USA"
          price={630}
          discount={20}
          rating={4.8}
          link="/"
        />
        <CardLarge
          thumbnail={kamar2}
          title="OasisOverture"
          location="New York, USA"
          price={630}
          discount={20}
          rating={4.8}
          link="/"
        />
      </div>

      {/* title Nearby Hotel */}
      <div className="w-[90vw] mt-2">
        <TitleSeAll label="Nearby Hotel" link="#" />
      </div>

      {/* card hotel small */}
      <div className="w-[90vw] flex flex-col justify-start items-center mt-4 gap-4">
        <CardMedium
          thumbnail={kamar2}
          discount={20}
          rating={4.8}
          title="OasisOverture"
          location="New York, USA"
          price={630}
        />
        <CardMedium
          thumbnail={kamar1}
          discount={20}
          rating={4.8}
          title="OasisOverture"
          location="New York, USA"
          price={630}
        />
      </div>

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

// search hotel
type SearchHotelProps = {
  register: UseFormRegister<{ search: string }>;
  handleOpenModal: (active: boolean) => void;
};
const SearchHotel: FC<SearchHotelProps> = ({ register, handleOpenModal }) => {
  return (
    <div className="w-[90vw] flex flex-row justify-between items-start gap-3 mt-6">
      {/* search */}
      <div className="flex-4 flex flex-row justify-start items-center  bg-primary-gray/20 rounded-xl px-5 py-2">
        {/* icon search  */}
        <FiSearch className="text-3xl text-primary-skyblue" />

        {/* input */}
        <InputRaw
          type="text"
          name="search"
          placeholder="Search hotel..."
          register={register("search")}
        />
      </div>

      {/* filter */}
      <button
        type="button"
        onClick={() => handleOpenModal(true)}
        className="flex-1 h-full bg-primary-skyblue flex flex-row justify-center items-center rounded-xl"
      >
        <PiSlidersHorizontal className="text-3xl text-white" />
      </button>
    </div>
  );
};

export default HomePage;
