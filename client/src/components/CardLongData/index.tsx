import { type FC } from "react";
import ButtonDeleteText from "../ButtonDeleteText";
import ButtonUpdateText from "../ButtonUpdateText";

// Props
type Props = {
  id: string;
  label: string;
  linkUpdate: string;
  handleDelete: () => void;
};

const CardLongData: FC<Props> = ({ id, label, linkUpdate, handleDelete }) => {
  return (
    <div className="w-full py-2.5 bg-white shadow-[0px_2px_7px_0px_rgba(0,0,0,0.2)] rounded-lg flex flex-row justify-start items-center px-4">
      {/* label */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-black capitalize">{label}</p>
      </div>

      {/* button action */}
      <div className="flex-1 flex flex-row justify-end items-center gap-2">
        {/* button delete */}
        <ButtonDeleteText handleDelete={() => handleDelete()} />

        {/* button update */}
        <ButtonUpdateText linkUpdate={linkUpdate} id={id} />
      </div>
    </div>
  );
};

export default CardLongData;
