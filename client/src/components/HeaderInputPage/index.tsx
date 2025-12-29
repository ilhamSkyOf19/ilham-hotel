import clsx from "clsx";
import { type FC } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// props
type Props = {
  label: string;
  textFullColor?: boolean;
};

const HeaderInputPage: FC<Props> = ({ label, textFullColor }) => {
  // navigate
  const navigate = useNavigate();
  // destructure label
  const labels: string[] = label.split(" ");

  return (
    <div className="w-full flex flex-row justify-center items-start relative">
      {/* title */}
      <h1
        className={clsx(
          "w-1/2 text-center text-3xl font-semibold",
          textFullColor ? "text-primary-skyblue" : "text-black"
        )}
      >
        {labels[0] + " "}
        <span className="text-primary-skyblue">
          {labels.slice(1).join(" ")}
        </span>
      </h1>

      {/* arrow back */}
      <button
        type="button"
        className="absolute left-0"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="text-3xl text-primary-skyblue" />
      </button>
    </div>
  );
};

export default HeaderInputPage;
