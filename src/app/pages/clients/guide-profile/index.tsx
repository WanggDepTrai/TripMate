import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { images } from '@assets/images';
import { LanguageSystem, LazyLoadingImage } from '@components';
import { SETTINGS_CONFIG, createInstance, serviceApi } from '@configs';
import { SvgIcon, convertToDate, priceFormat } from '@helpers';
import { useI18n } from '@hooks';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import languages from './i18n';
import { regexs } from '@utils';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ROUTE_PATH } from '@constants';

export const GuideProfile = () => {
   const { id } = useParams();
   const [bookingAction, setBookingAction] = useState<number>(0);

   const navigate = useNavigate();

   const translate = useI18n(languages);

   const { data } = useQuery(['getGuildPagination'], async () => {
      const res = await serviceApi.request.get(`guides/${id}`);
      return res.data;
   });

   const changeNumberAllow = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.value = event.target.value.replace(regexs.integer, '');
   };

   const schema = yup.object({
      BookingDate: yup
         .string()
         .required(translate('booking_date_required'))
         .test('is-future-date', translate('booking_date_must_be_future'), function (value) {
            if (value) {
               const currentDate = new Date();
               return new Date(value as unknown as Date) > currentDate;
            }

            return false;
         }),
      StartTime: yup.string().required(translate('start_time_required')).default(''),
      totalHour: yup.string().default('1'),
      Location: yup.string().default(''),
      paymentMethod: yup.number().default(0),
   });

   type ValidationForm = yup.InferType<typeof schema>;

   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      watch,
      clearErrors,
      reset,
   } = useForm<ValidationForm>({
      resolver: yupResolver(schema),
      defaultValues: schema.getDefault(),
   });

   const onSubmit = async (data: ValidationForm) => {
      const config = {
         headers: {
            Authorization: `Bearer ${localStorage.getItem(SETTINGS_CONFIG.ACCESS_TOKEN_KEY)?.replace(/"/g, '')}`,
         },
      };
      await axios
         .post(
            process.env.VITE_API_URL + '/api/v1/bookings-customer',
            {
               ...data,
               GuideID: id,
               totalHour: Number(data.totalHour),
               BookingDate: convertToDate(new Date(data.BookingDate)),
            },
            config,
         )
         .then((response) => {
            if (response.data.isSuccess) {
               toast.success(response.data.message);
               console.log(watch('paymentMethod') === 1);
               if (Number(watch('paymentMethod')) === 1) {
                  console.log(response.data);
                  return navigate(
                     ROUTE_PATH.BOOKING +
                        '/' +
                        response.data.data.id +
                        '?price=' +
                        priceFormat(Number(watch('totalHour')) * 100000),
                  );
               }

               setBookingAction(0);
               return reset();
            }

            return toast.error(response.data.message);
         })
         .catch((error) => {
            // handle errors
            console.log(error);
         });
   };
   const onClickNextAction = useCallback(() => {
      if (watch('totalHour') === '') {
         setError('totalHour', { message: translate('total_hour_required') });
      } else {
         clearErrors('totalHour');
      }

      if (watch('totalHour') !== '' && Number(watch('totalHour')) < 1) {
         setError('totalHour', { message: translate('total_hour_min') });
      } else {
         clearErrors('totalHour');
      }

      if (watch('Location') === '') {
         setError('Location', { message: translate('location_required') });
      } else {
         clearErrors('Location');
      }

      if (watch('totalHour') !== '' && Number(watch('totalHour')) > 0 && watch('Location') !== '') {
         // console.log('Pass');
         setBookingAction(1);
         return;
      }
      // console.log("false");
      return;
   }, [watch('Location'), watch('totalHour')]);

   return (
      <div className="bg-[#f0d171] relative ">
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
                        <p className="text-[#6D1950] font-bold">{translate('Find_Guide')}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container bg-[#FDF9ED] mt-10 rounded-lg py-6 px-[120px] pb-[100px]">
            <div className=" flex ">
               <div className="w-[78px] flex items-center justify-center">
                  <SvgIcon name="back" />
               </div>
               <div className="flex-1 flex flex-col justify-center items-center">
                  <p className="text-[30px] text-[#6D1950] font-semibold">Guide Profile</p>
                  <h3 className="text-[64px] text-[#BD4545] font-bold">{data?.fullName}</h3>
               </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-y-4">
               <div className="col-span-1">
                  <div className="w-[410px]">
                     <LazyLoadingImage className="rounded-2xl" src={data?.imageURL} />
                  </div>
               </div>
               <div className="flex h-full ">
                  <div className="border-[2px] border-[#000000] w-[418px] h-full p-6">
                     <h5 className="text-[#6D1950] text-xl font-bold">{translate('Background')}</h5>
                     <p className="text-lg text-[#6D1950] mt-5">{data?.bio}</p>
                  </div>
               </div>
               <div className="col-span-1 ">
                  <div className="flex items-end gap-4 w-[410px]">
                     <SvgIcon name="profile" width={32} />
                     <div className="border-b border-[#000000] min-h-[32px] mb-3 w-full  text-[#6D1950]">
                        {data?.email}
                     </div>
                  </div>
                  <div className="flex items-end gap-4 w-[410px] mt-3">
                     <SvgIcon name="location" width={24} />
                     <div className="border-b border-[#000000] min-h-[32px] mb-3 w-full text-[#6D1950]">Thủ đức</div>
                  </div>
                  <div className="flex items-end gap-4 w-[410px] mt-3">
                     <SvgIcon name="check-tick" width={24} />
                     <div className="border-b border-[#000000] min-h-[32px] mb-3 w-full  text-[#6D1950]">
                        {data?.totalTour}
                     </div>
                  </div>
                  <div className="flex items-end gap-4 w-[410px] mt-3">
                     <SvgIcon name="star" width={24} />
                     <div className="border-b border-[#000000] min-h-[32px] mb-3 w-full  text-[#6D1950]">
                        {data?.rating} / 5
                     </div>
                  </div>
               </div>
               <div className="col-span-1 ">
                  <div className="border h-full px-[75px] py-[36px] border-[#000000]">
                     <p className="text-[24px] font-bold text-[#6D1950]">{translate('ExperiContinueence')}</p>
                     <ul className="ml-10">
                        <li className="text-[#6D1950] text-lg font-bold list-disc">Lừa đảo được 5 năm</li>
                        <li className="text-[#6D1950] text-lg font-bold list-disc">Khách huỷ tour 80%</li>
                     </ul>
                  </div>
               </div>
               <form onSubmit={handleSubmit(onSubmit)} className="col-span-2 ">
                  {bookingAction === 0 && (
                     <div className="absolute flex h-auto border border-[#BD4545] rounded-lg bg-[#FDF9ED] bottom-0 left-[50%] -translate-x-[50%]">
                        <div className="py-4 px-10 flex gap-10">
                           <div className="flex flex-col items-center justify-between gap-4">
                              <div className="">
                                 {/* <input
                                    type="text"
                                    className="bg-transparent border border-transparent border-b border-b-black w-[200px] font-bold px-2"
                                    placeholder={translate('location')}
                                    {...register('Location')}
                                 /> */}
                                 <select
                                    {...register('Location')}
                                    //  placeholder={translate('location')}
                                    className="bg-transparent border border-transparent border-b border-b-black w-[200px] font-bold px-2"
                                 >
                                    <option value=""></option>
                                    <option value="ho-chi-minh">Hồ Chí Minh</option>
                                 </select>
                                 {errors.Location && (
                                    <p className="text-sm text-red-500 mt-1">{errors.Location?.message}</p>
                                 )}
                              </div>
                              <div className="">
                                 <input
                                    id="end-date"
                                    type="text"
                                    className="bg-transparent border border-transparent border-b border-b-black w-[200px] font-bold px-2"
                                    {...register('totalHour')}
                                    onInput={changeNumberAllow}
                                    placeholder={translate('total_hour')}
                                    onChange={(e) => {
                                       console.log(typeof e.target.value);
                                       if (e.target.value === '') {
                                          setError('totalHour', { message: translate('total_hour_required') });
                                       } else if (Number(e.target.value) === 0) {
                                          setError('totalHour', { message: translate('total_hour_min') });
                                       } else {
                                          clearErrors('totalHour');
                                       }
                                    }}
                                 />
                                 {errors.totalHour && (
                                    <p className="text-sm text-red-500 mt-1">{errors.totalHour?.message}</p>
                                 )}
                              </div>
                           </div>
                           <div className="flex h-full items-center justify-center">
                              <label htmlFor="time">
                                 <SvgIcon name="date-time-booking" />
                              </label>
                           </div>
                        </div>
                        <div className="">
                           <button
                              type="button"
                              // disabled={
                              //    watch('totalHour') === '' && Number(watch('totalHour')) < 1 && watch('Location') !== ''
                              // }
                              onClick={onClickNextAction}
                              className="h-full px-10 bg-[#BD4545] rounded-lg font-bold text-lg text-[#F0D171]"
                           >
                              {translate('Continue')}
                           </button>
                        </div>
                     </div>
                  )}
                  {bookingAction === 1 && (
                     <div
                        className="pb-20 w-full bg-cover bg-center rounded-2xl mt-10 pt-10 px-10 mb-5"
                        style={{
                           backgroundImage:
                              'url(https://s3-alpha-sig.figma.com/img/6d74/cd7c/5e3caeefb91c527a203e162e3a668a38?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aTJvrU8WxR0bPUWNABxuemAdU5jJg8LRFnXJhNgJ0vdYqrXDfmUnvjI6SD4phvR2Fseo69RxJ1JDQKGT3XEZLlcsxHCWYycjsrDmwFfWN~uMb2KNi77XGH0adQGYYuFbd9s~unUppbbUMxNyxMKwKpVuhnZPx-paGHJOR898W2hsPQxvpBZVj6L-j2qkGORra9hfYqcd2pILWEeFgEUWXZ9bA55S64sGF~yB13pchocuVcFC4GKcTLeuPRFvywa7an5knGdYTk7yNZneIzCOttlNyoq3ssjSq7Ur1VsmiNefpA6pE9IMb3B9EvNwe4z3O4x~XIebhsGWlfZ02DzLvw__)',
                           backgroundPosition: 'center',
                           backgroundRepeat: 'no-repeat',
                        }}
                     >
                        <div className="grid grid-cols-2 gap-x-[81px] gap-y-[58px]">
                           <div className="col-span-1 bg-white flex gap-4 items-center py-3 rounded-xl px-[12px] border-[3px] border-[#F0D171]">
                              <div className="">
                                 <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 52 56"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M45.0667 27.1523C46.15 27.8997 47.116 28.7474 47.9646 29.6953C48.8132 30.6432 49.5444 31.6823 50.1583 32.8125C50.7722 33.9427 51.2236 35.1367 51.5125 36.3945C51.8014 37.6523 51.9639 38.9375 52 40.25C52 42.4193 51.5938 44.4609 50.7812 46.375C49.9688 48.2891 48.8493 49.957 47.4229 51.3789C45.9965 52.8008 44.3444 53.9219 42.4667 54.7422C40.5889 55.5625 38.5667 55.9818 36.4 56C34.7569 56 33.1681 55.7539 31.6333 55.2617C30.0986 54.7695 28.6903 54.0586 27.4083 53.1289C26.1264 52.1992 24.9889 51.0872 23.9958 49.793C23.0028 48.4987 22.2354 47.0677 21.6938 45.5H0V3.5H6.93333V0H10.4V3.5H34.6667V0H38.1333V3.5H45.0667V27.1523ZM3.46667 7V14H41.6V7H38.1333V10.5H34.6667V7H10.4V10.5H6.93333V7H3.46667ZM20.8813 42C20.8271 41.4349 20.8 40.8516 20.8 40.25C20.8 38.6823 21.0167 37.1602 21.45 35.6836C21.8833 34.207 22.5424 32.8125 23.4271 31.5H20.8V28H24.2667V30.3516C25.0069 29.4219 25.8285 28.6016 26.7312 27.8906C27.634 27.1797 28.609 26.569 29.6562 26.0586C30.7035 25.5482 31.7958 25.1654 32.9333 24.9102C34.0708 24.6549 35.2264 24.5182 36.4 24.5C38.2056 24.5 39.9389 24.8008 41.6 25.4023V17.5H3.46667V42H20.8813ZM36.4 52.5C38.0792 52.5 39.65 52.181 41.1125 51.543C42.575 50.9049 43.8569 50.0299 44.9583 48.918C46.0597 47.806 46.9264 46.5117 47.5583 45.0352C48.1903 43.5586 48.5153 41.9635 48.5333 40.25C48.5333 38.5547 48.2174 36.9688 47.5854 35.4922C46.9535 34.0156 46.0868 32.7214 44.9854 31.6094C43.884 30.4974 42.6021 29.6224 41.1396 28.9844C39.6771 28.3464 38.0972 28.0182 36.4 28C34.7208 28 33.15 28.319 31.6875 28.957C30.225 29.5951 28.9431 30.4701 27.8417 31.582C26.7403 32.694 25.8736 33.9883 25.2417 35.4648C24.6097 36.9414 24.2847 38.5365 24.2667 40.25C24.2667 41.9453 24.5826 43.5312 25.2146 45.0078C25.8465 46.4844 26.7132 47.7786 27.8146 48.8906C28.916 50.0026 30.1979 50.8776 31.6604 51.5156C33.1229 52.1536 34.7028 52.4818 36.4 52.5ZM38.1333 38.5H43.3333V42H34.6667V31.5H38.1333V38.5ZM6.93333 28H10.4V31.5H6.93333V28ZM13.8667 28H17.3333V31.5H13.8667V28ZM13.8667 21H17.3333V24.5H13.8667V21ZM6.93333 35H10.4V38.5H6.93333V35ZM13.8667 35H17.3333V38.5H13.8667V35ZM24.2667 24.5H20.8V21H24.2667V24.5ZM31.2 24.5H27.7333V21H31.2V24.5ZM38.1333 24.5H34.6667V21H38.1333V24.5Z"
                                       fill="#BD4545"
                                    />
                                 </svg>
                              </div>

                              <div className="flex-1">
                                 <div className="flex justify-between items-center gap-10">
                                    <label
                                       htmlFor="start-date"
                                       className="block w-[100px] text-gray-700 text-sm font-bold mb-2"
                                    >
                                       {translate('start_time')}
                                    </label>
                                    <input
                                       id="start-date"
                                       type="time"
                                       className="block bg-transparent border border-transparent border-b w-full text-[#A2A9B4] border-b-black  font-bold"
                                       {...register('StartTime')}
                                    />
                                 </div>
                                 {errors.StartTime && (
                                    <p className="text-sm text-red-500 mt-1">{errors.StartTime?.message}</p>
                                 )}
                              </div>
                           </div>
                           <div className="col-span-1 bg-white flex items-end gap-4 py-3 rounded-xl px-[12px] border-[3px] border-[#F0D171]">
                              <div className="">
                                 <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M46.875 50C46.875 50 50 50 50 45.8333C50 41.6667 46.875 29.1667 34.375 29.1667C21.875 29.1667 18.75 41.6667 18.75 45.8333C18.75 50 21.875 50 21.875 50H46.875ZM21.9438 45.8333L21.875 45.8167C21.8781 44.7167 22.3969 41.525 24.25 38.65C25.975 35.9542 29.0063 33.3333 34.375 33.3333C39.7406 33.3333 42.7719 35.9583 44.5 38.65C46.3531 41.525 46.8688 44.7208 46.875 45.8167L46.85 45.825L46.8062 45.8333H21.9438ZM34.375 20.8333C36.0326 20.8333 37.6223 19.9554 38.7944 18.3926C39.9665 16.8298 40.625 14.7101 40.625 12.5C40.625 10.2899 39.9665 8.17025 38.7944 6.60744C37.6223 5.04464 36.0326 4.16667 34.375 4.16667C32.7174 4.16667 31.1277 5.04464 29.9556 6.60744C28.7835 8.17025 28.125 10.2899 28.125 12.5C28.125 14.7101 28.7835 16.8298 29.9556 18.3926C31.1277 19.9554 32.7174 20.8333 34.375 20.8333ZM43.75 12.5C43.75 14.1415 43.5075 15.767 43.0364 17.2835C42.5652 18.8001 41.8747 20.1781 41.0041 21.3388C40.1336 22.4996 39.1001 23.4203 37.9627 24.0485C36.8252 24.6767 35.6061 25 34.375 25C33.1439 25 31.9248 24.6767 30.7873 24.0485C29.6499 23.4203 28.6164 22.4996 27.7459 21.3388C26.8753 20.1781 26.1848 18.8001 25.7136 17.2835C25.2425 15.767 25 14.1415 25 12.5C25 9.18479 25.9877 6.00537 27.7459 3.66117C29.504 1.31696 31.8886 0 34.375 0C36.8614 0 39.246 1.31696 41.0041 3.66117C42.7623 6.00537 43.75 9.18479 43.75 12.5ZM21.675 30.3333C20.4242 29.8121 19.136 29.4672 17.8312 29.3042C17.098 29.2088 16.3617 29.1629 15.625 29.1667C3.125 29.1667 0 41.6667 0 45.8333C0 48.6111 1.04167 50 3.125 50H16.3C15.837 48.6991 15.6059 47.2731 15.625 45.8333C15.625 41.625 16.8031 37.325 19.0312 33.7333C19.7906 32.5083 20.675 31.3625 21.675 30.3333ZM15.375 33.3333C13.5266 37.0394 12.5276 41.3828 12.5 45.8333H3.125C3.125 44.75 3.6375 41.5417 5.5 38.65C7.20312 36 10.1625 33.4167 15.375 33.3375V33.3333ZM4.6875 14.5833C4.6875 11.2681 5.67522 8.0887 7.43337 5.7445C9.19153 3.40029 11.5761 2.08333 14.0625 2.08333C16.5489 2.08333 18.9335 3.40029 20.6916 5.7445C22.4498 8.0887 23.4375 11.2681 23.4375 14.5833C23.4375 17.8985 22.4498 21.078 20.6916 23.4222C18.9335 25.7664 16.5489 27.0833 14.0625 27.0833C11.5761 27.0833 9.19153 25.7664 7.43337 23.4222C5.67522 21.078 4.6875 17.8985 4.6875 14.5833ZM14.0625 6.25C12.4049 6.25 10.8152 7.12797 9.64308 8.69078C8.47098 10.2536 7.8125 12.3732 7.8125 14.5833C7.8125 16.7935 8.47098 18.9131 9.64308 20.4759C10.8152 22.0387 12.4049 22.9167 14.0625 22.9167C15.7201 22.9167 17.3098 22.0387 18.4819 20.4759C19.654 18.9131 20.3125 16.7935 20.3125 14.5833C20.3125 12.3732 19.654 10.2536 18.4819 8.69078C17.3098 7.12797 15.7201 6.25 14.0625 6.25Z"
                                       fill="#BD4545"
                                    />
                                 </svg>
                              </div>

                              <div className="flex-1 ">
                                 <div className="flex justify-between items-center gap-10">
                                    <label
                                       htmlFor="start-date"
                                       className="block w-[200px] text-gray-700 text-sm font-bold mb-2"
                                    >
                                       {translate('BookingDate')}
                                    </label>
                                    <input
                                       id="start-date"
                                       type="date"
                                       className="block bg-transparent border border-transparent border-b w-full text-[#A2A9B4] border-b-black  font-bold"
                                       {...register('BookingDate')}
                                    />
                                 </div>
                                 {errors.BookingDate && (
                                    <p className="text-sm text-red-500 mt-1">{errors.BookingDate?.message}</p>
                                 )}
                              </div>
                           </div>
                           <div className="col-span-1 bg-white flex items-end gap-4 py-3 rounded-xl px-[12px] border-[3px] border-[#F0D171]">
                              <div className="">
                                 <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M46.875 50C46.875 50 50 50 50 45.8333C50 41.6667 46.875 29.1667 34.375 29.1667C21.875 29.1667 18.75 41.6667 18.75 45.8333C18.75 50 21.875 50 21.875 50H46.875ZM21.9438 45.8333L21.875 45.8167C21.8781 44.7167 22.3969 41.525 24.25 38.65C25.975 35.9542 29.0063 33.3333 34.375 33.3333C39.7406 33.3333 42.7719 35.9583 44.5 38.65C46.3531 41.525 46.8688 44.7208 46.875 45.8167L46.85 45.825L46.8062 45.8333H21.9438ZM34.375 20.8333C36.0326 20.8333 37.6223 19.9554 38.7944 18.3926C39.9665 16.8298 40.625 14.7101 40.625 12.5C40.625 10.2899 39.9665 8.17025 38.7944 6.60744C37.6223 5.04464 36.0326 4.16667 34.375 4.16667C32.7174 4.16667 31.1277 5.04464 29.9556 6.60744C28.7835 8.17025 28.125 10.2899 28.125 12.5C28.125 14.7101 28.7835 16.8298 29.9556 18.3926C31.1277 19.9554 32.7174 20.8333 34.375 20.8333ZM43.75 12.5C43.75 14.1415 43.5075 15.767 43.0364 17.2835C42.5652 18.8001 41.8747 20.1781 41.0041 21.3388C40.1336 22.4996 39.1001 23.4203 37.9627 24.0485C36.8252 24.6767 35.6061 25 34.375 25C33.1439 25 31.9248 24.6767 30.7873 24.0485C29.6499 23.4203 28.6164 22.4996 27.7459 21.3388C26.8753 20.1781 26.1848 18.8001 25.7136 17.2835C25.2425 15.767 25 14.1415 25 12.5C25 9.18479 25.9877 6.00537 27.7459 3.66117C29.504 1.31696 31.8886 0 34.375 0C36.8614 0 39.246 1.31696 41.0041 3.66117C42.7623 6.00537 43.75 9.18479 43.75 12.5ZM21.675 30.3333C20.4242 29.8121 19.136 29.4672 17.8312 29.3042C17.098 29.2088 16.3617 29.1629 15.625 29.1667C3.125 29.1667 0 41.6667 0 45.8333C0 48.6111 1.04167 50 3.125 50H16.3C15.837 48.6991 15.6059 47.2731 15.625 45.8333C15.625 41.625 16.8031 37.325 19.0312 33.7333C19.7906 32.5083 20.675 31.3625 21.675 30.3333ZM15.375 33.3333C13.5266 37.0394 12.5276 41.3828 12.5 45.8333H3.125C3.125 44.75 3.6375 41.5417 5.5 38.65C7.20312 36 10.1625 33.4167 15.375 33.3375V33.3333ZM4.6875 14.5833C4.6875 11.2681 5.67522 8.0887 7.43337 5.7445C9.19153 3.40029 11.5761 2.08333 14.0625 2.08333C16.5489 2.08333 18.9335 3.40029 20.6916 5.7445C22.4498 8.0887 23.4375 11.2681 23.4375 14.5833C23.4375 17.8985 22.4498 21.078 20.6916 23.4222C18.9335 25.7664 16.5489 27.0833 14.0625 27.0833C11.5761 27.0833 9.19153 25.7664 7.43337 23.4222C5.67522 21.078 4.6875 17.8985 4.6875 14.5833ZM14.0625 6.25C12.4049 6.25 10.8152 7.12797 9.64308 8.69078C8.47098 10.2536 7.8125 12.3732 7.8125 14.5833C7.8125 16.7935 8.47098 18.9131 9.64308 20.4759C10.8152 22.0387 12.4049 22.9167 14.0625 22.9167C15.7201 22.9167 17.3098 22.0387 18.4819 20.4759C19.654 18.9131 20.3125 16.7935 20.3125 14.5833C20.3125 12.3732 19.654 10.2536 18.4819 8.69078C17.3098 7.12797 15.7201 6.25 14.0625 6.25Z"
                                       fill="#BD4545"
                                    />
                                 </svg>
                              </div>

                              <div className="flex-1 ">
                                 <div className="flex justify-between items-center gap-10">
                                    <div className="flex items-center gap-4 flex-1">
                                       <input
                                          id={translate('Cash')}
                                          type="radio"
                                          defaultChecked
                                          value={0}
                                          className="block bg-transparent border border-transparent border-b text-[#A2A9B4] border-b-black  font-bold"
                                          {...register('paymentMethod')}
                                       />
                                       <label htmlFor={translate('Cash')} className="">
                                          {translate('Cash')}
                                       </label>
                                    </div>
                                    <div className="flex items-center gap-4 flex-1">
                                       <input
                                          id={translate('Transfer')}
                                          type="radio"
                                          value={1}
                                          className="block bg-transparent border border-transparent border-b text-[#A2A9B4] border-b-black  font-bold"
                                          {...register('paymentMethod')}
                                       />
                                       <label htmlFor={translate('Transfer')} className="">
                                          {translate('Transfer')}
                                       </label>
                                    </div>
                                 </div>
                                 {/* {errors.BookingDate && (
                                    <p className="text-sm text-red-500 mt-1">{errors.BookingDate?.message}</p>
                                 )} */}
                              </div>
                           </div>
                           {/* <div className="col-span-1 bg-white flex gap-4 items-end py-3 rounded-xl px-[12px] border-[3px] border-[#F0D171]">
                              <svg
                                 width="30"
                                 height="30"
                                 viewBox="0 0 50 50"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M24.9999 28.5714C22.7523 28.5714 20.5553 28.0477 18.6866 27.0666C16.8178 26.0856 15.3613 24.6911 14.5012 23.0596C13.6412 21.4281 13.4161 19.6329 13.8546 17.9009C14.2931 16.169 15.3753 14.578 16.9646 13.3294C18.5538 12.0807 20.5786 11.2303 22.7829 10.8858C24.9873 10.5413 27.2721 10.7181 29.3485 11.3939C31.425 12.0697 33.1997 13.2141 34.4484 14.6824C35.697 16.1507 36.3635 17.8769 36.3635 19.6428C36.3599 22.0099 35.1615 24.2793 33.0312 25.9531C30.9009 27.627 28.0126 28.5685 24.9999 28.5714ZM24.9999 14.2857C23.6514 14.2857 22.3331 14.5999 21.2119 15.1885C20.0906 15.7772 19.2167 16.6138 18.7007 17.5927C18.1846 18.5716 18.0496 19.6488 18.3127 20.6879C18.5758 21.7271 19.2251 22.6817 20.1787 23.4309C21.1322 24.1801 22.3471 24.6903 23.6697 24.897C24.9923 25.1037 26.3632 24.9976 27.6091 24.5922C28.8549 24.1867 29.9198 23.5001 30.669 22.6191C31.4182 21.7381 31.818 20.7024 31.818 19.6428C31.8162 18.2224 31.0973 16.8607 29.819 15.8563C28.5408 14.852 26.8076 14.2871 24.9999 14.2857Z"
                                    fill="#BD4545"
                                 />
                                 <path
                                    d="M25 50L5.82729 32.2339C5.56089 31.9672 5.29724 31.6987 5.03639 31.4286C1.76134 28.0389 -0.00791179 23.8986 2.65974e-05 19.6429C2.65974e-05 14.4332 2.63395 9.43701 7.32235 5.75326C12.0108 2.06951 18.3696 0 25 0C31.6304 0 37.9892 2.06951 42.6777 5.75326C47.3661 9.43701 50 14.4332 50 19.6429C50.0079 23.8967 48.2395 28.0351 44.9659 31.4232L44.9636 31.4286C44.9636 31.4286 44.2818 32.1321 44.1795 32.2268L25 50ZM8.66593 29.2768C8.66593 29.2768 9.19547 29.8268 9.31593 29.9446L25 44.4786L40.7045 29.925C40.8045 29.8268 41.3363 29.2732 41.3386 29.2714C44.014 26.502 45.4598 23.1197 45.4545 19.6429C45.4545 15.3804 43.2995 11.2926 39.4635 8.27864C35.6276 5.26466 30.4249 3.57143 25 3.57143C19.5751 3.57143 14.3724 5.26466 10.5365 8.27864C6.7005 11.2926 4.54548 15.3804 4.54548 19.6429C4.54071 23.1219 5.98815 26.5061 8.66593 29.2768Z"
                                    fill="#BD4545"
                                 />
                              </svg>

                              <div className="border-b border-[#000000] max-h-[32px] w-full text-xl text-[#6D1950] px-3">
                                 <input type="text" placeholder="Location" />
                              </div>
                           </div> */}
                           <div className="col-span-2 flex items-center justify-center">
                              <div className="min-w-[507px] h-[100px] border-[2px] gap-10 border-[#BD4545] flex items-center justify-between pl-4 rounded-[16px] bg-[#FDF9ED]">
                                 <p className="max-w-max text-[32px] font-bold text-[#BD4545]">
                                    {priceFormat(Number(watch('totalHour')) * 100000)} VND
                                 </p>
                                 <button
                                    type="submit"
                                    // to={ROUTE_PATH.BOOKING + '/' + data?.id}
                                    className="min-w-[230px] h-full flex items-center justify-center bg-[#BD4545] text-[#F0D171] rounded-[13px] text-[32px] font-bold"
                                 >
                                    {translate('Booking')}
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </form>
            </div>
         </div>
         <div className="py-5"></div>
      </div>
   );
};
