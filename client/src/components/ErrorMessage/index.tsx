import clsx from "clsx";
import { type FC } from "react";

// Props
type Props = {
  error?: string;
};
const ErrorMessage: FC<Props> = ({ error }) => {
  return (
    <div className="w-[85vw] h-4 flex flex-row justify-start items-start">
      <p
        className={clsx(
          "text-xs text-red-500 transition-opacity duration-300 ease-in-out",
          error ? "opacity-100" : "opacity-0"
        )}
      >
        {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
