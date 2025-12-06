import { type FC, useState } from "react";
import TimeComponent from "../TimeComponent";

const Resend: FC = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleResend = () => {
    setIsDisabled(true);
    setResetTrigger((prev) => prev + 1); // trigger reset timer
  };

  return (
    <div className="w-full flex flex-col justify-start items-center mt-4">
      <p className="text-black text-sm">Didn't receive the code?</p>

      {isDisabled ? (
        <>
          <p className="text-black text-sm font-semibold">Resend code in</p>
          <TimeComponent
            onFinished={() => setIsDisabled(false)}
            resetTrigger={resetTrigger}
          />
        </>
      ) : (
        <button
          type="button"
          className="text-black underline text-sm font-semibold"
          onClick={handleResend}
        >
          Resend code
        </button>
      )}
    </div>
  );
};

export default Resend;
