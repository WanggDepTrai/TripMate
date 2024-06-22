import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';

import { LazyLoadingImage } from '@components';
import start from '@assets/images/Star 5.png';
import { serviceApi } from '@configs';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@constants';

interface GuidItem {
   fullName: string;
   id: string;
   imageURL: string;
   languages: string;
   rating: number;
   status: string;
   totalTour: number;
}

export const BestGuide = () => {
   const { data, isLoading } = useQuery(['getListGuid'], async () => {
      const res = await serviceApi.request.get('/guides');
      return res.data;
   });
   return (
      <Swiper
         slidesPerView={5}
         spaceBetween={30}
         navigation={true}
         modules={[Navigation]}
         className="mySwiper rounded-md !mx-10"
      >
         {!isLoading &&
            data?.map((item: GuidItem) => {
               console.log(item);
               return (
                  <SwiperSlide className="pb-1 text-start" key={item.id}>
                     <Link to={ROUTE_PATH.CLIENT_GUIDE + '/' + item.id} className="rounded-xl overflow-hidden bg-[#EFEFEF] ">
                        <LazyLoadingImage width="300px" height="300px" src={item.imageURL} />

                        <div className="mt-5 px-3 pb-4">
                           <div className="flex items-center justify-between ">
                              <h6 className="text-[#BD4545] font-bold">{item.fullName}</h6>
                              <p className="text-[#78B28D] font-bold">{item.totalTour}</p>
                           </div>
                           <div className="mt-4 flex items-center gap-2">
                              {Array.from({ length: item.rating }, (item: number) => (
                                 <LazyLoadingImage src={start} width="16px" key={item} />
                              ))}
                           </div>
                        </div>
                     </Link>
                  </SwiperSlide>
               );
            })}
      </Swiper>
   );
};
