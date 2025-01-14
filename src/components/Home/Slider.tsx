import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import handleGetHomeSliderContent from "../../utils/api/content/handleGetHomeSliderContent";
import { useEffect, useState } from "react";

const Slider = () => {
  const [sliderContents, setSliderContents] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const req = await handleGetHomeSliderContent();
      setSliderContents(req.data);
    };
    getData();
  }, []);

  if (sliderContents?.length > 0) {
    return (
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        // pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full  rounded-2xl h-[200px] sm:h-[300px] lg:h-[480px] "
      >
        {sliderContents.map((slider: any) => {
          return (
            <SwiperSlide key={slider.id} className="relative">
              <img
                src={`https://nazronline.ir/${slider.media}`}
                alt={slider.alt_text}
                title={slider.display_text}
                className=" object-fill bg-black w-full h-full text-white"
              />
              {/* <span className="text-white absolute bottom-2 font-bold left-1/2 translate-x-[-50%]">
                متن تستی
              </span> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }
};

export default Slider;
