import clsx from "clsx";
import { type FC } from "react";

type Props = {
  label: string;
  type?: "textarea";
};
const LoadingInputAbstrakPulse: FC<Props> = ({ label, type }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <p className="text-black text-base capitalize relative">
        {label}
        <span className="text-sm text-red-500 absolute top-0 -right-2.5">
          *
        </span>
      </p>
      <div
        className={clsx(
          "w-full flex flex-row justify-start items-center bg-gray-200 transition-all ease-in-out duration-100 animate-pulse",
          type === "textarea"
            ? "h-42 rounded-bl-[4rem] rounded-tr-[4rem]"
            : "h-12 rounded-bl-full rounded-tr-full"
        )}
      />
    </div>
  );
};

export default LoadingInputAbstrakPulse;
