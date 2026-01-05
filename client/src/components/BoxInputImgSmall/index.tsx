import { useEffect, useRef, useState, type ChangeEvent, type FC } from "react";
import type { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { BiSolidImageAdd } from "react-icons/bi";
import { HiMiniTrash } from "react-icons/hi2";
import type {
  HotelCreateServiceRequestType,
  HotelUpdateServiceRequestType,
} from "../../models/hotel-model";
import LabelInput from "../LabelInput";
import clsx from "clsx";
import { generateUrlImg } from "../../utils/util";

// Props
type Props = {
  setValue: UseFormSetValue<
    HotelCreateServiceRequestType | HotelUpdateServiceRequestType
  >;
  errorMessage?: string;
  clearError?: UseFormClearErrors<
    HotelCreateServiceRequestType | HotelUpdateServiceRequestType
  >;
  defaultValue?: string;
};

const BoxInputImgSmall: FC<Props> = ({
  setValue,
  errorMessage,
  clearError,
  defaultValue,
}) => {
  // state preview
  const [preview, setPreview] = useState<string | null>(null);

  // update preview
  useEffect(() => {
    if (defaultValue) {
      setPreview(
        generateUrlImg({
          img: defaultValue ?? "",
          path: "galleries",
        })
      );
    }

    return;
  }, [defaultValue]);

  // use ref for input
  const refInput = useRef<HTMLInputElement>(null);

  // handle file change
  const handleFileChange = () => {
    refInput.current?.click();
  };

  //   handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // get file
    const file = e.target.files?.[0];

    // cek file
    if (file) {
      // get url
      setPreview(URL.createObjectURL(file));

      // set value thumbnail
      setValue("thumbnail", file);

      // clear error
      clearError?.("thumbnail");
    }
  };

  // handle remove img
  const handleReset = () => {
    // clear preview
    setPreview(null);

    // clear value thumbnail
    setValue("thumbnail", new File([], ""));
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      {/* label */}
      <LabelInput
        label="Thumbnail"
        htmlFor="thumbnail"
        required
        errorMessage={errorMessage}
      />

      {/* input file hidden */}
      <input
        ref={refInput}
        type="file"
        onChange={handleChange}
        hidden
        accept="image/jpeg,image/jpg,image/png,image/webp"
      />

      {/* content preview */}
      <div className="w-full h-auto flex flex-row justify-start items-center gap-6">
        {/* img */}
        <div
          className={clsx(
            "w-32 h-32 flex flex-col justify-center items-center bg-gray-300/50 rounded-xl overflow-hidden relative transition-all ease-in-out duration-100",
            errorMessage
              ? "shadow-[0px_2px_7px_0px_rgba(255,0,0,0.9)]"
              : "shadow-[0_2px_7px_0px_rgba(0,0,0,0.2)]   focus-within:shadow-[0px_2px_7px_0px_rgba(66,133,244,0.9)]"
          )}
        >
          {/* preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover absolute"
            />
          )}

          <button
            type="button"
            onClick={handleFileChange}
            className="w-full h-full bg-transparent flex flex-col justify-center items-center"
          >
            {/* icon */}
            <BiSolidImageAdd className="text-4xl text-gray-400" />
          </button>
        </div>

        {/* trash */}
        {preview && (
          <button
            type="button"
            onClick={handleReset}
            className="w-11.5 h-11.5 bg-red-500 flex flex-col justify-center items-center rounded-full"
          >
            {/* icon */}
            <HiMiniTrash className="text-2xl text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BoxInputImgSmall;
