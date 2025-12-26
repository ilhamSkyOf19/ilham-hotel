import { useEffect, type FC } from "react";
// import { useLoaderData } from "react-router";
// import type { ResponseType } from "../../utils/response-type";
// import type { HotelResponseType } from "../../models/hotel-model";
import hotelDummy from "../../assets/thumb/kamar-2.jpg";
import { BsArrowLeft } from "react-icons/bs";

const HotelDetailPage: FC = () => {
  // // get data from use loader
  // const hotel = useLoaderData() as ResponseType<HotelResponseType | null>;

  // // debug
  // useEffect(() => {
  //   console.log(hotel);
  // }, [hotel]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* photo */}
      <div className="w-full h-[40vh] flex flex-col justify-start items-center bg-black relative">
        {/* img */}
        <img
          src={hotelDummy}
          alt="hotel"
          className="w-full h-full object-cover"
        />

        {/* content */}
        <div className="w-full h-full absolute z-10 flex flex-col justify-between items-center px-4 py-6">
          {/* header */}
          <div className="w-full flex flex-row justify-between items-center">
            {/* icon back */}
            <div className="w-full flex flex-row justify-start items-center">
              <button
                type="button"
                className="w-12 h-12 bg-white rounded-full flex flex-row justify-center items-center"
              >
                <BsArrowLeft className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
