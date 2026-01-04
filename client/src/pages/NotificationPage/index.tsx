import { type FC } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import ButtonAction from "../../components/ButtonAction";
import ButtonBackCircle from "../../components/ButtonBackCircle";
import { useParams } from "react-router-dom";
import { IoIosAlert } from "react-icons/io";

type Props = {
  typePage: "success" | "error";
};
const NotificationPage: FC<Props> = ({ typePage }) => {
  // get id from params
  const { id: idBooking } = useParams() as { id: string };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      {/* button back */}
      <div className="w-full absolute top-8 left-4">
        <ButtonBackCircle linkBack="/" />
      </div>
      {/* icon check */}
      {typePage === "success" ? (
        <IoCheckmarkCircle className="text-9xl text-primary-skyblue animate-slide-up-bounce" />
      ) : (
        <IoIosAlert className="text-9xl text-primary-skyblue animate-slide-up-bounce" />
      )}

      <h2 className="text-2xl text-black font-semibold capitalize animate-slide-up">
        {typePage === "success" ? "Congratulations!" : "Sorry!"}
      </h2>
      {/* desc */}
      <div className="w-full flex flex-col justify-start items-center mt-4">
        <p className="text-sm text-black/50 text-center animate-slide-up">
          {typePage === "success"
            ? "You Hotel Successfully Booked."
            : "Your hotel failed to book."}
        </p>
        <p className="text-sm text-black/50 text-center animate-slide-up">
          {typePage === "success"
            ? "You can check your booking on the menu Profile."
            : "Your payment was unsuccessful."}
        </p>
      </div>

      {/* bottom navigation */}
      <div className="w-full flex flex-col justify-start items-center h-auto bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] fixed bottom-0 rounded-t-3xl z-50 px-4 py-4 gap-2 animate-from-hidden-8s">
        {typePage === "success" ? (
          <>
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
          </>
        ) : (
          <ButtonAction
            link={`/`}
            linkFrom="Error"
            label="Back to Home"
            blue={true}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
