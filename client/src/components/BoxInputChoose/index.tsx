import { useEffect, useState, type FC } from "react";
import LabelInput from "../LabelInput";
import clsx from "clsx";
import type { UseFormSetValue } from "react-hook-form";
import type {
  HotelCreateServiceRequestType,
  HotelUpdateServiceRequestType,
} from "../../models/hotel-model";
import { useQuery } from "@tanstack/react-query";
import { FasilitasService } from "../../services/fasilitas.service";

// Props
type Props = {
  setValue: UseFormSetValue<
    HotelCreateServiceRequestType | HotelUpdateServiceRequestType
  >;
  label: string;
  name: string;
  errorMessage?: string;
  defaultValue?: { _id: string; fasilitas: string }[];
};

const BoxInputChoose: FC<Props> = ({
  label,
  errorMessage,
  setValue,
  name,
  defaultValue,
}) => {
  // query fasilitas
  const { data: dataFasiltias, isLoading } = useQuery({
    queryKey: ["fasilitas"],
    queryFn: () => FasilitasService.readAll(),
  });

  // state choose fasilitas
  const [active, setActive] = useState<string[]>([]);

  // set active if default value existing
  useEffect(() => {
    if (defaultValue) {
      setActive(defaultValue.map((item) => item._id));
    }
  }, [defaultValue]);

  // handle choose fasilitas
  const handleChoose = (choose: { _id: string; fasilitas: string }) => {
    // cek existence
    setActive((prev) =>
      prev.includes(choose._id)
        ? prev.filter((id) => id !== choose._id)
        : [...prev, choose._id]
    );
  };

  // set value for fasilitas
  useEffect(() => {
    const time = setTimeout(() => {
      setValue(
        "fasilitas",
        active.map((item) => item)
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
        {isLoading ? (
          Array.from({ length: 14 }, (_, i) => (
            <div
              key={i}
              className="w-20 h-8 rounded-bl-full rounded-tr-full transition-all duration-300 ease-in-out bg-gray-200 animate-pulse"
            />
          ))
        ) : dataFasiltias?.data && dataFasiltias.data.length > 0 ? (
          dataFasiltias.data.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleChoose(item)}
              className={clsx(
                "px-8 py-2  rounded-bl-full rounded-tr-full transition-all duration-300 ease-in-out",
                active.includes(item._id)
                  ? "bg-primary-skyblue"
                  : "bg-gray-300/50"
              )}
            >
              <p
                className={clsx(
                  "text-base font-medium capitalize transition-colors duration-300 ease-in-out",
                  active.includes(item._id) ? "text-white" : "text-black"
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
