import { useEffect, useState, type FC } from "react";
import LabelInput from "../LabelInput";
import clsx from "clsx";
import type { UseFormSetValue } from "react-hook-form";
import type { HotelCreateServiceRequestType } from "../../models/hotel-model";

// Props
type Props = {
  setValue: UseFormSetValue<HotelCreateServiceRequestType>;
  chooseList: { _id: string; fasilitas: string }[];
  label: string;
  name: string;
  errorMessage?: string;
};

const BoxInputChoose: FC<Props> = ({
  label,
  errorMessage,
  chooseList,
  setValue,
  name,
}) => {
  // state choose fasilitas
  const [active, setActive] = useState<{ _id: string; fasilitas: string }[]>(
    []
  );

  // handle choose fasilitas
  const handleChoose = (choose: { _id: string; fasilitas: string }) => {
    // cek existence
    if (active.includes(choose)) {
      setActive((prev) => prev.filter((item) => item !== choose));
    } else {
      setActive((prev) => [...prev, choose]);
    }
  };

  // set value for fasilitas
  useEffect(() => {
    const time = setTimeout(() => {
      setValue(
        "fasilitas",
        active.map((item) => item._id)
      );
    }, 500);

    return () => clearTimeout(time);
  }, [active]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      {/* label */}
      <LabelInput
        label={label}
        htmlFor={name}
        required
        errorMessage={errorMessage}
      />

      {/* container choose */}
      <div className="w-full flex flex-row justify-start items-start gap-3 flex-wrap">
        {/* choose */}
        {chooseList && chooseList.length > 0 ? (
          chooseList.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleChoose(item)}
              className={clsx(
                "px-8 py-2  rounded-bl-full rounded-tr-full transition-all duration-300 ease-in-out",
                active.includes(item) ? "bg-primary-skyblue" : "bg-gray-300/50"
              )}
            >
              <p
                className={clsx(
                  "text-base font-medium capitalize transition-colors duration-300 ease-in-out",
                  active.includes(item) ? "text-white" : "text-black"
                )}
              >
                {item.fasilitas}
              </p>
            </button>
          ))
        ) : (
          <p className="text-black text-sm capitalize">- no choice -</p>
        )}
      </div>
    </div>
  );
};

export default BoxInputChoose;
