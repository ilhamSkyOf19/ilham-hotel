import { type FC } from "react";
import LabelInput from "../LabelInput";
import type { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import clsx from "clsx";
import type { HotelCreateServiceRequestType } from "../../models/hotel-model";
import { formatCurrency } from "../../utils/util";

// Props
type Props = {
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<HotelCreateServiceRequestType>;
  errorMessage?: string;
  label: string;
  placeholder: string;
  name: string;
};
const BoxInputAbstrakCurrency: FC<Props> = ({
  name,
  label,
  placeholder,
  register,
  errorMessage,
  setValue,
}) => {
  // handle change for convert currency
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get value
    const value = e.target.value;

    // format to number
    const parsedValue = Number(value.replace(/[^0-9.-]+/g, ""));

    // format to currency
    const formattedValue = formatCurrency(parsedValue);

    // set value
    setValue("price", formattedValue);
  };
  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      {/* label */}
      <LabelInput
        label={label}
        htmlFor={name}
        required
        errorMessage={errorMessage}
      />

      {/* box input */}
      <div
        className={clsx(
          "w-full flex flex-row justify-start items-center bg-gray-300/50 rounded-bl-full rounded-tr-full transition-all ease-in-out duration-100",
          errorMessage
            ? "shadow-[0px_2px_7px_0px_rgba(255,0,0,0.9)]"
            : "focus-within:shadow-[0px_2px_7px_0px_rgba(66,133,244,0.9)] shadow-[0px_2px_7px_0px_rgba(0,0,0,0.2)]"
        )}
      >
        <input
          {...register}
          name={name}
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
          className="py-3 px-10 w-full bg-transparent border-none outline-none text-black text-base font-medium placeholder:text-gray-400 placeholder:text-base placeholder:font-normal"
        />
      </div>
    </div>
  );
};

export default BoxInputAbstrakCurrency;
