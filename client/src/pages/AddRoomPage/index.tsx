import { useEffect, useState, type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import BoxInputAbstrakChoose from "../../components/BoxInputAbstrakChoose";
import { Controller, useForm } from "react-hook-form";
import type {
  RoomCreateRequestType,
  RoomRequestForInput,
} from "../../models/room-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomValidation } from "../../validations/room-validation";
import LabelInput from "../../components/LabelInput";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import { HotelService } from "../../services/hotel.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import loadingBlue from "../../assets/animation/loading-blue.svg";

const AddRoomPage: FC = () => {
  // get params from url
  const { id = "693e7e57e8b45861c2674815" } = useParams();

  // state room type for room number
  const [roomTypeActive, setRoomTypeActive] = useState<{
    label: string;
    id: string;
  }>({ label: "Pilih tipe kamar", id: "0" });

  // set room number
  const [roomNumber, setRoomNumber] = useState<
    {
      id: string;
      room: number[];
    }[]
  >([]);

  // handle room active for room number
  const handleRoomTypeActive = ({
    label,
    id,
  }: {
    label: string;
    id: string;
  }) => {
    setRoomTypeActive({ label, id });
  };

  // handle set room number in room active
  const handleSetRoomNumber = (room: number) => {
    setRoomNumber((prev) => {
      const exist = prev.find((item) => item.id === roomTypeActive.id);

      if (exist) {
        return prev.map((item) => {
          if (item.id === roomTypeActive.id) {
            if (item.room.includes(room)) {
              return {
                ...item,
                room: item.room.filter((item) => item !== room),
              };
            } else {
              return {
                ...item,
                room: [...item.room, room],
              };
            }
          } else {
            return item;
          }
        });
      } else {
        return [
          ...prev,
          {
            id: roomTypeActive.id,
            room: [room],
          },
        ];
      }
    });
  };

  // choose room type
  const [chooseRoomType, setChooseRoomType] = useState<
    { label: string; id: string }[]
  >([]);

  // handle set choose room type
  const handleChooseRoomType = ({
    label,
    id,
  }: {
    label: string;
    id: string;
  }) => {
    // cek existence
    if (chooseRoomType.includes({ label, id })) {
      setChooseRoomType((prev) => prev.filter((item) => item.id !== id));
    } else {
      setChooseRoomType((prev) => [...prev, { label, id }]);
    }
  };

  // handle remove choose room type
  const handleRemoveChooseRoomType = (id: string) => {
    setChooseRoomType((prev) => prev.filter((item) => item.id !== id));
  };

  // cek choose room type
  useEffect(() => {
    if (!chooseRoomType.includes(roomTypeActive)) {
      setRoomTypeActive({ label: "Pilih tipe kamar", id: "0" });
    }
  }, [chooseRoomType]);

  // use form
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomRequestForInput>({
    defaultValues: { idHotel: id },
    resolver: zodResolver(RoomValidation.CREATE),
  });

  // set value for room type from room number
  useEffect(() => {
    const setTimeOut = setTimeout(() => {
      setValue("roomType", [
        {
          idRoomType: roomTypeActive.id,
          roomType: roomTypeActive.label,
        },
      ]);
    }, 500);

    return () => clearTimeout(setTimeOut);
  }, [roomNumber]);

  // handle submit

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start pt-6 px-4">
      {/* header */}
      <HeaderInputPage label="Add Room" />

      {/* content */}
      <form className="w-full flex flex-col justify-start items-start gap-4 mt-8">
        {/* input choose for room type */}
        <BoxInputAbstrakChoose
          handleChooseRoomType={handleChooseRoomType}
          chooseRoomType={chooseRoomType}
          handleRemoveChooseRoomType={handleRemoveChooseRoomType}
        />

        {/* input room number */}
        <InputRoomNumber
          idHotel={id}
          chooseRoomType={chooseRoomType}
          handleActiveModalRoomType={() => {}}
          roomTypeActive={roomTypeActive}
          handleRoomTypeActive={handleRoomTypeActive}
          roomNumber={roomNumber}
          handleSetRoomNumber={handleSetRoomNumber}
        />

        {/* button submit */}
        <ButtonSubmitBox type="submit" label="Submit" />
      </form>
    </div>
  );
};

// input room number
type InputRoomNumberProps = {
  chooseRoomType: { label: string; id: string }[];
  handleActiveModalRoomType: () => void;
  roomTypeActive: {
    label: string;
    id: string;
  };
  handleRoomTypeActive: ({ label, id }: { label: string; id: string }) => void;
  roomNumber: {
    id: string;
    room: number[];
  }[];
  handleSetRoomNumber: (room: number) => void;
  idHotel: string;
};
const InputRoomNumber: FC<InputRoomNumberProps> = ({
  chooseRoomType,
  roomTypeActive,
  handleRoomTypeActive,
  roomNumber,
  handleSetRoomNumber,
  idHotel,
}) => {
  // state modal choose room type for room number
  const [modalRoomType, setModalRoomType] = useState<boolean>(false);

  // state active modal choose room type for room number
  const handleActiveModalRoomType = () => {
    setModalRoomType((prev) => !prev);
  };

  // handle remove modal room type for room number
  const handleRemoveModalRoomType = () => {
    setModalRoomType(false);
  };

  // query
  const { data, isLoading } = useQuery({
    queryKey: ["roomType", idHotel],
    queryFn: () => HotelService.readTotalRoom(idHotel),
  });

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3 mt-3">
      {/* label & type room */}
      <div className="w-full flex flex-row justify-start items-center gap-4 relative">
        {/* label */}
        <LabelInput
          label="Room Number"
          htmlFor="roomNumber"
          required
          full={false}
        />

        {/* line */}
        <MdOutlineHorizontalRule className="text-black text-2xl absolute left-32" />
        {/* room type input */}

        <div
          className="flex flex-row justify-start items-center gap-1"
          onClick={() => handleActiveModalRoomType()}
        >
          <p className="text-sm capitalize ">{roomTypeActive.label}</p>

          {/* arrow down */}
          <IoIosArrowDown className="text-black text-xl" />
        </div>

        {/* modal choose room type */}
        <div
          className={clsx(
            "absolute flex flex-col justify-start items-start w-[55%] h-[20vw] top-[110%] right-0 bg-white shadow-[0px_0px_7px_0px_rgba(0,0,0,0.2)] rounded-xl overflow-y-scroll transition-all duration-200 ease-in-out z-30",
            modalRoomType ? "max-h-[20vw]" : "max-h-0"
          )}
        >
          {/* button choose room type */}
          {chooseRoomType.length > 0 ? (
            chooseRoomType.map((item, index) => (
              <button
                key={index}
                type="button"
                className="py-3 px-4 bg text-sm capitalize hover:bg-gray-200 w-full text-left"
                onClick={() => {
                  handleRoomTypeActive({ label: item.label, id: item.id }),
                    handleRemoveModalRoomType();
                }}
              >
                {item.label}
              </button>
            ))
          ) : (
            <p className="py-3 px-4 text-sm text-center w-full">
              {roomTypeActive.label}
            </p>
          )}
        </div>
      </div>

      {/* room  */}
      <div className="w-full flex flex-row justify-start items-start gap-3 flex-wrap">
        {isLoading ? (
          <div className="w-full h-full flex flex-row justify-center items-center">
            <img src={loadingBlue} alt="loading" className="w-10" />
          </div>
        ) : data?.data ? (
          Array.from({ length: data?.data.totalRoom }).map((_, index) => (
            <button
              key={index}
              disabled={
                roomNumber.some(
                  (item) =>
                    item.id !== roomTypeActive.id &&
                    item.room.includes(index + 1)
                ) && roomTypeActive.id !== "0"
              }
              type="button"
              onClick={() => handleSetRoomNumber(index + 1)}
              className={clsx(
                "w-12 h-12 flex flex-row justify-center items-center rounded-lg shadow-[0px_0px_7px_0px_rgba(0,0,0,0.2)]",
                roomNumber.some(
                  (item) =>
                    item.id !== roomTypeActive.id &&
                    item.room.includes(index + 1)
                ) && roomTypeActive.id !== "0"
                  ? "bg-gray-300"
                  : roomNumber.find(
                      (item) =>
                        item.id === roomTypeActive.id &&
                        item.room.includes(index + 1)
                    )
                  ? "bg-primary-skyblue text-white"
                  : roomTypeActive.id === "0"
                  ? "opacity-20"
                  : "bg-white"
              )}
            >
              {index + 1}
            </button>
          ))
        ) : (
          <div className="w-full h-full flex flex-row justify-center items-center">
            <p className="text-base">Data Tidak Ditemukan</p>
          </div>
        )}
      </div>

      {/* keterangan */}
      <div className="w-full flex flex-col justify-start items-start gap-2 mt-3">
        {/* disabled */}
        <div className="w-full flex flex-row justify-start items-center gap-1">
          <div className="w-4 h-4 bg-gray-300 rounded-sm" />
          <p className="text-xs">Disabled</p>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
