import { FloatingLabel } from "flowbite-react";
import { type FC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

// Props
type Props = {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
};
const InputText: FC<Props> = ({ register, label, error }) => {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <FloatingLabel
        {...register}
        variant="standard"
        label={label}
        className="w-90"
        style={{
          color: "black",
          fontSize: "18px",
          fontWeight: "500",
          width: "85vw",
          borderBottom: "2px solid #4285f4",
        }}
      />

      {/* error */}
      <ErrorMessage error={error} />
    </div>
  );
};

export default InputText;
