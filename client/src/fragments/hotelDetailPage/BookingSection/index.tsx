import { useState, type FC } from "react";
import HeaderComponent from "../HeaderComponent";
import InputDateforBook from "../../../components/InputDateForBook";
import clsx from "clsx";
import ButtonSubmitBox from "../../../components/ButtonSubmitBox";
import { useMutation } from "@tanstack/react-query";
import type { BookingCreateRequestType } from "../../../models/booking-model";
import { BookingService } from "../../../services/booking.service";
import { useNavigate } from "react-router-dom";

type Props = {
  handleModalClose: () => void;
  idHotel: string;
  nameHotel: string;
  city: string;
  country: string;
  discount: number;
  linkMaps: string;
};

const BookingSection: FC<Props> = ({
  handleModalClose,
  idHotel,
  nameHotel,
  city,
  country,
  discount,
  linkMaps,
}) => {
  // navigate
  const navigate = useNavigate();

  // state check in & check out
  const [checkDate, setCheckDate] = useState<{
    checkIn: string;
    checkOut: string;
  }>({
    checkIn: "",
    checkOut: "",
  });

  //   handle check date
  const handleCheckDate = (type: "checkIn" | "checkOut", date: string) => {
    setCheckDate((prev) => ({
      ...prev,
      [type]: date,
    }));
  };

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: BookingCreateRequestType) => {
      return BookingService.booking(data);
    },
    onSuccess: (data) => {
      if (window.snap) {
        window.snap.pay(data?.data?.token!, {
          onSuccess: () => navigate("/"),
          onPending: () => navigate("/"),
          onError: () => navigate("/"),
          onClose: () => navigate("/"),
        });
      } else {
        alert("Snap belum siap, coba reload halaman.");
      }

      console.log("Booking successful:", data);
    },
    onError: (error) => {
      console.log("Error booking:", error);
    },
  });

  // handle booking
  const handleBooking = async () => {
    try {
      // convert check date to iso string
      const checkInDate = new Date(checkDate.checkIn).toISOString();
      const checkOutDate = new Date(checkDate.checkOut).toISOString();

      // call mutate
      await mutateAsync({
        hotel: idHotel,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        visitor: 1,
      });
    } catch (error) {
      console.log("Error booking:", error);
    }
  };

  // state visitor
  const [visitorCount, setVisitorCount] = useState<number>(1);
  return (
    <div className="w-full h-full flex flex-col justify-start items-start pb-12 overflow-y-scroll">
      {/* button line */}
      <button
        type="button"
        onClick={() => handleModalClose()}
        className="w-full flex flex-row justify-center items-center py-1.5 mb-4 group"
      >
        <div className="w-32 h-1.5 bg-gray-300 rounded-full group-hover:bg-gray-300 transition-all duration-200 ease-in-out" />
      </button>

      {/* header */}
      <div className="w-full relative pb-8 before:content-[''] before:absolute before:inset-x-4 before:bottom-0 before:h-px before:bg-black/20">
        <HeaderComponent
          nameHotel={nameHotel}
          linkMaps={linkMaps}
          city={city}
          country={country}
          discount={discount}
        />
      </div>

      {/* content book */}
      <div className="w-full flex flex-col justify-start items-start py-4 px-4">
        {/* header */}
        <h1 className="text-base text-gray-400 uppercase">book hotel</h1>

        {/* checkin */}
        <InputDateforBook
          title="Check In"
          handleCheckDate={(date) => handleCheckDate("checkIn", date)}
        />

        {/* check out */}
        <InputDateforBook
          title="Check Out"
          handleCheckDate={(date) => handleCheckDate("checkOut", date)}
        />

        {/* visitor */}
        <div className="w-full flex flex-col justify-start items-start gap-3 mt-4">
          {/* title */}
          <h2 className="text-xl text-black">Visitor</h2>

          <div className="w-full flex flex-row justify-start items-start flex-wrap gap-3">
            {/* card visitor */}
            {[1, 2, 3].map((item, index) => (
              <button
                key={index}
                onClick={() => setVisitorCount(item)}
                type="button"
                className={clsx(
                  "py-2 px-6 rounded-md text-sm capitalize hover:bg-primary-skyblue hover:text-white transition-all duration-200 ease-in-out",
                  visitorCount === item
                    ? "bg-primary-skyblue text-white"
                    : "bg-gray-200/70 text-black"
                )}
              >
                {item} visitor
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* button booking */}
      <div className="w-full px-4 mt-2">
        <ButtonSubmitBox
          loading={isPending}
          label="booking"
          type="button"
          handleClick={() => handleBooking()}
          handleNavigate={() => {}}
        />
      </div>
    </div>
  );
};

export default BookingSection;
