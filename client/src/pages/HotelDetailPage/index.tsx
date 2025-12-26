import { useEffect, type FC, type ReactNode } from "react";
// import { useLoaderData } from "react-router";
// import type { ResponseType } from "../../utils/response-type";
// import type { HotelResponseType } from "../../models/hotel-model";
import hotelDummy from "../../assets/thumb/kamar-2.jpg";
import { BsArrowLeft } from "react-icons/bs";
import { IoShareSocialSharp } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";

// array choose thumbnail
const arrayChooseThumb: number[] = [1, 2, 3, 4, 5];

const HotelDetailPage: FC = () => {
  // // get data from use loader
  // const hotel = useLoaderData() as ResponseType<HotelResponseType | null>;

  // // debug
  // useEffect(() => {
  //   console.log(hotel);
  // }, [hotel]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* photo */}
      <div className="w-full h-[50vh] flex flex-col justify-start items-center relative">
        {/* img */}
        <img
          src={hotelDummy}
          alt="hotel"
          className="w-full h-full object-cover"
        />

        {/* content */}
        <div className="w-full h-full absolute z-10 flex flex-col justify-between items-center px-4 py-6">
          {/* header */}
          <div className="w-full flex flex-row justify-between items-center">
            {/* icon back */}
            <div className="flex-1 flex flex-row justify-start items-center ">
              <ContainerButton>
                <BsArrowLeft className="text-xl" />
              </ContainerButton>
            </div>

            {/* icon share & favorite */}
            <div className="flex-1 flex flex-row justify-end items-center gap-4">
              {/* share */}
              <ContainerButton>
                <IoShareSocialSharp className="text-xl text-primary-skyblue" />
              </ContainerButton>
              {/* favorite */}
              <ContainerButton>
                <GrFavorite className="text-xl text-primary-skyblue" />
              </ContainerButton>
            </div>
          </div>

          {/* navigation img */}
          <div className="w-full flex flex-row justify-start items-center">
            <div className="w-full h-[11vh] bg-white rounded-xl px-2 py-1 flex flex-row justify-start items-center gap-1.5">
              {/* card choose img */}
              {arrayChooseThumb.map((item, _) =>
                // cek index end
                item === 5 ? (
                  <CardButtonOtherthumb key={item} />
                ) : (
                  <CardChooseThumb key={item} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// container button
type ContainerButtonProps = {
  children: ReactNode;
};
const ContainerButton: FC<ContainerButtonProps> = ({ children }) => {
  return (
    <button
      type="button"
      className="w-10 h-10 bg-white rounded-full flex flex-row justify-center items-center relative overflow-hidden before:transition-all before:duration-200 before:ease-in-out before:content-[] before:absolute before:w-full before:h-full before:bg-transparent hover:before:bg-black/30 group"
    >
      {children}
    </button>
  );
};

// card for choose thumbnail
const CardChooseThumb: FC = () => {
  return (
    <div className="flex-1 h-full rounded-xl relative overflow-hidden before:transition-all before:duration-200 before:ease-in-out before:content-[] before:absolute before:w-full before:h-full before:bg-transparent hover:before:bg-black/40">
      <img
        src={hotelDummy}
        alt="thumbnail"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// button other thumb
const CardButtonOtherthumb: FC = () => {
  return (
    <button
      type="button"
      className="flex-1 h-full bg-black rounded-xl overflow-hidden relative"
    >
      {/* overlay black */}
      <div className="w-full h-full absolute bg-black/60 z-10 flex flex-col justify-center items-center">
        <p className="text-base font-semibold text-white">
          <span className="ml-1">+</span> 10
        </p>
      </div>

      {/* img */}
      <img
        src={hotelDummy}
        alt="thumbnail"
        className="w-full h-full object-cover"
      />
    </button>
  );
};

export default HotelDetailPage;
