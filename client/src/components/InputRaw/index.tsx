import { type FC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type: "text" | "email" | "password";
  name: string;
  placeholder: string;
  register: UseFormRegisterReturn;
};
const InputRaw: FC<Props> = ({ type, name, placeholder, register }) => {
  return (
    <input
      {...register}
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent text-black text-base font-medium outline-none border-none placeholder:text-gray-400 placeholder:text-base placeholder:font-medium"
    />
  );
};

export default InputRaw;
