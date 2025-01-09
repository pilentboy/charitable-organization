import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// import logo from "../../assets/images/logo.png";
import handleGetSliderSliders from "../../utils/api/content/handleGetSliderSliders";
import { useEffect, useState } from "react";

const Slider = () => {
  const [sliderContents, setSliderContents] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const req = await handleGetSliderSliders();
      console.log(req.status, req.data, "slider");
      setSliderContents(req.data);
    };
    getData();
  }, []);

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
      {sliderContents?.length > 0 ? (
        sliderContents.map((slider: any) => {
          console.log(slider.media);
          return (
            <SwiperSlide key={slider.id}>
              <img
                src={`https://nazronlinetest.liara.run${slider.media}`}
                alt={slider.alt_text}
                title={slider.alt_text}
                className="object-fill bg-black w-full h-full text-white"
              />
            </SwiperSlide>
          );
        })
      ) : (
        <SwiperSlide className="flex items-center justify-center w-full h-full bg-gray-400">
          <h1>درحال دریافت اطلاعات</h1>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default Slider;
