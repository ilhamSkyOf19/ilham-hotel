import clsx from "clsx";
import { type Dispatch, type FC, type SetStateAction } from "react";
import ErrorMessage from "../ErrorMessage";
import { FaCheck } from "react-icons/fa6";

type Props = {
  setIsAgree: Dispatch<SetStateAction<boolean>>;
  isAgree: boolean;
  errorAgree: boolean;
  setErrorAgree: Dispatch<SetStateAction<boolean>>;
};
const ButtonAgreement: FC<Props> = ({
  setIsAgree,
  isAgree,
  errorAgree,
  setErrorAgree,
}) => {
  return (
    <div className="w-[85vw] flex flex-col justify-start items-start gap-2">
      {/* button agreement */}
      <button
        type="button"
        className="flex flex-row justify-start items-center gap-3"
        onClick={() => {
          setIsAgree(!isAgree), setErrorAgree(false);
        }}
      >
        {/* box agreement */}
        <div
          className={clsx(
            "w-5 h-5 border rounded-sm flex flex-row justify-center items-center",
            errorAgree ? "border-red-500" : "border-primary-skyblue"
          )}
        >
          {isAgree && <FaCheck className="text-primary-skyblue" />}
        </div>

        {/* label */}
        <p className="text-black text-xs font-medium text-left">
          I agree to{" "}
          <span className="text-primary-skyblue font-semibold">Terms</span> and{" "}
          <span className="text-primary-skyblue font-semibold">Conditions</span>
        </p>
      </button>
      {/* error */}
      <ErrorMessage error={errorAgree ? "Please Check Agree" : ""} />
    </div>
  );
};

export default ButtonAgreement;
