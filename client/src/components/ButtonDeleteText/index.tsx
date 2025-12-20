import { type FC } from "react";

type Props = {
  handleDelete: () => void;
};
const ButtonDeleteText: FC<Props> = ({ handleDelete }) => {
  return (
    <button
      type="button"
      onClick={handleDelete}
      className="py-2 px-4 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out"
    >
      delete
    </button>
  );
};

export default ButtonDeleteText;
