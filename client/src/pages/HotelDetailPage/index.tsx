import { useEffect, type FC } from "react";
import { useLoaderData } from "react-router";
import type { ResponseType } from "../../utils/response-type";
import type { HotelResponseType } from "../../models/hotel-model";

const HotelDetailPage: FC = () => {
  // get data from use loader
  const hotel = useLoaderData() as ResponseType<HotelResponseType | null>;

  // debug
  useEffect(() => {
    console.log(hotel);
  }, [hotel]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p>hotel detail</p>
    </div>
  );
};

export default HotelDetailPage;
