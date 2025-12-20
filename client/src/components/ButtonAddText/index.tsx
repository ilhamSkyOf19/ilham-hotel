import { type FC } from "react";
import { Link } from "react-router";

type Props = {
  link: string;
};
const ButtonAddText: FC<Props> = ({ link }) => {
  return (
    <Link
      to={link}
      className="py-2 px-4 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-xs font-semibold hover:bg-green-500 hover:text-white transition-colors duration-300 ease-in-out"
    >
      add
    </Link>
  );
};

export default ButtonAddText;
