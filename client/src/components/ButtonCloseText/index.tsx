import { type FC } from "react";

type Props = {
  handleClose: () => void;
};
const ButtonCloseText: FC<Props> = ({ handleClose }) => {
  return (
    <button
      type="button"
      onClick={handleClose}
      className="py-2 px-4 bg-gray-500/20 border border-gray-500 rounded-lg text-gray-500 text-xs font-semibold hover:bg-gray-500 hover:text-white transition-colors duration-300 ease-in-out"
    >
      close
    </button>
  );
};

export default ButtonCloseText;
