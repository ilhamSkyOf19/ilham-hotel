import { type FC } from "react";
import { Link } from "react-router";

// Props
type Props = {
  linkUpdate: string;
  id: string;
};
const ButtonUpdateText: FC<Props> = ({ linkUpdate, id }) => {
  return (
    <Link
      to={`${linkUpdate}/${id}`}
      className="py-2 px-4 bg-blue-500/20 border border-blue-500 rounded-lg text-blue-500 text-xs font-semibold hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
    >
      update
    </Link>
  );
};

export default ButtonUpdateText;
