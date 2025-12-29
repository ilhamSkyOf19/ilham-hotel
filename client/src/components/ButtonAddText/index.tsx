import { type FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  link: string;
};
const ButtonAddText: FC<Props> = ({ link }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(link, { state: { from: link } })}
      className="py-2 px-4 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-xs font-semibold hover:bg-green-500 hover:text-white transition-colors duration-300 ease-in-out"
    >
      add
    </button>
  );
};

export default ButtonAddText;
