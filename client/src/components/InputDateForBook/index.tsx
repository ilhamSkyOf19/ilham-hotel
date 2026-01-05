import { useRef, type ChangeEvent, type FC } from "react";
import { addDays, formatDate, getTodayLocal, minDays } from "../../utils/util";
import { MdDateRange } from "react-icons/md";
import clsx from "clsx";

type Props = {
  title: string;
  handleCheckDate: (date: Date) => void;
  checkIn?: Date;
  checkOut?: Date;
  valueLabel: Date;
};
const InputDateforBook: FC<Props> = ({
  title,
  handleCheckDate,
  checkIn,
  checkOut,
  valueLabel,
}) => {
  // ref check in
  const refInput = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 mt-3">
      {/* title */}
      <h2 className="text-xl text-black font-medium">{title}</h2>

      {/* date */}
      <div className="w-full flex flex-row justify-start items-center gap-3">
        {/* label */}
        <button
          type="button"
          className={clsx(
            "w-[50vw] py-2.5 px-4 border border-gray-400 rounded-lg flex flex-row justify-start items-center transition-all duration-200 ease-in-out"
          )}
        >
          <p className="text-base">{formatDate(valueLabel)}</p>
        </button>
        {/* icon */}
        <button
          type="button"
          onClick={() => {
            refInput.current?.showPicker(), console.log("klik");
          }}
        >
          <MdDateRange className="text-3xl text-primary-skyblue" />
        </button>
      </div>

      {/* input date */}
      <input
        ref={refInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          //   get value
          const value = e.target?.value;

          if (!value) {
            handleCheckDate(valueLabel);
            return;
          }

          handleCheckDate(new Date(value));
        }}
        type="date"
        name="checkIn"
        min={checkIn ? getTodayLocal(addDays(checkIn, 1)) : getTodayLocal()}
        max={
          checkOut
            ? getTodayLocal(minDays(checkOut, 1))
            : getTodayLocal(addDays(new Date(), 3))
        }
        hidden={true}
      />
    </div>
  );
};

export default InputDateforBook;
