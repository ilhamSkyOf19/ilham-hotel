import { useEffect, useState, type FC, type ReactNode } from "react";
// import { useLoaderData } from "react-router";
// import type { ResponseType } from "../../utils/response-type";
// import type { HotelResponseType } from "../../models/hotel-model";
import hotelDummy from "../../assets/thumb/kamar-2.jpg";
import { BsArrowLeft } from "react-icons/bs";
import { IoShareSocialSharp } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { GalleryService } from "../../services/gallery.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { generateUrlImg } from "../../utils/util";
import { MdAddPhotoAlternate } from "react-icons/md";
import clsx from "clsx";

// array choose thumbnail
const arrayChooseThumb: number[] = [1, 2, 3, 4, 5];

const HotelDetailPage: FC = () => {
  // navigate
  const navigate = useNavigate();

  // state thumbnail active
  const [activeThumb, setActiveThumb] = useState<number>(0);

  // handle active thumb
  const handleActiveThumb = (index: number) => {
    setActiveThumb(index);
  };

  // // get data from use loader
  // const hotel = useLoaderData() as ResponseType<HotelResponseType | null>;

  // // debug
  // useEffect(() => {
  //   console.log(hotel);
  // }, [hotel]);

  // get params
  const { id: idHotel } = useParams<{ id: string }>();

  // use query
  const { data: galleries, isLoading } = useQuery({
    queryKey: ["galleryForThumbnail", idHotel],
    queryFn: () => GalleryService.readByIdHotel(idHotel!),
  });

  // debug
  useEffect(() => {
    console.log(galleries);

    const url = generateUrlImg({
      path: "galleries",
      img: galleries?.data?.images[0] ?? "",
    });

    console.log(url);
  }, [galleries]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* photo */}
      <div className="w-full h-[50vh] flex flex-col justify-start items-center relative">
        {/* img */}

        {isLoading ? (
          <div className="w-full h-full absolute bg-gray-200 animate-pulse" />
        ) : (
          galleries?.data &&
          galleries.data?.images.length > 0 && (
            <img
              src={generateUrlImg({
                path: "galleries",
                img: galleries?.data?.images[activeThumb] ?? "",
              })}
              alt="hotel"
              className="w-full h-full object-cover"
            />
          )
        )}

        {/* animation pulse */}

        {/* content */}
        <div className="w-full h-full absolute z-10 flex flex-col justify-between items-center px-4 py-6">
          {/* header */}
          <div className="w-full flex flex-row justify-between items-center">
            {/* icon back */}
            <div className="flex-1 flex flex-row justify-start items-center ">
              <ContainerButton handleBack={() => navigate(-1)}>
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
              {arrayChooseThumb.map((item, index) =>
                // cek index end
                item === 5 ? (
                  <CardButtonOtherthumb
                    idHotel={idHotel ?? ""}
                    key={item}
                    img={galleries?.data?.images[index]}
                  />
                ) : (
                  <CardChooseThumb
                    handleActiveThumb={() => handleActiveThumb(index)}
                    key={item}
                    img={galleries?.data?.images[index]}
                  />
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
  handleBack?: () => void;
};
const ContainerButton: FC<ContainerButtonProps> = ({
  children,
  handleBack,
}) => {
  return (
    <button
      onClick={() => handleBack && handleBack()}
      type="button"
      className="w-10 h-10 bg-white rounded-full flex flex-row justify-center items-center relative overflow-hidden before:transition-all before:duration-200 before:ease-in-out before:content-[] before:absolute before:w-full before:h-full before:bg-transparent hover:before:bg-black/30 group"
    >
      {children}
    </button>
  );
};

// card for choose thumbnail
type CardChooseThumbProps = {
  img?: string;
  handleActiveThumb: () => void;
};
const CardChooseThumb: FC<CardChooseThumbProps> = ({
  img,
  handleActiveThumb,
}) => {
  return (
    <button
      disabled={!img}
      onClick={() => handleActiveThumb()}
      className="flex-1 h-full rounded-xl relative overflow-hidden before:transition-all before:duration-200 before:ease-in-out before:content-[''] before:absolute before:inset-0 before:h-full before:bg-transparent hover:before:bg-black/40"
    >
      {img ? (
        <img
          src={generateUrlImg({
            path: "galleries",
            img: img,
          })}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={clsx("w-full h-full bg-gray-300", img ? "hidden" : "flex")}
        ></div>
      )}
    </button>
  );
};

// button other thumb
type CardButtonOtherthumbProps = {
  img?: string;
  idHotel: string;
};
const CardButtonOtherthumb: FC<CardButtonOtherthumbProps> = ({
  img,
  idHotel,
}) => {
  return (
    <button
      type="button"
      className="flex-1 h-full bg-gray-200 rounded-xl overflow-hidden relative"
    >
      {/* img */}
      {img ? (
        <>
          {/* overlay black */}
          <div className="w-full h-full absolute bg-black/60 z-10 flex flex-col justify-center items-center">
            <p className="text-base font-semibold text-white">
              <span className="ml-1">+</span> 10
            </p>
          </div>
          <img
            src={hotelDummy}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        </>
      ) : (
        <Link
          to={`/dashboard/hotel/detail/${idHotel}/add-gallery`}
          className="w-full h-full bg-gray-200 flex flex-col justify-center items-center"
        >
          <MdAddPhotoAlternate className="text-3xl text-gray-400" />
        </Link>
      )}
    </button>
  );
};

export default HotelDetailPage;
