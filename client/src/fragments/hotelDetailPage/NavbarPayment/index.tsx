import { type FC, type RefObject } from "react";
import ButtonAction from "../../../components/ButtonAction";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../../../services/booking.service";
import { formatCurrency } from "../../../utils/util";
import BookingSection from "../BookingSection";

type Props = {
  refModalBooking: RefObject<HTMLDivElement | null>;
  isModalBookingOpen: boolean;
  idHotel: string;
  isModalWarning: boolean;
  handleButtonBooking: () => void;
  nameHotel: string;
  cityHotel: string;
  countryHotel: string;
  discountHotel: number;
  linkMapsHotel: string;
  priceHotel: number;
  handleModalBookingClose: () => void;
};

const NavbarPayment: FC<Props> = ({
  idHotel,
  refModalBooking,
  isModalBookingOpen,
  isModalWarning,
  cityHotel,
  countryHotel,
  discountHotel,
  handleButtonBooking,
  linkMapsHotel,
  nameHotel,
  priceHotel,
  handleModalBookingClose,
}) => {
  // use query get id booking is pending
  const { data: bookingPending, isPending } = useQuery({
    queryKey: ["bookingIsPending", idHotel],
    queryFn: () => BookingService.getIdBookingIsPending(idHotel!),
  });

  return (
    <div
      ref={refModalBooking}
      className={clsx(
        "w-screen fixed bottom-0 h-[70vh] bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-40 rounded-t-3xl py-2 flex flex-row justify-start items-center gap-2 transition-all duration-300 ease-in-out",
        isModalBookingOpen ? "max-h-[70vh]" : "max-h-18"
      )}
    >
      {/* total price */}
      {bookingPending?.data ? (
        <div className="w-full flex flex-row justify-start items-center px-4">
          <ButtonAction
            label="Lanjutkan Pembayaran"
            blue={true}
            link={`/bookings/detail/${bookingPending.data}`}
            linkFrom={"hotel-detail"}
            button={true}
          />
        </div>
      ) : !isPending && !isModalBookingOpen && !isModalWarning ? (
        <ButtonBooking
          handleModalActive={() => handleButtonBooking()}
          price={priceHotel}
        />
      ) : (
        isModalBookingOpen && (
          <BookingSection
            handleModalClose={() => handleModalBookingClose()}
            idHotel={idHotel}
            nameHotel={nameHotel}
            city={cityHotel}
            country={countryHotel}
            discount={discountHotel}
            linkMaps={linkMapsHotel}
            price={priceHotel}
          />
        )
      )}
    </div>
  );
};

// button booking
type ButtonBookinProps = {
  handleModalActive: () => void;
  price: number;
};
const ButtonBooking: FC<ButtonBookinProps> = ({ handleModalActive, price }) => {
  return (
    <div className="w-full h-full flex flex-row justify-start items-start gap-2 px-2">
      <div className="flex-1 h-full flex flex-col justify-start items-center">
        <h4 className="text-base text-black capitalize">total price</h4>

        {/* price */}
        <h4 className="text-lg text-black font-medium">
          {formatCurrency(price)}{" "}
          <span className="text-xs ml-0.5 text-gray-600 font-medium">
            /night
          </span>
        </h4>
      </div>

      {/* button */}
      <div className="flex-2 h-14 flex flex-row justify-end items-center ">
        <button
          type="button"
          onClick={() => handleModalActive()}
          className="h-full px-10 text-lg capitalize font-medium text-white bg-primary-skyblue rounded-full relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/20 before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100"
        >
          book now
        </button>
      </div>
    </div>
  );
};

export default NavbarPayment;
