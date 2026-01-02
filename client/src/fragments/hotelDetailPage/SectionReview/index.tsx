import { useState, type FC } from "react";
import { PiSlidersHorizontal } from "react-icons/pi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { getStars } from "../../../utils/util";

import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { ReviewService } from "../../../services/review.service";
import loadingBlue from "../../../assets/animation/loading-blue.svg";
import ComponentAvatarCircle from "../../../components/ComponentAvatarCircle";

const filter: string[] = ["verified", "latest", "with photos"];

type Props = {
  idHotel: string;
};

const SectionReview: FC<Props> = ({ idHotel }) => {
  // state choose filter
  const [chooseFilter, setChooseFilter] = useState<string[]>([]);

  // handle choose filter
  const handleChooseFilter = (choose: string) => {
    if (chooseFilter.includes(choose)) {
      setChooseFilter((prev) => prev.filter((item) => item !== choose));
    } else {
      setChooseFilter((prev) => [...prev, choose]);
    }
  };

  // query reviews
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["review", "readAllByIdHote", idHotel],
    queryFn: () => ReviewService.readAllByIdHotel(idHotel),
  });

  return (
    <div className="w-full flex flex-col justify-start items-start pt-5">
      {/* header */}
      <h1 className="text-base font-medium px-4">Reviews</h1>
      {/* filter */}
      <div className="w-full relative before:content-[''] before:absolute before:left-0 before:right-0 before:h-[0.5px] before:bg-black/10 before:bottom-0">
        <div className="w-full py-4 px-4 flex flex-row justify-start items-center overflow-x-scroll gap-3">
          {/* card filter */}
          <ButtonFilter />

          {/* button choose filter */}
          {filter.map((item, index) => (
            <ButtonChooseFilter
              key={index}
              label={item}
              active={chooseFilter.includes(item)}
              handleChoose={() => handleChooseFilter(item)}
            />
          ))}
        </div>
      </div>

      {/* list review */}
      <div className="w-full flex flex-col justify-start items-start gap-6 px-4 mt-8">
        {/* card review */}
        {isLoading ? (
          Array.from({ length: 2 }, (_, i) => <LoadingCard key={i} />)
        ) : reviews?.data && reviews.data?.length > 0 ? (
          reviews.data.map((item, index) => (
            <CardReview
              key={index}
              fullName={item.user.fullName}
              review={item.review}
              rating={item.rating}
              title={item.user.title}
              avatar={item.user.avatar}
            />
          ))
        ) : (
          <div className="w-full flex flex-row justify-center items-center">
            <p className="text-sm text-primary-skyblue">Tidak ada review</p>
          </div>
        )}
      </div>
    </div>
  );
};

// button filter
const ButtonFilter: FC = () => {
  return (
    <button
      type="button"
      className="py-2.5 px-4.5 flex flex-row justify-start items-start gap-1.5 bg-gray-100 rounded-full"
    >
      <PiSlidersHorizontal className="text-lg text-black" />

      <p className="text-sm text-black">Filter</p>
    </button>
  );
};

// button filter
type ButtonChooseFilterProps = {
  label: string;
  active: boolean;
  handleChoose: () => void;
};
const ButtonChooseFilter: FC<ButtonChooseFilterProps> = ({
  label,
  active,
  handleChoose,
}) => {
  return (
    <button
      type="button"
      onClick={() => handleChoose()}
      className={clsx(
        "py-2.5 px-6 flex flex-row justify-start items-start gap-1.5 rounded-full shrink-0 transition-all duration-200 ease-in-out capitalize text-sm",
        active ? "bg-gray-400 text-white" : "text-black bg-gray-100"
      )}
    >
      {label}
    </button>
  );
};

// card reviewt
type CardReviewProps = {
  fullName: string;
  title: "BEGINNER" | "REGULAR" | "VERIFIED";
  review: string;
  rating: number;
  avatar: string;
};
const CardReview: FC<CardReviewProps> = ({
  fullName,
  rating,
  review,
  title,
  avatar,
}) => {
  // inisialisasi get stars
  const stars: {
    bintangPenuh: number;
    bintangSetengah: boolean;
    bintangKosong: number;
  } = getStars(rating);

  return (
    <div className="w-full flex flex-col justify-start items-start px-5 py-4 gap-2 bg-white shadow-[0px_2px_7px_rgba(0,0,0,0.25)] rounded-xl">
      {/* profile */}
      <div className="w-full flex flex-row justify-start items-start gap-3">
        {/* photo */}
        <ComponentAvatarCircle img={avatar} title={title} />

        {/* label */}
        <div className="flex flex-col justify-start items-start">
          {/* name */}
          <p className="text-base font-medium capitalize">{fullName}</p>

          {/* title */}
          <p className="text-sm font-light text-gray-500 capitalize pt-0.5 -mt-1">
            {title.toLowerCase()}
          </p>
        </div>
      </div>

      {/* review */}
      <p className="text-sm text-black mt-2">{review}</p>

      {/* ratings */}
      <div className="w-full flex flex-row justify-start items-start gap-1">
        {/* full stars */}
        {Array.from({ length: stars.bintangPenuh }, (_, i) => (
          <FaStar key={i} className="text-base text-yellow-400" />
        ))}

        {/* bintang setengah jika ada */}
        {stars.bintangSetengah && (
          <FaStarHalfAlt className="text-base text-yellow-400" />
        )}

        {/* empty stars */}
        {Array.from({ length: stars.bintangKosong }, (_, i) => (
          <FaRegStar key={i} className="text-base text-yellow-400" />
        ))}
      </div>
    </div>
  );
};

// loading card
const LoadingCard: FC = () => {
  return (
    <div className="w-full h-50 bg-white shadow-[0px_2px_7px_rgba(0,0,0,0.25)] px-5 py-4 gap-2 rounded-xl animate-pulse mt-4 flex flex-col justify-start items-start">
      <div className="w-full flex flex-row justify-start items-start gap-3">
        <div className="w-11 h-11 bg-gray-200 rounded-full" />
        <div className=" flex flex-col justify-start items-start gap-1.5">
          <div className="w-42 h-4 bg-gray-200 rounded-sm" />
          <div className="w-18 h-4 bg-gray-200" />
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-2 mt-3 ">
        <div className="w-full h-4 bg-gray-200 rounded-sm" />
        <div className="w-[70%] h-4 bg-gray-200 rounded-sm" />
      </div>
      <div className="w-[40%] h-4 bg-gray-200 rounded-sm mt-4" />
    </div>
  );
};

export default SectionReview;
