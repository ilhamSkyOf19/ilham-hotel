import { type FC } from "react";
import loadingWhite from "../../assets/animation/loading-white.svg";
// Props
type Props = {
  label: string;
  type: "submit" | "button";
  handleNavigate?: () => void;
  loading?: boolean;
};
const ButtonAuth: FC<Props> = ({ type, label, handleNavigate, loading }) => {
  return (
    <button
      type={type}
      onClick={handleNavigate}
      className="w-full bg-primary-skyblue font-bold text-white rounded-xl text-xl py-3 capitalize h-14 flex flex-row justify-center items-center"
    >
      {loading ? (
        <img src={loadingWhite} alt="loading" className="w-9" />
      ) : (
        label
      )}
    </button>
  );
};

export default ButtonAuth;
