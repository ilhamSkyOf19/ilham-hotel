import { type FC } from "react";
import ContentForCardMedium from "../ContentForCardMedium";
import { useNavigate } from "react-router-dom";

type Props = {
  idBooking: string;
  thumbnail: string;
  discount: number;
  rating: number;
  title: string;
  location: string;
  price: number;
  //   linkDetail: string;
};

const CardHotelBooking: FC<Props> = ({
  thumbnail,
  discount,
  rating,
  title,
  location,
  price,
  //   linkDetail,
  idBooking,
}) => {
  // navigate
  const navigate = useNavigate();
  return (
    <div className="w-full h-58 flex flex-col justify-start items-start bg-white shadow-[0_0_10px_0px_rgba(0,0,0,0.08)] rounded-xl px-4 py-2 gap-3">
      {/* content card */}
      <div className="flex-4 pb-4 w-full flex flex-row justify-start items-start gap-3 relative before:content-[''] before:absolute before:h-0.5 before:left-0 before:right-0 before:bg-black/5 before:rounded-full before:bottom-0">
        <ContentForCardMedium
          discount={discount}
          disableDetail={true}
          linkDetail={""}
          thumbnail={thumbnail}
          rating={rating}
          title={title}
          location={location}
          price={price}
        />
      </div>

      {/* button action */}
      <div className="flex-1 w-full flex flex-row justify-between items-center gap-4">
        {/* view hotel */}
        <button
          type="button"
          className="py-2.5 w-full bg-gray-100 rounded-full relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-200 before:ease-in-out hover:before:opacity-100"
        >
          View
        </button>

        {/* e-receipt */}
        <button
          onClick={() =>
            navigate(`/bookings/ereceipt/${idBooking}`, {
              state: { from: "bookings" },
            })
          }
          type="button"
          className="py-2.5 w-full  rounded-full bg-primary-skyblue text-white relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-200 before:ease-in-out hover:before:opacity-100"
        >
          E-Receipt
        </button>
      </div>
    </div>
  );
};

export default CardHotelBooking;
