import { images } from '@assets/images';
import languages from './i18n';
import { LanguageSystem, LazyLoadingImage, PaginatedItems } from '@components';
import { ROUTE_PATH } from '@constants';
import { SvgIcon } from '@helpers';
import { useI18n, useSearchParamsHook } from '@hooks';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { serviceApi } from '@configs';
import BookingGiude from './component/booking-giude';

export interface GuidItem {
   fullName: string;
   id: string;
   imageURL: string;
   languages: string;
   rating: number;
   status: string;
   totalTour: number;
}

export const Guide = () => {
   const translate = useI18n(languages);
   const { searchParams } = useSearchParamsHook();

   const { data } = useQuery(['getGuildPagination', searchParams['page']], async () => {
      const page = searchParams['page'] ? String(searchParams['page']) : '1';

      const res = await serviceApi.request.get('guides-pagination?pageNumber=' + page);
      return res.data;
   });

   return (
      <div className="bg-[#f0d171]">
         <div className="-mt-[58px] relative mb-20">
            <LazyLoadingImage src={images.guideBanner} />
            <div className="absolute bottom-0 left-1/2 -translate-x-[50%] translate-y-[50%] bg-white rounded-2xl  pl-8 ">
               <div className="grid grid-cols-3 ">
                  <div className="col-span-1 flex gap-4 border border-transparent border-r border-r-[#00000033] py-4 pr-8">
                     <SvgIcon name="destination" />
                     <div className="w-[200px]">
                        <p className="text-[#6D1950]  text-2xl font-bold ">{translate('Destinations')}</p>
                        <select name="" id="" className="mt-2 w-full">
                           <option value="">District 9</option>
                        </select>
                     </div>
                  </div>
                  <div className="col-span-2 flex gap-4 pl-4 ">
                     <div className="flex-1 flex py-4 ">
                        <SvgIcon name="language" width={63} />
                        <div className="">
                           <p className="text-[#6D1950]  text-2xl font-bold">{translate('Language')}</p>
                           <div className="mt-2 flex justify-end">
                              <LanguageSystem />
                           </div>
                        </div>
                     </div>
                     <div className="bg-[#78B28D] flex flex-col items-center justify-center rounded-2xl px-8">
                        <SvgIcon name="find-guide" width={63} />
                        <p className="text-[#6D1950] font-bold">Find Guide</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container px-3 py-4 bg-[#FDF9ED] rounded-2xl ">
            <h3 className="text-[#BD4545] text-3xl font-bold text-center py-3">Guides</h3>
            <div className="">
               <div className="grid grid-cols-4 gap-2">
                  {data &&
                     data?.items?.map((item: GuidItem) => {
                        return (
                           <div className="col-span-1 bg-[#F0D171] py-4 rounded-2xl" key={item.id}>
                              <div className="flex items-center flex-col justify-center">
                                 <LazyLoadingImage
                                    src={item.imageURL || images.noImage}
                                    width="100px"
                                    className="rounded-full"
                                 />
                                 <p className="mt-2 text-[#6D1950] font-bold">{item.fullName}</p>
                                 <p className="mt-2 text-[#BD4545] text-sm">ID: {item.id}</p>
                                 <Link
                                    to={ROUTE_PATH.CLIENT_GUIDE + '/' + item.id}
                                    className="bg-[#BD4545] text-white px-4 py-2 rounded-xl font-bold text-sm mt-2"
                                 >
                                    View Profile
                                 </Link>
                              </div>
                           </div>
                        );
                     })}
               </div>
               <div className="mt-10 flex items-center justify-center">
                  <PaginatedItems total_page={data?.totalPagesCount || 1} />
               </div>
            </div>
         </div>
         <div className="my-10 pb-10 container  min-h-[700px] pl-20">
            <div className="grid grid-cols-2">
               <div className="col-span-1">
                  <BookingGiude guides={data} />
               </div>
               <div className="col-span-1 relative">
                  <div className="absolute w-[570px] h-[800px] -translate-y-[50%] top-[50%] rounded-b-[45%] right-[-30%] rotate-[90deg] bg-[#BD4545]"></div>
                  {/* <div className="absolute top-[-16%] right-[-40%] w-[1067px] h-[573px]">
                     <LazyLoadingImage src="https://s3-alpha-sig.figma.com/img/5677/57fe/4599a1f72ea167700222b38f1fb58b99?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=O~oWsfrIyXbYgY5PZuwUSuaaTDWWswLjqPs2QeHGcJYR8YMei2vven1hjFzTNMnBmyGDzypqauH5oNzkz3OOUiqZzSUJkA2BEgjutOKQg5q88DCWMlnG8VvLonrAw9cFOfGlGmXPFHyfh4ZgsF7Sbot~P9npxsIW3XRWQyL5889VlQmxFyQGof~AFYxmkAjz0CIkaMXs8PBHiGe4IPHDKVpTRy1uxOMCin8NPqysaqZ-qtvpDySLW4SCkercLP-NIBdGvJYhiR0NId-ggRPAZ3LSl4gc1cEefLkLGjiXJ4qRXUyw8DE1RjKxWqQiw~cSkXcfxPdBaxvxiQpBEL31pw__" />
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
};
