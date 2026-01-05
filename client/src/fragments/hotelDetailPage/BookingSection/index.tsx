import { useEffect, useState, type FC } from "react";
import HeaderComponent from "../HeaderComponent";
import InputDateforBook from "../../../components/InputDateForBook";
import clsx from "clsx";
import ButtonSubmitBox from "../../../components/ButtonSubmitBox";
import { useMutation } from "@tanstack/react-query";
import type { BookingCreateRequestType } from "../../../models/booking-model";
import { BookingService } from "../../../services/booking.service";
import { useNavigate } from "react-router-dom";
import {
  addDays,
  formatCurrency,
  formatDate,
  getTotalDays,
} from "../../../utils/util";
import { loadMidtransSnap } from "../../../utils/midtrans";
import { store } from "../../../store/store";
import { setBooking } from "../../../store/bookingSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/rootReducer";

type Props = {
  handleModalClose: () => void;
  idHotel: string;
  nameHotel: string;
  city: string;
  country: string;
  discount: number;
  linkMaps: string;
  price: number;
};

const BookingSection: FC<Props> = ({
  handleModalClose,
  idHotel,
  nameHotel,
  city,
  country,
  discount,
  linkMaps,
  price,
}) => {
  // get data from redux
  const dataBooking = useSelector((state: RootState) => state.booking);

  // get discount
  const totalDiscount: number = price * (10 / 100);

  // state total days
  const [isTotalPrice, setIsTotalPrice] = useState<number>(0);
  // state visitor
  const [visitorCount, setVisitorCount] = useState<number>(1);

  // navigate
  const navigate = useNavigate();

  // state check in & check out
  const [checkDate, setCheckDate] = useState<{
    checkIn: Date;
    checkOut: Date;
  }>({
    checkIn: new Date(),
    checkOut: addDays(new Date(), 30),
  });

  // set check date
  useEffect(() => {
    // cek id hotel
    if (idHotel !== dataBooking.idHotel) return;

    // set check date
    setCheckDate({
      checkIn: new Date(dataBooking.checkIn),
      checkOut: new Date(dataBooking.checkOut),
    });

    // cek data booking
    console.log("data", dataBooking);
  }, []);

  // debug checkDate
  useEffect(() => {
    const totalDays: number = getTotalDays(
      checkDate.checkIn,
      checkDate.checkOut
    );

    // set total price
    setIsTotalPrice((price - totalDiscount) * totalDays);

    // set redux
    store.dispatch(
      setBooking({
        idHotel: idHotel,
        checkIn: checkDate.checkIn.toISOString(),
        checkOut: checkDate.checkOut.toISOString(),
      })
    );
  }, [checkDate]);

  //   handle check date
  const handleCheckDate = (type: "checkIn" | "checkOut", date: Date) => {
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
    onSuccess: async (data) => {
      // loading open midtrans
      navigate("/open-midtrans");

      // load midtrans snap
      await loadMidtransSnap();

      const timeout = setTimeout(() => {
        navigate("/error-booking");
      }, 5000);

      // buka snap
      window.snap.pay(data.data?.token!, {
        onSuccess: () => {
          clearTimeout(timeout);
          navigate(`/success-booking/${data.data?._id}`);
        },

        onPending: () => {
          clearTimeout(timeout);
          navigate(`/pending-booking/${data.data?._id}`);
        },

        onError: () => {
          clearTimeout(timeout);
          navigate("/error-booking");
        },

        onClose: () => {
          clearTimeout(timeout);
          navigate("/error-booking");
        },
      });

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
        visitor: visitorCount,
      });
    } catch (error) {
      console.log("Error booking:", error);
    }
  };

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
          valueLabel={checkDate.checkIn}
          checkOut={checkDate.checkOut}
        />

        {/* checkout */}
        <InputDateforBook
          title="Check Out"
          handleCheckDate={(date) => handleCheckDate("checkOut", date)}
          valueLabel={checkDate.checkOut}
          checkIn={checkDate.checkIn}
        />

        {/* visitor */}
        <div className="w-full flex flex-col justify-start items-start gap-3 mt-4">
          {/* title */}
          <h2 className="text-xl text-black font-medium">Visitor</h2>

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

        {/* bill */}
        <BillComponent
          checkIn={checkDate.checkIn}
          checkOut={checkDate.checkOut}
          discount={totalDiscount}
          totalPrice={isTotalPrice}
        />
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

// bill
type BillComponentProps = {
  checkIn: Date;
  checkOut: Date;
  discount: number;
  totalPrice: number;
};

const BillComponent: FC<BillComponentProps> = ({
  checkIn,
  checkOut,
  discount,
  totalPrice,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-start mt-8 gap-3">
      {/* title */}
      <h2 className="text-xl text-black font-medium">Bill</h2>

      {/* check in & check out */}
      <div className="w-full flex flex-col justify-start items-start gap-1">
        {/* header */}
        <h3 className="text-base text-primary-skyblue font-medium">In - Out</h3>

        <div className="w-full flex flex-row justify-start items-start gap-2">
          {/* check in */}
          <p className="text-sm font-medium">{formatDate(checkIn)}</p>
          <p className="text-base font-medium">-</p>
          <p className="text-sm font-medium">{formatDate(checkOut)}</p>
        </div>
      </div>

      {/* discount */}
      <div className="w-full flex flex-col justify-start items-start gap-1">
        {/* header */}
        <h3 className="text-base text-primary-skyblue font-medium">Discount</h3>

        {/* discount */}
        <p className="w-full text-sm text-black font-medium">
          {formatCurrency(discount)}
        </p>
      </div>

      {/* total price */}
      <div className="w-full flex flex-col justify-start items-start gap-1">
        {/* header */}
        <h3 className="text-base text-primary-skyblue font-medium">
          Total Price
        </h3>

        {/* discount */}
        <p className="w-full text-base text-black font-semibold">
          {formatCurrency(totalPrice)}
        </p>
      </div>
    </div>
  );
};

export default BookingSection;
