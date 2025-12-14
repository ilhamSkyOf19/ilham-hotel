import { type FC } from "react";
import LabelInput from "../LabelInput";
import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

// props
type Props = {
  register: UseFormRegisterReturn;
  errorMessage?: string;
  name: string;
  placeholder: string;
  label: string;
};
const BoxInputAbstrakTextArea: FC<Props> = ({
  label,
  name,
  placeholder,
  register,
  errorMessage,
}) => {
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
          "w-full flex flex-row justify-start items-center bg-gray-300/50 rounded-bl-[4rem] rounded-tr-[4rem]  transition-all ease-in-out duration-100",
          errorMessage
            ? "shadow-[0px_2px_7px_0px_rgba(255,0,0,0.9)]"
            : "focus-within:shadow-[0px_2px_7px_0px_rgba(66,133,244,0.9)] shadow-[0px_2px_7px_0px_rgba(0,0,0,0.2)]"
        )}
      >
        <textarea
          {...register}
          rows={10}
          placeholder={placeholder}
          className="py-3 px-10 w-full bg-transparent border-none outline-none text-black text-base font-medium placeholder:text-gray-400 placeholder:text-base placeholder:font-normal"
        />
      </div>
    </div>
  );
};

export default BoxInputAbstrakTextArea;
