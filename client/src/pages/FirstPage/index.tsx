import { type FC } from "react";
import { Helmet } from "react-helmet-async";
import ImageSlider from "../../components/ImageSlider";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import ButtonAuth from "../../components/ButtonSubmitBox";

const FirstPage: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Hotel Bintang 3 di Jakarta Pusat | Booking Mudah & Murah</title>
        <meta
          name="description"
          content="Selamat datang di Hotel Bintang 3 Jakarta Pusat. Nikmati pengalaman menginap nyaman dengan fasilitas lengkap dan lokasi strategis. Pesan kamar sekarang!"
        />
        <meta name="robots" content="index, follow" />
        {/* Open Graph untuk share di sosial media */}
        <meta property="og:title" content="Hotel Bintang 3 di Jakarta Pusat" />
        <meta
          property="og:description"
          content="Nikmati pengalaman menginap nyaman dengan fasilitas lengkap dan lokasi strategis. Booking mudah dan cepat!"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="w-screen h-screen relative flex flex-col justify-start items-start">
        {/* thumbnail */}
        <ImageSlider />

        {/* content */}
        <div className="w-full h-65 absolute bottom-0 z-40 bg-white rounded-tr-[5rem] flex flex-col justify-start items-start py-6 px-6 gap-8">
          {/* caption */}
          <h1 className="text-xl text-black font-bold">
            The best place to relax & enjoy memorable moments.
          </h1>

          {/* button sign in */}
          <ButtonAuth
            type="submit"
            label="Sign In"
            handleNavigate={() => navigate("/login")}
          />

          {/* button information for create account */}
          <div className="w-full flex flex-row justify-end items-center">
            <Link
              to={"/register"}
              className="w-full flex flex-row justify-end items-center gap-2"
            >
              <p className="font-bold text-black text-base">
                Or Create Account
              </p>

              {/* icon arrow right */}
              <HiArrowLongRight className="text-black text-4xl" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstPage;
