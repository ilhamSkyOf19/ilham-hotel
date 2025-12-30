import { useRef, useState, type ChangeEvent, type FC } from "react";
import { addMonths, formatDate, getTodayLocal } from "../../utils/util";
import { MdDateRange } from "react-icons/md";
import clsx from "clsx";

type Props = {
  title: string;
};
const InputDateforBook: FC<Props> = ({ title }) => {
  // state open
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // state check in
  const [isInputValue, setInputValue] = useState<string>(
    formatDate(new Date())
  );

  // ref check in
  const refInput = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 mt-3">
      {/* title */}
      <h2 className="text-xl text-black">{title}</h2>

      {/* date */}
      <div className="w-full flex flex-row justify-start items-center gap-3">
        {/* label */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            refInput.current?.showPicker(), console.log("klik");
          }}
          className={clsx(
            "w-[50vw] py-2.5 px-4 border border-gray-400 rounded-lg flex flex-row justify-start items-center transition-all duration-200 ease-in-out",
            isOpen ? "ring-2 ring-primary-skyblue" : "ring-2 ring-transparent"
          )}
        >
          <p className="text-base">{isInputValue}</p>
        </button>
        {/* icon */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
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
          // set open
          setIsOpen(false);
          //   get value
          const value = e.target?.value;

          if (!value) {
            setInputValue(formatDate(new Date())); // atau null
            return;
          }

          setInputValue(formatDate(new Date(value)));
        }}
        type="date"
        name="checkIn"
        min={getTodayLocal()}
        max={getTodayLocal(addMonths(new Date(), 3))}
        hidden={true}
      />
    </div>
  );
};

export default InputDateforBook;
