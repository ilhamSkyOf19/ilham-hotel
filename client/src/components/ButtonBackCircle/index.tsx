import { type FC } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

type Props = {
  linkBack: string;
  from?: string;
};
const ButtonBackCircle: FC<Props> = ({ linkBack, from }) => {
  // navigate
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        if (from) {
          navigate(-1);
        } else {
          navigate(linkBack);
        }
      }}
      type="button"
      className="w-12 h-12 border border-black/20 flex flex-row justify-center items-center rounded-full absolute left-0"
    >
      <GoArrowLeft className="text-2xl text-black" />
    </button>
  );
};

export default ButtonBackCircle;
