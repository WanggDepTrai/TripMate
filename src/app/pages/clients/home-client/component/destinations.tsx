import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { LazyLoadingImage } from '@components';

const images = [
   'https://puluongexcursions.com/wp-content/uploads/2023/06/5214486810_49ccd5c42f_z-1.jpg',
   'https://owa.bestprice.vn/images/articles/uploads/10-dia-diem-du-lich-thanh-pho-ho-chi-minh-noi-tieng-nhat-5fa0368821cf5.jpg',
   'https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/04/23111235/nhung-dia-diem-vui-choi-o-sai-gon.jpg',
   'https://auto365.vn/uploads/upload/images/2022/03/28/dinh-doc-lap.jpg',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSPfqcJP75DTdrIkDP4vjx4igit2ponMVsOg&s',
   'https://cdn.tgdd.vn/Files/2020/09/01/1286001/10-dia-diem-vui-choi-2-9-o-tphcm-cuc-hap-dan-ma-ban-khong-the-bo-qua-202009011426525667.jpg',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKx6RXWbLoQHShm_VBLg42nxcMji6KhhPqQQ&s',
];

export const Destinations = () => {
   return (
      <Swiper
         slidesPerView={5}
         spaceBetween={15}
         navigation={true}
         modules={[Navigation]}
         className="mySwiper rounded-md !mx-10"
      >
         {images.map((item, index) => {
            return (
               <SwiperSlide className="pb-1 text-start !h-[350px] " key={index}>
                  <LazyLoadingImage className="rounded-xl w-full h-full" src={item} />
               </SwiperSlide>
            );
         })}
      </Swiper>
   );
};
