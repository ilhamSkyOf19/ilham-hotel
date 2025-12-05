import { FloatingLabel } from "flowbite-react";
import { useState, type FC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { PiEyeSlash } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import ErrorMessage from "../ErrorMessage";
// Props
type Props = {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
};
const InputPassword: FC<Props> = ({ register, label, error }) => {
  // state hide password
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className="w-[85vw] flex flex-col justify-start items-center gap-1 relative">
      <FloatingLabel
        {...register}
        variant="standard"
        type={hidePassword ? "password" : "text"}
        label={label}
        maxLength={20}
        style={{
          color: "black",
          fontSize: "18px",
          fontWeight: "500",
          width: "85vw",
          borderBottom: "2px solid #4285f4",
        }}
      />

      {/* eye */}
      <button type="button" className="absolute top-2 right-0">
        {hidePassword ? (
          <PiEyeSlash
            className="text-2xl text-black"
            onClick={() => setHidePassword(false)}
          />
        ) : (
          <PiEyeLight
            className="text-2xl text-black"
            onClick={() => setHidePassword(true)}
          />
        )}
      </button>

      {/* error */}
      <ErrorMessage error={error} />
    </div>
  );
};

export default InputPassword;
