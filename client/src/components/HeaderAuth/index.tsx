import { type FC } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

// props
type Props = {
  type: "login" | "register";
};

const HeaderAuth: FC<Props> = ({ type }) => {
  // navigate
  const navigate = useNavigate();

  return (
    <div className="w-full h-63 bg-primary-skyblue rounded-bl-[4rem] flex flex-col justify-start items-start px-6 py-4 gap-2 fixed top-0 z-50">
      {/* back & date */}
      <div className="w-full flex flex-row justify-between items-center">
        {/* back */}
        <button type="button" className="flex-1" onClick={() => navigate(-1)}>
          <FaArrowLeft className="text-4xl text-white" />
        </button>

        {/* date */}
        <div className="flex-1 flex flex-col justify-start items-end gap-2">
          {/* month */}
          <h2 className="text-4xl font-medium text-white">Marc</h2>
          {/* day */}
          <h2 className="text-3xl font-medium text-white">24</h2>
        </div>
      </div>

      {/* title */}
      <div className="w-full flex flex-col justify-start items-start gap-1">
        <h2 className="text-white font-semibold text-3xl">
          {type === "login" ? "Welcome" : "Create"}
        </h2>
        <h2 className="text-white font-semibold text-3xl">
          {type === "login" ? "Back!" : "Account."}
        </h2>

        {type === "login" && (
          <h4 className="text-white text-base">Continue your adventure.</h4>
        )}
      </div>
    </div>
  );
};

export default HeaderAuth;
