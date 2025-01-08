import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import logo from "../../assets/images/logo.png";
import handleGetSliderSliders from "../../utils/api/content/handleGetSliderSliders";
import { useEffect, useState } from "react";

const Slider = () => {
  const [sliderContents, setSliderContents] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const req = await handleGetSliderSliders();
      console.log(req.status, req.data, "slider");
      setSliderContents(req.status);
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
      <SwiperSlide>
        <img
          src={logo}
          alt="img"
          className="object-fill bg-black w-full h-full"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
