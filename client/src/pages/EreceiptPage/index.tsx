import { type FC, type ReactNode } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatCurrency, formatDateFull } from "../../utils/util";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "../../services/booking.service";

const EreceiptPage: FC = () => {
  // get state from location
  const location = useLocation();
  // get params
  const locationState = location.state?.from;

  // id booking from params
  const { id: idBooking } = useParams() as { id: string };

  // navigate
  const navigate = useNavigate();

  // format date
  const bookingDate: string[] = formatDateFull(new Date()).split("at");

  // use query download
  const { refetch, isFetching } = useQuery({
    queryKey: ["download-pdf"],
    queryFn: BookingService.downloadEreceipt,
    enabled: true,
  });

  // handle download
  const handleDownlaod = async () => {
    try {
      const { data: pdfUrl } = await refetch(); // string

      if (!pdfUrl) return;

      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `receipt ${idBooking}.pdf`; // nama file yang di-download
      document.body.appendChild(a);
      a.click(); // trigger download
      a.remove(); // bersihkan element <a>
      window.URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Download gagal:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center px-4 pt-8 relative">
      {/* header */}
      <div className="w-full flex flex-row justify-start items-center relative">
        {/* button back */}
        <button
          onClick={() => {
            if (locationState) {
              navigate(-1);
            } else {
              navigate("/bookings");
            }
          }}
          type="button"
          className="w-12 h-12 border border-black/20 flex flex-row justify-center items-center rounded-full absolute left-0"
        >
          <GoArrowLeft className="text-2xl text-black" />
        </button>
        <h1 className="w-full text-center">E-Receipt</h1>
      </div>

      {/* container info */}
      <div className="w-full flex flex-col justify-start items-center mt-12">
        {/* card info */}
        <ComponentContainerInfo>
          <ComponentInfo label="Name Hotel" value="Sapadia Tulang Bawang" />
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
            value={formatDateFull(new Date()).split("at")[0]}
          />

          {/* check in  */}
          <ComponentInfo
            label="Check Out"
            value={formatDateFull(new Date()).split("at")[0]}
          />

          {/* gust  */}
          <ComponentInfo label="Gust" value={`0${5} Person`} />
        </ComponentContainerInfo>

        {/*  */}
        <ComponentContainerInfo>
          {/* booking date */}
          <ComponentInfo
            label="Booking Date"
            value={`${bookingDate[0]} | ${bookingDate[1]}`}
          />

          {/* check in  */}
          <ComponentInfo
            label="Check In"
            value={formatDateFull(new Date()).split("at")[0]}
          />

          {/* check in  */}
          <ComponentInfo
            label="Check Out"
            value={formatDateFull(new Date()).split("at")[0]}
          />

          {/* gust  */}
          <ComponentInfo label="Gust" value={`0${5} Person`} />
        </ComponentContainerInfo>

        {/*  */}
        <ComponentContainerInfo dash={true}>
          {/* booking date */}
          <ComponentInfo
            label="Amount"
            value={`${formatCurrency(430, true)}`}
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
          <ComponentInfo label="Total" value={`${formatCurrency(700, true)}`} />
        </ComponentContainerInfo>

        {/* contact */}
        <ComponentContainerInfo>
          {/* name */}
          <ComponentInfo label="Name" value={`Ilham Rohmatulloh`} />
          {/* phone number */}
          <ComponentInfo
            label="Phone Number"
            value={Array.from("085896890881")
              .map((char, i) =>
                i === 0 ? `+62 ` : i !== 0 && i % 4 === 0 ? `-` + char : char
              )
              .join("")
              .toString()}
          />

          {/* id transaction */}
          <ComponentInfo
            label="Transaction ID"
            value={`#BOOKING-${"98bb1952-4fbb-447b-9ac2-dfcf191a8ffc"}`}
          />
        </ComponentContainerInfo>
      </div>

      {/* bottom navigation download */}
      <div className="w-screen fixed bottom-0 h-18 bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl px-4 flex flex-row justify-center items-center gap-2">
        <button
          disabled={isFetching}
          onClick={() => handleDownlaod()}
          type="button"
          className="w-full py-3.5 bg-primary-skyblue rounded-full text-white relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-200 before:ease-in-out hover:before:opacity-100"
        >
          Download E-Receipt
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

export default EreceiptPage;
