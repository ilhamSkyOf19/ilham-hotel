import clsx from "clsx";
import { type FC } from "react";

// Props
type Props = {
  label: string;
  htmlFor: string;
  required: boolean;
  errorMessage?: string;
};

const LabelInput: FC<Props> = ({ label, htmlFor, required, errorMessage }) => {
  return (
    <div className="w-full flex flex-row justify-start items-center gap-8">
      {/* label */}
      <label
        htmlFor={htmlFor}
        className="text-black text-base capitalize relative"
      >
        {label}{" "}
        {required && (
          <span className="text-sm text-red-500 absolute top-0 -right-2.5">
            *
          </span>
        )}
      </label>

      {/* error message */}
      <p
        className={clsx(
          "text-red-500 text-xs font-light transition-opacity duration-200 ease-in-out",
          errorMessage ? "opacity-100" : "opacity-0"
        )}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default LabelInput;
