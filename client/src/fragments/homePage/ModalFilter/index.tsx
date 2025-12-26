import { useEffect, useMemo, useState, type FC } from "react";
import { IoClose } from "react-icons/io5";
import InputRangePrice from "../../../components/InputRangePrice";
import InputCheckbox from "../../../components/InputCheckbox";
import ToggleSwitch from "../../../components/ToggleSwitch";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { FasilitasService } from "../../../services/fasilitas.service";
import loadingBlue from "../../../assets/animation/loading-blue.svg";

type Props = {
  handleClose: () => void;
  handleSetRangePrice: (value: number[]) => void;
  handleSubmit: () => void;
  setFacility: (value: string[]) => void;
  setAccommodation: (value: string[]) => void;
  filter: { fasilitas?: string; minPrice?: string; maxPrice?: string };
};
const ModalFilter: FC<Props> = ({
  handleClose,
  handleSetRangePrice,
  handleSubmit,
  setFacility,
  setAccommodation,
  filter,
}) => {
  // fasilitas active
  const fasilitasActive = useMemo(() => {
    return filter.fasilitas
      ? filter.fasilitas.split(",").map((id) => id.trim())
      : [];
  }, [filter.fasilitas]);

  return (
    <div className="w-full h-screen flex flex-col justify-start item-start">
      <div className="w-full flex flex-col justify-center items-center relative">
        {/* title */}
        <h2 className="font-semibold text-base text-center">Filter Hotel</h2>

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
      <InputRangePrice
        handleSetRangePrice={handleSetRangePrice}
        minPrice={Number(filter.minPrice ?? 0)}
        maxPrice={Number(filter.maxPrice ?? 0)}
      />

      {/* facility */}
      <Facility
        handleSetFacility={setFacility}
        fasilitasActive={fasilitasActive}
      />

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
  );
};

// facility
type FacilityProps = {
  handleSetFacility: (id: string[]) => void;
  fasilitasActive?: string[];
};
const Facility: FC<FacilityProps> = ({
  handleSetFacility,
  fasilitasActive,
}) => {
  // get data from serice
  const { data: fasilitas, isLoading } = useQuery({
    queryKey: ["fasilitasModal"],
    queryFn: () => FasilitasService.readAll(),
  });

  // state facility
  const [ChooseFacility, setFacility] = useState<string[]>([]);
  // handle set facility
  const handleChooseFacility = (id: string) => {
    // cek
    if (ChooseFacility.includes(id)) {
      setFacility((prev) => prev.filter((item) => item !== id));
      return;
    } else {
      setFacility((prev) => [...prev, id]);
    }
  };

  // set choose fasilitas
  useEffect(() => {
    if (fasilitasActive) {
      setFacility(fasilitasActive);
    }
  }, [fasilitasActive]);

  // set choose
  useEffect(() => {
    // set after 1.5 second
    const timer = setTimeout(() => {
      handleSetFacility(ChooseFacility);
    }, 1000);

    return () => clearTimeout(timer);
  }, [ChooseFacility]);

  return (
    <div className="w-full flex flex-col justify-start items-start mt-6 gap-4 border-b border-black/20 pb-8">
      <p className="text-base text-black/60">Facility</p>
      {/* checkbox */}
      {isLoading ? (
        <div className="w-full h-32 flex flex-col justify-center items-center">
          <img src={loadingBlue} alt="loading" className="w-9" />
        </div>
      ) : (
        fasilitas &&
        fasilitas?.data &&
        (fasilitas.data.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 justify-between w-full">
            {fasilitas.data.map((item, _) => (
              <div key={item._id} className="col-span-1">
                <InputCheckbox
                  handleCheckbox={() => handleChooseFacility(item._id)}
                  label={item.fasilitas}
                  checked={ChooseFacility.includes(item._id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-12 flex flex-col justify-center items-center">
            <p className="text-sm">Fasilitas tidak tersedia</p>
          </div>
        ))
      )}
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
              index !== data.length - 1 && "border-b border-black/20"
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

export default ModalFilter;
