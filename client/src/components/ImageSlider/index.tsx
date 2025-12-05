import { useRef, useState, type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types"; // <- TypeScript type
import thumb1 from "../../assets/thumb/thumb-auth-1.webp";
import thumb2 from "../../assets/thumb/thumb-auth-2.webp";
import thumb3 from "../../assets/thumb/thumb-auth-3.webp";
import thumb4 from "../../assets/thumb/thumb-auth-4.webp";
import clsx from "clsx";
// import CSS Swiper
import "swiper/css";

const ImageSlider: FC = () => {
  // img
  const images: string[] = [thumb1, thumb2, thumb3, thumb4];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const swiperRef = useRef<SwiperType>(null);
  // const captions = [
  //   "Stay Here",
  //   "Enjoy our Pool",
  //   "Relax in Comfort",
  //   "Delicious Dining",
  // ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full md:h-96"
      >
        {images.map((src, idx) => (
          <SwiperSlide
            key={idx}
            className="flex justify-center items-center relative overflow-hidden"
          >
            {/* layer shadow  */}
            <div className="absolute w-full h-full bg-black z-20 opacity-35" />

            {/* title */}
            <h2 className="absolute z-20 top-15 left-6 text-white text-3xl opacity-70">
              My Hotel
            </h2>

            {/* caption */}
            <div className="absolute z-20 bottom-95 left-6 text-white text-2xl flex flex-col justify-start items-start gap-2.5">
              {/* caption 1 */}
              <h2 className="text-white text-4xl font-extrabold">Stay Here,</h2>
              <h2 className="text-white text-4xl font-extrabold">
                Enjoy Luxury
              </h2>
            </div>

            {/* thumb */}
            <img
              src={src}
              alt={`slide-${idx}`}
              className={clsx(
                "object-cover w-full h-full transition-all duration-16000 origin-center",
                idx === activeIndex ? "scale-125" : "scale-100"
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination - fixed di bawah center */}
      <div className="absolute bottom-70 left-6  flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${
              idx === activeIndex
                ? "bg-white border-white"
                : "bg-transparent border-white"
            }`}
            onClick={() => {
              setActiveIndex(idx), swiperRef.current?.slideToLoop(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
