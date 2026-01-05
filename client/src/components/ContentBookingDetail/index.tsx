import { useEffect, type FC, type ReactNode } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatCurrency, formatDateFull } from "../../utils/util";
import clsx from "clsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookingService } from "../../services/booking.service";
import ButtonBackCircle from "../../components/ButtonBackCircle";
import { loadMidtransSnap } from "../../utils/midtrans";

// props
type Props = {
  typePage: "ereceipt" | "detailPage";
};

const ContentBookingDetail: FC<Props> = ({ typePage }) => {
  // navigate
  const navigate = useNavigate();

  // get state from location
  const location = useLocation();
  // get params
  const locationState = location.state?.from;

  // id booking from params
  const { id: idBooking } = useParams() as { id: string };

  // use query download
  const { data: dataBooking, isLoading } = useQuery({
    queryKey: ["booking", "detail", idBooking],
    queryFn: () => BookingService.readDetail(idBooking),
  });

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => BookingService.downloadEreceipt(idBooking),
    onSuccess: (data) => {
      const a = document.createElement("a");
      a.href = data;
      a.download = `receipt ${idBooking}.pdf`; // nama file yang di-download
      document.body.appendChild(a);
      a.click(); // trigger download
      a.remove(); // bersihkan element <a>
      window.URL.revokeObjectURL(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // snap midtrans
  const handlePayment = async () => {
    try {
      // loading open midtrans
      navigate("/open-midtrans");

      // load midtrans snap
      await loadMidtransSnap();

      const timeout = setTimeout(() => {
        navigate("/error-booking");
      }, 5000);

      // buka snap
      window.snap.pay(dataBooking?.data?.token!, {
        onSuccess: () => {
          clearTimeout(timeout);
          navigate(`/success-booking/${idBooking}`);
        },

        onPending: () => {
          clearTimeout(timeout);
          navigate(`/pending-booking/${idBooking}`);
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
    } catch (error) {
      console.log(error);
    }
  };

  // format date
  const bookingDate: string[] = formatDateFull(
    new Date(dataBooking?.data?.createdAt ?? new Date())
  ).split("at");

  // debug
  useEffect(() => {
    console.log(dataBooking);
  }, [dataBooking]);

  return (
    <div className="w-full flex flex-col justify-start items-center px-4 pt-8 relative">
      {/* header */}
      <div className="w-full flex flex-row justify-start items-center relative">
        {/* button back */}
        <ButtonBackCircle
          linkBack={typePage === "ereceipt" ? "/bookings" : "/"}
          from={locationState}
        />
        <h1 className="w-full text-center">
          {typePage === "ereceipt" ? "E-Receipt" : "Bookings Detail"}
        </h1>
      </div>

      {/* container info */}
      <div className="w-full flex flex-col justify-start items-center mt-12">
        {/* card info */}
        <ComponentContainerInfo>
          <ComponentInfo
            label="Name Hotel"
            value={dataBooking?.data?.hotel.name ?? ""}
          />
        </ComponentContainerInfo>

        <ComponentContainerInfo>
          {/* booking date */}
          <ComponentInfo
            label="Booking Date"
            value={`${bookingDate[0]} | ${bookingDate[1]}`}
          />

          {/* check in  */}
          <ComponentInfo
            label="Check In"
            value={
              formatDateFull(
                new Date(dataBooking?.data?.checkIn ?? new Date())
              ).split("at")[0]
            }
          />

          {/* check in  */}
          <ComponentInfo
            label="Check Out"
            value={
              formatDateFull(
                new Date(dataBooking?.data?.checkOut ?? new Date())
              ).split("at")[0]
            }
          />

          {/* guest  */}
          <ComponentInfo
            label="Guest"
            value={`0${dataBooking?.data?.visitor} Person`}
          />
        </ComponentContainerInfo>

        {/*  */}
        <ComponentContainerInfo dash={true}>
          {/* booking date */}
          <ComponentInfo
            label="Amount"
            value={`${formatCurrency(
              (dataBooking?.data?.totalPrice ?? 0) - 5,
              true
            )}`}
          />

          {/* check in  */}
          <ComponentInfo
            label="Tax & Fees"
            value={`${formatCurrency(5, true)}`}
          />
        </ComponentContainerInfo>

        {/* total */}
        <ComponentContainerInfo>
          {/* booking date */}
          <ComponentInfo
            label="Total"
            value={`${formatCurrency(
              dataBooking?.data?.totalPrice ?? 0,
              true
            )}`}
          />
        </ComponentContainerInfo>

        {/* contact */}
        <ComponentContainerInfo>
          {/* name */}
          <ComponentInfo
            label="Name"
            value={dataBooking?.data?.user.fullName ?? ""}
          />
          {/* phone number */}
          <ComponentInfo
            label="Phone Number"
            value={Array.from(dataBooking?.data?.user.phone ?? "")
              .map((char, i) =>
                i === 0 ? `+62 ` : i !== 0 && i % 4 === 0 ? `-` + char : char
              )
              .join("")
              .toString()}
          />

          {/* id transaction */}
          <ComponentInfo
            label="Transaction ID"
            value={`#BOOKING-${dataBooking?.data?._id}`}
          />

          {/* id transaction */}
          <ComponentInfo
            label="Status"
            value={dataBooking?.data?.status ?? ""}
          />
        </ComponentContainerInfo>
      </div>

      {/* bottom navigation download */}
      <div className="w-screen fixed bottom-0 h-18 bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl px-4 flex flex-row justify-center items-center gap-2">
        <button
          disabled={typePage === "ereceipt" ? isPending : isLoading}
          onClick={() =>
            typePage === "ereceipt" ? mutateAsync() : handlePayment()
          }
          type="button"
          className="w-full py-3.5 bg-primary-skyblue rounded-full text-white relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-200 before:ease-in-out hover:before:opacity-100"
        >
          {typePage === "ereceipt" ? "Download E-Receipt" : "Payment"}
        </button>
      </div>
    </div>
  );
};

// component container info
type ComponentContainerInfoProps = {
  children: ReactNode;
  dash?: boolean;
};
const ComponentContainerInfo: FC<ComponentContainerInfoProps> = ({
  children,
  dash,
}) => {
  return (
    <div
      className={clsx(
        "w-full py-6 relative flex flex-col justify-start items-center gap-3",
        !dash && "border-b border-black/10 "
      )}
    >
      {children}

      {/* dash */}
      {dash && (
        <div className="w-full flex flex-row justify-evenly items-center absolute bottom-0 gap-3">
          {Array.from({ length: 10 }, (_, i) => (
            <div className="w-[10%] h-px bg-black/10" key={i} />
          ))}
        </div>
      )}
    </div>
  );
};
// component info
type ComponentInfoProps = {
  label: string;
  value: string;
};
const ComponentInfo: FC<ComponentInfoProps> = ({ label, value }) => {
  return (
    <div className="w-full flex flex-row justify-between items-start">
      {/* label */}
      <p className="flex-1 text-base text-black/50">{label}</p>

      {/* value */}
      <p className="flex-2 text-sm font-medium text-black text-end">{value}</p>
    </div>
  );
};

export default ContentBookingDetail;
