import { type FC } from "react";

// Props
type Props = {
  label: string;
  type: "submit" | "button";
  handleNavigate?: () => void;
};
const ButtonAuth: FC<Props> = ({ type, label, handleNavigate }) => {
  return (
    <button
      type={type}
      onClick={handleNavigate}
      className="w-full bg-primary-skyblue font-bold text-white rounded-xl text-xl py-3"
    >
      {label}
    </button>
  );
};

export default ButtonAuth;
