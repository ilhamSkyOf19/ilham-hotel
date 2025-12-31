import { useState, type FC } from "react";
import HeaderHomePage from "../../fragments/homePage/HeaderHomePage";
import { useForm } from "react-hook-form";
import ModalComponent from "../../components/ModalComponent";
import TitleSeAll from "../../components/TitleSeeAll";
import CardLarge from "../../components/CardLarge";
import kamar1 from "../../assets/thumb/kamar-3.jpg";
import kamar2 from "../../assets/thumb/kamar-2.jpg";
import ModalFilter from "../../fragments/homePage/ModalFilter";
import CardMedium from "../../components/CardMedium";
import SearchHotel from "../../components/SearchHotel";

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
      {/* <ModalComponent active={active} handleClose={handleClose}>
        <ModalFilter
          handleClose={handleClose}
          handleSetRangePrice={handleSetRangePrice}
          handleSubmit={handleSubmit}
          setFacility={setFacility}
          setAccommodation={setAccommodation}
        />
      </ModalComponent> */}
    </div>
  );
};

export default HomePage;
