import { useRef, useState, type ChangeEvent, type FC } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { HiMiniTrash } from "react-icons/hi2";

const BoxInputImgSmall: FC = () => {
  // state preview
  const [preview, setPreview] = useState<string | null>(null);

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
      const url = URL.createObjectURL(file);

      // set preview
      setPreview(url);
    }
  };

  //   //   cek preview
  //   useEffect(() => {
  //     console.log(preview);
  //   }, [preview]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-1.5">
      {/* label */}
      <label htmlFor="">Thumbnail</label>

      {/* input file hidden */}
      <input ref={refInput} type="file" onChange={handleChange} hidden />

      {/* content preview */}
      <div className="w-full h-auto flex flex-row justify-start items-center gap-6">
        {/* img */}
        <div className="w-32 h-32 flex flex-col justify-center items-center shadow-[0_2px_7px_0px_rgba(0,0,0,0.2)]  bg-gray-300/50 rounded-xl overflow-hidden relative">
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
        <button
          type="button"
          onClick={() => setPreview(null)}
          className="w-11.5 h-11.5 bg-red-500 flex flex-col justify-center items-center rounded-full"
        >
          {/* icon */}
          <HiMiniTrash className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default BoxInputImgSmall;
