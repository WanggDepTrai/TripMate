import languages from './i18n';
import { BestGuide } from './component/best-guide';
import { Destinations } from './component/destinations';

import snapedit from '@assets/images/snapedit_1708566790385.png';
import rngtreeBrush from '@assets/images/rngtreeBrush.png';
import { images } from '@assets/images';
import { LazyLoadingImage } from '@components';
import homeOne from '@assets/images/snapedit_1708580138549 1.png';
import { useI18n } from '@hooks';
import { SvgIcon, cn } from '@helpers';
import { useTranslation } from 'react-i18next';
import { LANGUAGE, ROUTE_PATH } from '@constants';
import { Link } from 'react-router-dom';
import { useAuth } from '~/app/redux/slices';

export const HomeClient = () => {
   const translate = useI18n(languages);

   const { i18n } = useTranslation();

   const t = useI18n();

   const { user } = useAuth();
   return (
      <div className="">
         <div className="min-h-[800px] relative z-10">
            <div className="absolute -top-[100%] -right-[10%]  bg-[#BD4545] w-[500px] h-[1600px] rounded-[1000px] -rotate-[135deg]"></div>
            <LazyLoadingImage src={images.homeCity} className="h-full absolute opacity-[0.5]" />
            <div className="container relative">
               <div className=" top-0 left-0 right-0 pt-10 z-[999] absolute">
                  <div className="grid grid-cols-2">
                     <div className="col-span-1">
                        <button className="rounded-2xl border-[3px] border-[#BD4545] text-[#BD4545] py-1 px-4">
                           {translate('OTHERS')}
                        </button>
                        <div className=" flex items-center gap-2">
                           <h5 className="text-[#BD4545] font-semibold text-xl uppercase">
                              {translate('BEST_CLOCAL')}
                           </h5>
                           <LazyLoadingImage src={rngtreeBrush} width="150px" height="60px" />
                        </div>
                        <h4
                           className={cn('text-[72px] font-semibold  text-[#6d1950]', {
                              'text-[56px]': i18n.language === LANGUAGE.VI,
                           })}
                        >
                           {translate('TRAVEL_AROUND_START')}
                           <p
                              className={cn('!text-[#78b28d]', {
                                 'text-[56px]': i18n.language === LANGUAGE.VI,
                              })}
                           >
                              {translate('HCM')}
                           </p>
                           {translate('TRAVEL_AROUND_END')}
                        </h4>
                        <div className="mt-10 text-[#BD4545] text-xl font-semibold">{translate('UNFORGETTABLE')}</div>
                     </div>
                     <div className="col-span-1 w-full pt-5  pl-5">
                        <LazyLoadingImage src={homeOne} width="550px" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="container">
            <div className="bg-[#D9D9D9] rounded-3xl flex max-w-max gap-5 px-10 py-5">
               <div className="">
                  <label htmlFor="" className="text-[#BD4545] font-bold">
                     {translate('DESTINATION')}
                  </label>
                  <p className="text-[#A6A6A6] text-sm mt-3">District 9</p>
               </div>
               <div className="">
                  <label htmlFor="" className="text-[#BD4545] font-bold">
                     {translate('DATE')}
                  </label>
                  <p className="text-[#A6A6A6] text-sm mt-3">Select date</p>
               </div>
               <div className="">
                  <label htmlFor="" className="text-[#BD4545] font-bold">
                     {translate('PEOPLE')}
                  </label>
                  <p className="text-[#A6A6A6] text-sm mt-3">How many people?</p>
               </div>
               <div className="">
                  <button className="p-3 bg-[#78B28D] rounded-lg">
                     <SvgIcon name="search" />
                  </button>
               </div>
            </div>
         </div>

         <div className="mt-20">
            <div className="text-center">
               <p className="text-[#BD4545] font-bold mb-4">{translate('TOP_GUIDE')}</p>
               <h3 className="text-[#6D1950] text-5xl font-bold">{translate('BEST_GUIDE')}</h3>
            </div>
            <div className="px-4 mt-10">
               <BestGuide />
               <div className="flex items-center justify-center mt-5">
                  <Link
                     to={ROUTE_PATH.CLIENT_GUIDE}
                     className="p-8 py-2 text-2xl font-bold bg-[#BD4545] text-[#F0D171] rounded-xl"
                  >
                     {t('VIEW_MORE')}
                  </Link>
               </div>
            </div>
         </div>

         <div className="mt-14 relative min-h-[650px] w-auto overflow-hidden">
            <div className="container mb-14">
               <p className="text-[#BD4545] text-xl font-bold">{translate('How_we_work')}</p>
               <h4 className="font-bold text-[64px] text-[#6D1950] z-10">{translate('We_Offer_Best_Services')}</h4>
            </div>
            <div className="relative">
               <div className="absolute top-[-240px] -right-[10px]  bg-[#BD4545] w-[400px] translate-x-[50%] h-[1600px] rounded-[1000px] rotate-[135deg]"></div>
               <div className="absolute top-0 left-0 right-0">
                  <div className="grid grid-cols-2 ">
                     <div className="col-span-1">
                        <div className="pt-10 pl-20 flex flex-col gap-y-10 h-full">
                           <div className="flex items-center gap-10">
                              <div className="px-4 py-1 rounded-xl bg-[#f1f0f0]">
                                 <SvgIcon name="travel_06" width={48} />
                              </div>
                              <div className="text-xl">
                                 <p className="text-[#BD4545] font-medium">{translate('Choose_Destination')}</p>
                                 <p className="text-[#6D1950]">{translate('Covering_all_over_Ho_Chi_Minh')}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-10">
                              <div className="px-4 py-1 rounded-xl bg-[#f1f0f0]">
                                 <SvgIcon name="travel_18" width={48} />
                              </div>
                              <div className="text-xl">
                                 <p className="text-[#BD4545] font-medium">{translate('Diverse_Travel_Itineraries')}</p>
                                 <p className="text-[#6D1950]">
                                    {translate('Tours_are_designed_according_to_customer_needs')}
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center gap-10">
                              <div className="px-4 py-1 rounded-xl bg-[#f1f0f0]">
                                 <SvgIcon name="people" width={48} />
                              </div>
                              <div className="text-xl">
                                 <p className="text-[#BD4545] font-medium">{translate('Guide_Team')}</p>
                                 <p className="text-[#6D1950]">
                                    {translate('Professional_Guide_team_with_in_depth_regional_knowledge')}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-span-1 -mt-[100px] -ml-20 flex items-center justify-center">
                        <LazyLoadingImage width="600px" height="530px" src={snapedit} className="h-full " />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="bg-[#F0D171] pt-10 pb-[100px]">
            <div className="container">
               <p className="text-[#BD4545] text-xl font-bold">{translate('Type_Travel')}</p>
               <h4 className="font-bold text-4xl mt-3 text-[#6D1950]">{translate('Destinations')}</h4>
            </div>
            <div className="px-4 mt-10">
               <Destinations />
            </div>
         </div>
      </div>
   );
};
