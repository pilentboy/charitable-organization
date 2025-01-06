import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="w-full  rounded-2xl h-[200px] sm:h-[300px] lg:h-[480px] bg-slate-700"
    >
      <SwiperSlide>
        <img
          src="https://www.jowhareh.com/images/Jowhareh/galleries/poster_52ec8369-3d40-4e95-b991-63e1733bbf48.jpeg"
          alt="img"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://cdn.nody.ir/files/2024/07/22/nody-%D8%B9%DA%A9%D8%B3-%D8%B7%D8%A8%DB%8C%D8%B9%D8%AA-%D8%B2%DB%8C%D8%A8%D8%A7-%D9%81%D9%88%D9%84-%D8%A7%DA%86-%D8%AF%DB%8C-1721630415.jpg"
          alt="img"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://asdownload.net/wallpaper/web/wallpapers/431/3840x2160.jpg"
          alt="img"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
