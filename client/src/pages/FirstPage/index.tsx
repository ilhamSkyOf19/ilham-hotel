import { type FC } from "react";
import ImageSlider from "../../components/ImageSlider";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router";
import ButtonAuth from "../../components/ButtonAuth";

const FirstPage: FC = () => {
  // navigate
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen relative flex flex-col justify-start items-start ">
      {/* thumbnail */}
      <ImageSlider />

      {/* content */}
      <div className="w-full h-65 absolute bottom-0 z-40 bg-white rounded-tr-[5rem] flex flex-col justify-start items-start py-6 px-6 gap-8">
        {/* caption */}
        <h2 className="text-xl text-black font-bold">
          The best place to relax & enjoy memorable moments.
        </h2>

        {/* button sign in */}
        <ButtonAuth
          type="submit"
          label="sign in"
          handleNavigate={() => navigate("/login")}
        />

        {/* button information for create account */}
        <div className="w-full flex flex-row justify-end items-center">
          <Link
            to={"/register"}
            className="w-full flex flex-row justify-end items-center gap-2"
          >
            <p className="font-bold text-black text-base">Or Create Account</p>

            {/* icon arrow right */}
            <HiArrowLongRight className="text-black text-4xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
