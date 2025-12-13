import { type FC } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

// props
type Props = {
  label: string;
};

const HeaderInputPage: FC<Props> = ({ label }) => {
  // navigate
  const navigate = useNavigate();

  // destructure label
  const labels: string[] = label.split(" ");

  return (
    <div className="w-full flex flex-row justify-center items-center relative">
      {/* title */}
      <h1 className="w-1/2 text-center text-3xl font-semibold">
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
