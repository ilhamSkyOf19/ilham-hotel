import { type FC, useState } from "react";
import TimeComponent from "../TimeComponent";
import { AuthService } from "../../services/auth.service";
import loadingBlack from "../../assets/animation/loading-black.svg";

type Props = {
  time: string;
  reset: () => void;
  resetTrigger: number;
};
const Resend: FC<Props> = ({ time, reset, resetTrigger }) => {
  // state disabled
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  // state loading
  const [loading, setLoading] = useState<boolean>(false);

  const handleResend = async () => {
    try {
      // set loading
      setLoading(true);

      // resend
      const response = await AuthService.resend();

      // cek response
      if (response) {
        console.log(response);
      }
      // reset
      reset();

      // set disabled
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
    } finally {
      // set loading
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center mt-4">
      <p className="text-black text-sm">Didn't receive the code?</p>

      {isDisabled ? (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-black text-sm font-semibold">Resend code in</p>
          {isDisabled && (
            <TimeComponent
              resetTrigger={resetTrigger}
              onFinished={() => setIsDisabled(false)}
              time={time}
            />
          )}
        </div>
      ) : (
        <button
          type="button"
          className="text-black text-base font-semibold mt-2"
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? (
            <img src={loadingBlack} alt="loading" className="w-6" />
          ) : (
            "Resend code"
          )}
        </button>
      )}
    </div>
  );
};

export default Resend;
