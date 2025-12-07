import { type FC } from "react";
type Props = {
  handleCheckbox: () => void;
  label: string;
  checked: boolean;
};
const InputCheckbox: FC<Props> = ({ handleCheckbox, label, checked }) => {
  return (
    <button
      type="button"
      onClick={handleCheckbox}
      className="w-full flex flex-row justify-start items-center gap-2"
    >
      {/* checkbox */}
      <div className="w-5.5 h-5.5 border border-primary-skyblue rounded-md overflow-hidden flex flex-row justify-center items-center">
        {checked && (
          <div className=" w-3.5 h-3.5 bg-primary-skyblue rounded-sm" />
        )}
      </div>

      {/* label */}
      <p className="text-black text-sm ">{label}</p>
    </button>
  );
};

export default InputCheckbox;
