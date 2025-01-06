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
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
          alt="img"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUR7rkj15FnN8wgWVAG4lYDakHChVaxueQ4w&s"
          alt="img"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIT6F0D3eFRqeUZN25RatP1rIzLN1Qxa3sFg&s"
          alt="img"
          className="object-cover w-full h-full"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
