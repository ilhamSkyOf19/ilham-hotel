import { type FC } from "react";
import ContentForCardMedium from "../ContentForCardMedium";
import ButtonAction from "../ButtonAction";

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
        <ButtonAction button={true} handleClick={() => {}} label="View" />

        {/* e-receipt */}
        <ButtonAction
          link={`/bookings/ereceipt/${idBooking}`}
          linkFrom="bookings"
          handleClick={() => {}}
          label="E-Receipt"
          blue={true}
        />
      </div>
    </div>
  );
};

export default CardHotelBooking;
