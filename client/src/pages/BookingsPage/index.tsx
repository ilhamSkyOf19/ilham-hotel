import { useState, type FC } from "react";
import clsx from "clsx";

// type section
const section: string[] = ["completed", "upcomming"];

const BookingsPage: FC = () => {
  // state section
  const [isSectionActive, setIsSectionActive] = useState<string>("completed");
  return (
    <div className="w-full h-full flex flex-col justify-start items-start pt-8">
      {/* header */}
      {/* <HeaderDashboardData label="bookings" /> */}
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
    </div>
  );
};

export default BookingsPage;
