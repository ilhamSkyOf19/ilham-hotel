import clsx from "clsx";
import { type FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  link?: string;
  linkFrom?: string;
  button?: boolean;
  handleClick?: () => void;
  blue?: boolean;
  label: string;
};
const ButtonAction: FC<Props> = ({
  blue,
  button,
  handleClick,
  link,
  linkFrom,
  label,
}) => {
  // navigate
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        button && handleClick
          ? handleClick()
          : link &&
            navigate(link, {
              state: { from: linkFrom },
            })
      }
      type="button"
      className={clsx(
        "h-12 w-full rounded-full relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-200 before:ease-in-out hover:before:opacity-100",
        !blue ? "bg-gray-100 text-black" : "bg-primary-skyblue text-white"
      )}
    >
      {label}
    </button>
  );
};

export default ButtonAction;
