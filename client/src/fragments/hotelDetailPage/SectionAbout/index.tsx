import { type FC } from "react";
import CardsFasilitas from "../../../components/CardsFasilitas";

type Props = {
  fasilitas: string[];
  description: string;
  loading: boolean;
};

const SectionAbout: FC<Props> = ({ fasilitas, loading, description }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start px-4 pt-5">
      {/* fasilitas */}
      <div className="w-full flex flex-col justify-start items-start gap-2">
        {/* header */}
        <h2 className="text-base font-medium">Fasilitas</h2>
        {/* content */}
        {loading ? (
          <div className="w-full grid grid-cols-3 gap-3 flex-wrap">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="col-span-1 h-7 flex flex-row justify-between items-start rouned-lg rounded-md bg-gray-200 px-2 py-1.5 shrink-0"
              ></div>
            ))}
          </div>
        ) : (
          <CardsFasilitas fasilitas={fasilitas} />
        )}
      </div>

      {/* description */}
      <div className="w-full flex flex-col justify-start items-start gap-2 mt-10">
        {/* header */}
        <h2 className="text-base font-medium">Description</h2>
        {/* content */}
        {loading ? (
          <div className="w-full flex flex-col justify-start items-start gap-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-11/12" />
            <div className="h-4 bg-gray-200 rounded w-10/12" />
            <div className="h-4 bg-gray-200 rounded w-9/12" />
          </div>
        ) : (
          <p className="w-full text-sm font-light">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SectionAbout;
