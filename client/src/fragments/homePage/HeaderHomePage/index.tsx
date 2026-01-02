import type { FC, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { FaBell, FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import clsx from "clsx";
import InputRaw from "../../../components/InputRaw";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { LocationService } from "../../../services/location.service";

// header component
type Props = {
  handleChooseLocation: (location: string) => void;
  chooseLocation: string;
};

const HeaderHomePage: FC<Props> = ({
  handleChooseLocation,
  chooseLocation,
}) => {
  // state modal location
  const [isOpenModalLocation, setIsOpenModalLocation] =
    useState<boolean>(false);

  // handle click outside
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonModalRef = useRef<HTMLButtonElement>(null);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonModalRef.current &&
        !buttonModalRef.current.contains(event.target as Node)
      ) {
        setIsOpenModalLocation(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="w-[90vw] flex flex-row justify-between items-start relative">
      {/* location */}
      <div className="flex-2 flex flex-col justify-start items-start gap-1">
        <p className="text-slate-400 ">Location</p>

        {/* address */}
        <div className="w-full flex flex-row justify-start items-center gap-1">
          {/* icon */}
          <FaLocationDot className="text-primary-skyblue text-2xl" />
          {/* button */}
          <button
            ref={buttonModalRef}
            type="button"
            className="w-full flex flex-row justify-start items-center gap-1"
            onClick={() => setIsOpenModalLocation(!isOpenModalLocation)}
          >
            <p className="text-black font-medium text-base capitalize">
              {chooseLocation === "" ? "Choose Location" : chooseLocation}
            </p>
            <IoIosArrowDown className="text-black text-2xl" />
          </button>
        </div>
      </div>

      {/* bell */}
      <div className="flex-1 flex flex-row justify-end items-center">
        <div className="w-12 h-12 bg-primary-gray/50 rounded-full flex flex-row justify-center items-center">
          <FaBell className="text-black text-2xl" />
        </div>
      </div>

      {/* modal location */}
      <ModalLocation
        handleChooseLocation={handleChooseLocation}
        isModalActive={isOpenModalLocation}
        modalRef={modalRef as RefObject<HTMLDivElement>}
      />
    </div>
  );
};

// modal location
type ModalLocationProps = {
  handleChooseLocation: (location: string) => void;
  isModalActive: boolean;
  modalRef: RefObject<HTMLDivElement>;
};
const ModalLocation: FC<ModalLocationProps> = ({
  isModalActive: isOpenModalLocation,
  modalRef,
  handleChooseLocation,
}) => {
  // use form
  const { register } = useForm<{ search: string }>();

  // get location
  const { data: locationList, isPending } = useQuery({
    queryKey: ["locationForFilter"],
    queryFn: LocationService.readAll,
  });

  return (
    <div
      ref={modalRef}
      className={clsx(
        "absolute w-full shadow-[0px_3px_7px_0px_rgba(0,0,0,0.2)] top-[120%] transition-all duration-300 ease-in-out z-50 rounded-2xl overflow-hidden bg-white",
        isOpenModalLocation ? "max-h-70" : "max-h-0"
      )}
    >
      {/* container search */}
      <div className="w-full flex flex-row justify-start items-center px-4 py-4">
        {/* search */}
        <div className="w-full flex flex-row justify-start items-center bg-primary-gray/20 rounded-full px-5 py-2">
          {/* icon search */}
          <label htmlFor="search">
            <FiSearch className="text-black text-3xl" />
          </label>

          {/* input search */}
          <InputRaw
            type="text"
            name="search"
            placeholder="Search Location"
            register={register("search")}
          />
        </div>
      </div>
      <div className="w-full h-44 overflow-y-auto flex flex-col pb-4">
        {/* button location */}
        {isPending ? (
          <div></div>
        ) : locationList?.data && locationList.data.length > 0 ? (
          locationList.data.map((item, index) => (
            <ButtonLocation
              key={index}
              location={`${item.city}, ${item.country}`}
              handleChooseLocation={handleChooseLocation}
            />
          ))
        ) : (
          <div className="w-full flex flex-row justify-center items-center">
            <p className="text-base">Location tidak tersedia</p>
          </div>
        )}
      </div>
    </div>
  );
};

// button location
type ButtonLocationProps = {
  location: string;
  handleChooseLocation: (location: string) => void;
};
const ButtonLocation: FC<ButtonLocationProps> = ({
  location,
  handleChooseLocation,
}) => {
  return (
    <button
      type="button"
      className="w-full px-4 py-4 hover:bg-black/5 transition-all duration-200 ease-in-out"
      onClick={() => handleChooseLocation(location)}
    >
      <p className="text-black text-base font-medium text-left capitalize">
        {location}
      </p>
    </button>
  );
};

export default HeaderHomePage;
