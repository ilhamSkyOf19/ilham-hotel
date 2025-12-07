import { type FC } from "react";

type Props = {
  id: string;
  active: boolean;
  handleCheck: (id: string) => void;
};
const ToggleSwitch: FC<Props> = ({ id, handleCheck, active }) => {
  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={active}
            onChange={() => handleCheck(id)}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              active ? "bg-primary-skyblue" : "bg-primary-gray"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              active ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default ToggleSwitch;
