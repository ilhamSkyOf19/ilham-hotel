import { type FC } from "react";
import { FaLocationDot } from "react-icons/fa6";

type Props = {
  address: string;
};
const LocationGray: FC<Props> = ({ address }) => {
  return (
    <div className="w-full flex flex-row justify-start items-center gap-1 mt-1">
      {/* icon location */}
      <FaLocationDot className="text-lg text-gray-400" />

      {/* address */}
      <h2 className="text-sm font-medium text-gray-400">{address}</h2>
    </div>
  );
};

export default LocationGray;
