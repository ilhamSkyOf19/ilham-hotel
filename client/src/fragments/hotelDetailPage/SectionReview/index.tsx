import { useState, type FC } from "react";
import { PiSlidersHorizontal } from "react-icons/pi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { getStars } from "../../../utils/util";
import peopleDumy from "../../../assets/people/people.jpg";
import clsx from "clsx";

const filter: string[] = ["verified", "latest", "with photos"];

const SectionReview: FC = () => {
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
        <CardReview />
        <CardReview />
        <CardReview />
        <CardReview />
        <CardReview />
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

// card review
const CardReview: FC = () => {
  // inisialisasi get stars
  const stars: {
    bintangPenuh: number;
    bintangSetengah: boolean;
    bintangKosong: number;
  } = getStars(4.8);

  return (
    <div className="w-full flex flex-col justify-start items-start px-5 py-4 gap-2 bg-white shadow-[0px_2px_7px_rgba(0,0,0,0.25)] rounded-xl">
      {/* profile */}
      <div className="w-full flex flex-row justify-start items-start gap-3">
        {/* photo */}
        <div className="w-13 h-13 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={peopleDumy}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-start items-start">
          {/* name */}
          <p className="text-base font-medium capitalize">Robert Kuilvert</p>

          {/* title */}
          <p className="text-sm font-light text-gray-500 capitalize pt-0.5">
            New Guest
          </p>
        </div>
      </div>

      {/* review */}
      <p className="text-sm text-black">
        Hotel nyaman bersih pelayanan ramah fasilitas lengkap booking mudah
        harga sesuai kualitas kamar rapi staf profesional pengalaman menginap
        menyenangkan direkomendasikan.
      </p>

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

export default SectionReview;
