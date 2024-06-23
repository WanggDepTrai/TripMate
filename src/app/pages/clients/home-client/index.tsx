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
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                     </svg>
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
                                 <svg
                                    width="84"
                                    height="84"
                                    viewBox="0 0 84 84"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       fill-rule="evenodd"
                                       clip-rule="evenodd"
                                       d="M24.255 44.9817C22.4992 43.7208 20.0282 44.3917 19.151 46.3674L12.6133 61.0925C11.9578 62.5688 12.4285 64.3026 13.7406 65.2448L24.1211 72.6987C24.7649 73.161 25.671 72.9151 25.9926 72.1906L34.3199 53.4347C34.5602 52.8934 34.3876 52.2577 33.9065 51.9122L24.255 44.9817ZM39.0802 53.2759C38.7327 53.3814 38.4482 53.6329 38.3009 53.9648L30.7415 70.991C30.3076 71.9683 31.2215 73.0039 32.2452 72.6949L43.7174 69.2324C44.0675 69.1267 44.3537 68.8732 44.5007 68.5384L51.9779 51.5163C52.4074 50.5385 51.4922 49.5073 50.4703 49.8175L39.0802 53.2759ZM58.6563 48.9285C58.0286 48.6704 57.3096 48.9605 57.0366 49.5819L48.7457 68.4565C48.4638 69.0983 48.7646 69.8464 49.4123 70.1143L60.3428 74.6358C62.0511 75.3425 64.0113 74.5587 64.7615 72.869L71.3854 57.9497C72.1645 56.195 71.3416 54.1434 69.5659 53.4134L58.6563 48.9285ZM45.9867 72.8676C45.7202 72.7574 45.4238 72.7427 45.1477 72.826L26.4065 78.4824C26.0346 78.5947 25.6317 78.5277 25.3162 78.3011L11.4929 68.3749C8.69758 66.3677 7.6948 62.6741 9.09127 59.5287L15.629 44.8036C17.4977 40.5945 22.762 39.1653 26.5028 41.8515L36.979 49.3742C37.2951 49.6012 37.6989 49.668 38.0712 49.555L56.191 44.0532C56.4668 43.9695 56.763 43.9836 57.0295 44.0932L71.0312 49.8493C74.814 51.4044 76.5672 55.7752 74.9075 59.5134L68.2835 74.4328C66.6853 78.0325 62.5092 79.7023 58.8697 78.1968L45.9867 72.8676Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       d="M19.151 46.3674C20.0282 44.3917 22.4992 43.7208 24.255 44.9817L33.9065 51.9122C34.3876 52.2577 34.5602 52.8934 34.3199 53.4347L25.9926 72.1906C25.671 72.9151 24.7649 73.161 24.1211 72.6987L13.7406 65.2448C12.4285 64.3026 11.9578 62.5688 12.6133 61.0925L19.151 46.3674Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       d="M49.4123 70.1143C48.7646 69.8464 48.4638 69.0983 48.7457 68.4565L57.0366 49.5819C57.3096 48.9605 58.0286 48.6704 58.6563 48.9285L69.5659 53.4134C71.3416 54.1434 72.1645 56.195 71.3854 57.9497L64.7615 72.869C64.0113 74.5587 62.0511 75.3425 60.3428 74.6358L49.4123 70.1143Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       fill-rule="evenodd"
                                       clip-rule="evenodd"
                                       d="M41.9791 9.10359C34.7577 9.10359 28.8868 14.9903 28.8868 22.2728C28.8868 26.0802 30.7743 30.2383 33.3693 34.0963C35.9338 37.909 39.0228 41.1859 41.0704 43.1831C41.5776 43.6779 42.3349 43.6754 42.8416 43.1692C44.8878 41.1249 47.9904 37.7725 50.5689 33.9316C53.1843 30.0357 55.0715 25.9123 55.0715 22.2728C55.0715 14.9903 49.2006 9.10359 41.9791 9.10359ZM25.0332 22.2728C25.0332 12.8806 32.6109 5.25 41.9791 5.25C51.3474 5.25 58.9251 12.8806 58.9251 22.2728C58.9251 27.0848 56.5053 32.0027 53.7684 36.0795C50.9946 40.2112 47.6998 43.7628 45.5651 45.8954C43.5719 47.8867 40.4019 47.9143 38.3796 45.9417C36.2352 43.85 32.9418 40.3653 30.1717 36.247C27.4322 32.1741 25.0332 27.2318 25.0332 22.2728Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       fill-rule="evenodd"
                                       clip-rule="evenodd"
                                       d="M42.0002 26.7011C44.5822 26.7011 46.7089 24.5919 46.7089 21.9486C46.7089 19.3054 44.5822 17.1962 42.0002 17.1962C39.4182 17.1962 37.2916 19.3054 37.2916 21.9486C37.2916 24.5919 39.4182 26.7011 42.0002 26.7011ZM42.0002 30.5547C46.729 30.5547 50.5625 26.7016 50.5625 21.9486C50.5625 17.1956 46.729 13.3426 42.0002 13.3426C37.2714 13.3426 33.438 17.1956 33.438 21.9486C33.438 26.7016 37.2714 30.5547 42.0002 30.5547Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       d="M46.7089 21.9486C46.7089 24.5919 44.5822 26.7011 42.0002 26.7011C39.4182 26.7011 37.2916 24.5919 37.2916 21.9486C37.2916 19.3054 39.4182 17.1962 42.0002 17.1962C44.5822 17.1962 46.7089 19.3054 46.7089 21.9486Z"
                                       fill="#BD4545"
                                    />
                                 </svg>
                              </div>
                              <div className="text-xl">
                                 <p className="text-[#BD4545] font-medium">{translate('Choose_Destination')}</p>
                                 <p className="text-[#6D1950]">{translate('Covering_all_over_Ho_Chi_Minh')}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-10">
                              <div className="px-4 py-1 rounded-xl bg-[#f1f0f0]">
                                 <svg
                                    width="84"
                                    height="84"
                                    viewBox="0 0 84 84"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       fill-rule="evenodd"
                                       clip-rule="evenodd"
                                       d="M41.9998 9.22846C29.6719 9.22846 19.6782 19.2222 19.6782 31.5501C19.6782 38.6283 23.1969 47.1729 27.7152 55.1482C32.1937 63.0532 37.4789 70.1004 40.6678 74.1068C41.3725 74.9921 42.6368 74.9932 43.3429 74.1098C46.5336 70.1181 51.8158 63.099 56.2907 55.2047C60.8045 47.242 64.3215 38.6875 64.3215 31.5501C64.3215 19.2222 54.3277 9.22846 41.9998 9.22846ZM15.6997 31.5501C15.6997 17.025 27.4747 5.25 41.9998 5.25C56.525 5.25 68.2999 17.025 68.2999 31.5501C68.2999 39.7705 64.3333 49.0843 59.7518 57.1666C55.1314 65.3174 49.7067 72.5203 46.4506 76.5938C44.1494 79.4729 39.85 79.4677 37.555 76.5844C34.3019 72.4974 28.8759 65.2681 24.2537 57.1093C19.6713 49.0209 15.6997 39.7146 15.6997 31.5501Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       fill-rule="evenodd"
                                       clip-rule="evenodd"
                                       d="M42.0111 42.0961C47.6639 42.0961 52.2463 37.5136 52.2463 31.8608C52.2463 26.208 47.6639 21.6256 42.0111 21.6256C36.3583 21.6256 31.7758 26.208 31.7758 31.8608C31.7758 37.5136 36.3583 42.0961 42.0111 42.0961ZM42.0111 46.0745C49.8611 46.0745 56.2248 39.7108 56.2248 31.8608C56.2248 24.0108 49.8611 17.6471 42.0111 17.6471C34.1611 17.6471 27.7974 24.0108 27.7974 31.8608C27.7974 39.7108 34.1611 46.0745 42.0111 46.0745Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       d="M52.2463 31.8608C52.2463 37.5136 47.6639 42.0961 42.0111 42.0961C36.3583 42.0961 31.7758 37.5136 31.7758 31.8608C31.7758 26.208 36.3583 21.6256 42.0111 21.6256C47.6639 21.6256 52.2463 26.208 52.2463 31.8608Z"
                                       fill="#BD4545"
                                    />
                                 </svg>
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
                                 <svg
                                    width="84"
                                    height="84"
                                    viewBox="0 0 84 84"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M24.9367 42.0079C31.4615 42.0079 36.7509 36.7185 36.7509 30.1937C36.7509 23.6689 31.4615 18.3795 24.9367 18.3795C18.4119 18.3795 13.1226 23.6689 13.1226 30.1937C13.1226 36.7185 18.4119 42.0079 24.9367 42.0079Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       d="M38.3938 48.5703C33.7731 46.2238 28.6733 45.2885 24.9387 45.2885C17.6238 45.2885 2.62305 49.7747 2.62305 58.7436V65.6352H27.2359V62.9983C27.2359 59.8807 28.5486 56.7549 30.8458 54.1492C32.6787 52.0686 35.245 50.1373 38.3938 48.5703Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       d="M55.7817 47.2546C47.239 47.2546 30.188 52.5309 30.188 63.0046V70.8796H81.3755V63.0046C81.3755 52.5309 64.3245 47.2546 55.7817 47.2546Z"
                                       fill="#BD4545"
                                    />
                                    <path
                                       d="M55.7843 42.0063C63.759 42.0063 70.2238 35.5415 70.2238 27.5668C70.2238 19.592 63.759 13.1272 55.7843 13.1272C47.8095 13.1272 41.3447 19.592 41.3447 27.5668C41.3447 35.5415 47.8095 42.0063 55.7843 42.0063Z"
                                       fill="#BD4545"
                                    />
                                 </svg>
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
