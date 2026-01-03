import { useEffect, useState, type FC } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../../services/booking.service";
import LoadingCardBooking from "../../components/LoadingCardBooking";
import CardHotelBooking from "../../components/CardHotelBooking";

// type section
const section: ("upcoming" | "completed")[] = ["upcoming", "completed"]; // ✅

const BookingsPage: FC = () => {
  // state section
  const [isSectionActive, setIsSectionActive] = useState<
    "upcoming" | "completed"
  >("upcoming");

  // query bookings
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["booking", "bookingPage", isSectionActive],
    queryFn: () => BookingService.readBookingsWithDataHotels(isSectionActive),
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="w-full h-full flex flex-col justify-start items-start pt-8">
      {/* header */}
      <h1 className="w-full text-center">My Bookings</h1>
      {/* button section */}
      <div className="w-full flex flex-row justify-evenly items-center mt-8 relative before:content-[''] before:absolute before:left-0 before:right-0 before:h-0.5 before:bg-black/10 before:bottom-0">
        {/* button */}
        {section.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setIsSectionActive(item)}
            className={clsx(
              "text-base  relative capitalize pb-4 px-3 hover:text-primary-skyblue transition-colors duration-300 ease-in-out",
              "before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1 before:bg-primary-skyblue before:rounded-t-full hover:before:scale-x-100 before:origin-center before:transition-all before:duration-300 before:ease-in-out",
              isSectionActive === item
                ? "text-primary-skyblue before:scale-100"
                : "text-black before:scale-x-0"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {/* content */}
      <div className="w-full flex flex-col justify-start items-center gap-7 py-12 px-4">
        {isLoading ? (
          <LoadingCardBooking />
        ) : bookings?.data && bookings.data.length > 0 ? (
          bookings.data.map((item) => (
            <CardHotelBooking
              key={item._id}
              idBooking={item._id}
              thumbnail={item.hotel.thumbnail}
              title={item.hotel.name}
              price={item.hotel.price}
              rating={item.hotel.rating}
              location={`${item.hotel.location.city}, ${item.hotel.location.country}`}
              discount={item.hotel.discount}
            />
          ))
        ) : (
          <div className="w-full h-[30vh] flex flex-row justify-center items-center">
            <p className="text-primary-skyblue text-sm">
              Booking tidak tersedia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
