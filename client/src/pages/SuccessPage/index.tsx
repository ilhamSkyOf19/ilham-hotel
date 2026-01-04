import { type FC } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import ButtonAction from "../../components/ButtonAction";
import ButtonBackCircle from "../../components/ButtonBackCircle";
import { useParams } from "react-router-dom";

const SuccessPage: FC = () => {
  // get id from params
  const { id: idBooking } = useParams() as { id: string };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      {/* button back */}
      <div className="w-full absolute top-8 left-4">
        <ButtonBackCircle linkBack="/" />
      </div>
      {/* icon check */}
      <IoCheckmarkCircle className="text-9xl text-primary-skyblue animate-slide-up-bounce" />

      <h2 className="text-2xl text-black font-semibold capitalize animate-slide-up">
        Congratulations!
      </h2>
      {/* desc */}
      <div className="w-full flex flex-col justify-start items-center mt-4">
        <p className="text-sm text-black/50 text-center animate-slide-up">
          You Hotel Successfully Booked.
        </p>
        <p className="text-sm text-black/50 text-center animate-slide-up">
          You can check your booking on the menu Profile.
        </p>
      </div>

      {/* bottom navigation */}
      <div className="w-full flex flex-col justify-start items-center h-36 bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] fixed bottom-0 rounded-t-3xl z-50 px-4 py-4 gap-2 animate-from-hidden-8s">
        {/* button view ereceipt */}
        <ButtonAction
          link={`/bookings/ereceipt/${idBooking}`}
          linkFrom="Success"
          label="View E-Receipt"
          blue={true}
        />

        {/* button view booking */}
        <ButtonAction
          link={"/bookings/ereceipt/98bb1952-4fbb-447b-9ac2-dfcf191a8ffc"}
          linkFrom="Success"
          label="View My Bookings"
        />
      </div>
    </div>
  );
};

export default SuccessPage;
