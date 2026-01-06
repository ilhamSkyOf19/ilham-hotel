import { useEffect, useRef, useState, type FC, type RefObject } from "react";
import LabelInput from "../LabelInput";
import clsx from "clsx";
import { IoIosArrowDown } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import loadingSkyBlue from "../../assets/animation/loading-blue.svg";
import { LocationService } from "../../services/location.service";
import type { UseFormSetValue } from "react-hook-form";
import type {
  HotelCreateServiceRequestType,
  HotelUpdateServiceRequestType,
} from "../../models/hotel-model";

type Props = {
  errorMessage?: string;
  setValue: UseFormSetValue<
    HotelCreateServiceRequestType | HotelUpdateServiceRequestType
  >;
  defaultValue: string;
};
const BoxInputAbstrakChoose: FC<Props> = ({
  errorMessage,
  setValue,
  defaultValue,
}) => {
  // state active modal choose
  const [activeModal, setActiveModal] = useState<boolean>(false);

  // state choose
  const [isChooseLocation, setIsChooseLocation] = useState<string>("");

  // set default value
  useEffect(() => {
    if (defaultValue) {
      setIsChooseLocation(defaultValue);
    }
  }, [defaultValue]);

  // handle active modal choose
  const handleActiveModal = () => {
    setActiveModal((prev) => !prev);
  };

  // handle close outside modal
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonModalRef = useRef<HTMLButtonElement>(null);

  // handle close outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonModalRef.current &&
        !buttonModalRef.current.contains(event.target as Node)
      ) {
        setActiveModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle choose
  const handleChooseLocation = (id: string, location: string) => {
    setValue("location", id);

    setIsChooseLocation(location);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <div className="w-full flex flex-col justify-start items-start gap-3 relative">
        <div className="w-full flex flex-row justify-start items-center gap-2">
          {/* label */}
          <LabelInput label="Choose Location" htmlFor="choose" required />

          {/* error */}
          <p className="w-full text-left text-xs h-full text-red-500">
            {errorMessage}
          </p>
        </div>

        {/* box input */}
        <div
          className={clsx(
            "w-full flex flex-row justify-start items-center bg-gray-300/50 rounded-bl-full rounded-tr-full transition-all ease-in-out duration-100 pr-3",
            errorMessage
              ? "shadow-[0px_2px_7px_0px_rgba(255,0,0,0.9)]"
              : "focus-within:shadow-[0px_2px_7px_0px_rgba(66,133,244,0.9)] shadow-[0px_2px_7px_0px_rgba(0,0,0,0.2)]"
          )}
        >
          {/* input */}
          <input
            readOnly
            type="text"
            disabled
            onClick={() => console.log("ok")}
            defaultValue={isChooseLocation}
            placeholder={"Choose Room Type"}
            className="py-3 px-10 w-full bg-transparent border-none outline-none text-black text-base font-medium placeholder:text-gray-400 placeholder:text-base placeholder:font-normal capitalize"
          />

          {/* icon */}
          <button
            ref={buttonModalRef}
            className="h-full px-1"
            type="button"
            onClick={handleActiveModal}
          >
            <IoIosArrowDown className="text-3xl text-primary-skyblue" />
          </button>

          {/* modal choose */}
          <ModalChoose
            modalRef={modalRef as RefObject<HTMLDivElement>}
            handleActiveModal={handleActiveModal}
            activeModal={activeModal}
            handleChooseLocation={handleChooseLocation}
          />
        </div>
      </div>
      {/* choose preview */}
      {/* <div className="w-full flex flex-row justify-start items-start gap-3 mt-2 flex-wrap">
        {chooseRoomType.map((item, _index) => (
          <PreviewChoose
            key={_index}
            label={item.label}
            id={item.id}
            handleRemoveChooseRoomType={handleRemoveChooseRoomType}
          />
        ))}
      </div> */}
    </div>
  );
};

// modal choose
type PropsModalchoose = {
  handleActiveModal: () => void;
  activeModal: boolean;
  handleChooseLocation: (id: string, location: string) => void;
  modalRef: RefObject<HTMLDivElement>;
};
const ModalChoose: FC<PropsModalchoose> = ({
  handleActiveModal,
  activeModal,
  handleChooseLocation,
  modalRef,
}) => {
  // query room type
  const { data, isLoading } = useQuery({
    queryKey: ["roomType"],
    queryFn: LocationService.readAll,
  });

  return (
    <div
      ref={modalRef}
      className={clsx(
        "w-full h-[50vw] rounded-xl absolute top-[110%] flex flex-col justify-start items-start bg-white transition-all duration-200 ease-in-out z-50 overflow-hidden shadow-[0px_0px_7px_0px_rgba(0,0,0,0.2)] overflow-y-scroll",
        activeModal ? "max-h-[50vw]" : "max-h-0"
      )}
    >
      {/* content */}
      {isLoading ? (
        <div className="w-full h-full flex flex-row justify-center items-center">
          <img src={loadingSkyBlue} alt="loading" className="w-8" />
        </div>
      ) : data?.data && data?.data.length > 0 ? (
        data?.data.map((item, _index) => (
          <ButtonChooseLocation
            key={item._id}
            id={item._id}
            label={`${item.city}, ${item.country}`}
            handleActiveModal={handleActiveModal}
            handleChooseLocation={handleChooseLocation}
          />
        ))
      ) : (
        <p>Room Type Not Found</p>
      )}
    </div>
  );
};

// button choose room type
type ButtonChooseRoomTypeProps = {
  label: string;
  id: string;
  handleChooseLocation: (label: string, id: string) => void;
  handleActiveModal: () => void;
};
const ButtonChooseLocation: FC<ButtonChooseRoomTypeProps> = ({
  label,
  id,
  handleChooseLocation,
  handleActiveModal,
}) => {
  return (
    <button
      type="button"
      className="w-full py-4 px-4 hover:bg-gray-200"
      onClick={() => {
        handleChooseLocation(id, label), handleActiveModal();
      }}
    >
      <p className="text-black text-base font-medium text-left capitalize">
        {label}
      </p>
    </button>
  );
};

export default BoxInputAbstrakChoose;
