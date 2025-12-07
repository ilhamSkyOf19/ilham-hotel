import { useEffect, useState, type FC } from "react";
import HeaderHomePage from "../../fragments/HeaderHomePage";
import { FiSearch } from "react-icons/fi";
import { useForm, type UseFormRegister } from "react-hook-form";
import InputRaw from "../../components/InputRaw";
import { PiSlidersHorizontal } from "react-icons/pi";
import ModalComponent from "../../components/ModalComponent";
import { IoClose } from "react-icons/io5";
import InputRangePrice from "../../components/InputRangePrice";
import InputCheckbox from "../../components/InputCheckbox";
import ToggleSwitch from "../../components/ToggleSwitch";
import clsx from "clsx";
import TitleSeAll from "../../components/TitleSeeAll";
import CardLarge from "../../components/CardLarge";
import kamar1 from "../../assets/thumb/kamar-3.jpg";
import kamar2 from "../../assets/thumb/kamar-2.jpg";

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

      {/* modal filter*/}
      <ModalComponent active={active} handleClose={handleClose}>
        <div className="w-full h-screen flex flex-col justify-start item-start">
          <div className="w-full flex flex-col justify-center items-center relative">
            {/* title */}
            <h2 className="font-semibold text-base text-center">
              Filter Hotel
            </h2>

            {/* button close */}
            <button
              type="button"
              className="absolute right-0"
              onClick={handleClose}
            >
              <IoClose className="text-3xl text-slate-500" />
            </button>
          </div>

          {/* range price */}
          <InputRangePrice handleSetRangePrice={handleSetRangePrice} />

          {/* facility */}
          <Facility handleSetFacility={setFacility} />

          {/* type of accommodation */}
          <TypeOfAccommodation handleSetAccommodation={setAccommodation} />

          {/* button apply */}
          <div className="w-full pb-8 mt-4">
            <button
              type="button"
              className="w-full flex flex-1 justify-center items-center bg-primary-skyblue font-bold  rounded-full text-white py-3"
              onClick={() => {
                handleSubmit();
              }}
            >
              Apply
            </button>
          </div>
        </div>
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

// facility
type FacilityProps = {
  handleSetFacility: (id: number[]) => void;
};
const Facility: FC<FacilityProps> = ({ handleSetFacility }) => {
  // state facility
  const [ChooseFacility, setFacility] = useState<number[]>([]);
  // handle set facility
  const handleChooseFacility = (id: number) => {
    // cek
    if (ChooseFacility.includes(id)) {
      setFacility((prev) => prev.filter((item) => item !== id));
      return;
    } else {
      setFacility((prev) => [...prev, id]);
    }
  };

  // set choose
  useEffect(() => {
    // set after 1.5 second
    const timer = setTimeout(() => {
      handleSetFacility(ChooseFacility);
    }, 1000);

    return () => clearTimeout(timer);
  }, [ChooseFacility]);

  return (
    <div className="w-full flex flex-col justify-start items-start mt-6 gap-4 border-b-2 border-black/30 pb-8">
      <p className="text-base text-black/60">Facility</p>
      {/* checkbox */}
      <div className="grid grid-cols-2 gap-4 justify-between w-full">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="col-span-1">
            <InputCheckbox
              handleCheckbox={() => handleChooseFacility(id)}
              label={`Facility ${id}`}
              checked={ChooseFacility.includes(id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// type of  acco
type TypeOfAccommodationProps = {
  handleSetAccommodation: (id: string[]) => void;
};
const TypeOfAccommodation: FC<TypeOfAccommodationProps> = ({
  handleSetAccommodation,
}) => {
  // data
  const data: { id: string; label: string }[] = [
    { id: "1", label: "Hotel" },
    { id: "2", label: "Villa" },
    { id: "3", label: "Apartment" },
    { id: "4", label: "Resort" },
  ];

  // state check
  const [isChecked, setIsChecked] = useState<string[]>([]);

  // handle check
  const handleCheck = (id: string) => {
    // cek
    if (isChecked.includes(id)) {
      setIsChecked((prev) => prev.filter((item) => item !== id));
      return;
    } else {
      setIsChecked((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    // set after 1.5 second
    const timer = setTimeout(() => {
      handleSetAccommodation(isChecked);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isChecked]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 mt-6 ">
      {/* title */}
      <p className="text-base text-black/60">Type of accommodation</p>

      {/* listing */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {/* list */}
        {data.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "w-full flex flex-row justify-between items-center py-4 ",
              index !== data.length - 1 && "border-b-2 border-black/30"
            )}
          >
            {/* label */}
            <p className="text-lg text-black font-medium">{item.label}</p>

            {/* checkbox */}
            <ToggleSwitch
              id={item.id}
              handleCheck={handleCheck}
              active={isChecked.includes(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
