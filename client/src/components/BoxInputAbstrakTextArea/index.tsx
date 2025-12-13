import { type FC } from "react";

const BoxInputAbstrakTextArea: FC = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1.5">
      {/* label */}
      <div className="w-full flex flex-row justify-start items-center gap-8">
        {/* label */}
        <label
          htmlFor="name"
          className="text-black text-base capitalize relative"
        >
          description{" "}
          <span className="text-sm text-red-500 absolute top-0 -right-2.5">
            *
          </span>
        </label>

        {/* error message */}
        <p className="text-red-500 text-xs font-light">name hotel not valid</p>
      </div>

      {/* box input */}
      <div className="w-full flex flex-row justify-start items-center bg-gray-300/50 rounded-bl-[4rem] rounded-tr-[4rem]  transition-all ease-in-out duration-300 focus-within:shadow-[0px_2px_7px_0px_rgba(66,133,244,0.9)] shadow-[0px_2px_7px_0px_rgba(0,0,0,0.2)]">
        <textarea
          rows={10}
          placeholder="Enter your name"
          className="py-3 px-10 w-full bg-transparent border-none outline-none text-black text-sm font-medium placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal"
        />
      </div>
    </div>
  );
};

export default BoxInputAbstrakTextArea;
