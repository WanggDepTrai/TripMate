import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { LazyLoadingImage } from '@components';

export const Destinations = () => {
   return (
      <Swiper
         slidesPerView={5}
         spaceBetween={15}
         navigation={true}
         modules={[Navigation]}
         className="mySwiper rounded-md !mx-10"
      >
         <SwiperSlide className="pb-1 text-start !h-[350px] ">
            <LazyLoadingImage className="rounded-xl w-full h-full" src="https://i.ibb.co/5rZd4c3/guide4.jpg" />
         </SwiperSlide>
         <SwiperSlide className="pb-1 text-start !h-[350px]">
            <LazyLoadingImage className="rounded-xl w-full h-full" src="https://i.ibb.co/Kw4ydkB/guide3.jpg" />
         </SwiperSlide>
         <SwiperSlide className="pb-1 text-start !h-[350px]">
            <LazyLoadingImage className="rounded-xl w-full h-full" src="https://i.ibb.co/hfcYH5y/guide2.jpg" />
         </SwiperSlide>
         <SwiperSlide className="pb-1 text-start !h-[350px]">
            <LazyLoadingImage className="rounded-xl w-full h-full" src="https://i.ibb.co/jkB56rb/guide1.jpg" />
         </SwiperSlide>
         <SwiperSlide className="pb-1 text-start !h-[350px]">
            <LazyLoadingImage className="rounded-xl w-full h-full" src="https://i.ibb.co/932TgFQ/guide5.jpg" />
         </SwiperSlide>
      </Swiper>
   );
};
