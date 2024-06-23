import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { images } from '@assets/images';
import { LanguageSystem, LazyLoadingImage } from '@components';
import { SETTINGS_CONFIG, serviceApi } from '@configs';
import { SvgIcon, convertToDate, priceFormat } from '@helpers';
import { useI18n } from '@hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

   const { mutate } = useMutation({
      mutationKey: ['bookings-customer'],
      mutationFn: async (data: ValidationForm) => {
         console.log(1);
         const res = await serviceApi.request.post(`bookings-customer`, {
            ...data,
            GuideID: id,
         });
         console.log(res.data);
         return res;
      },
      onSuccess: (response: any) => {
         console.log(data);
         if (response.isSuccess) {
            toast.success(response.message);
            if (Number(watch('paymentMethod')) === 1) {
               console.log(response.data);
               return navigate(
                  ROUTE_PATH.BOOKING +
                     '/' +
                     response.data.id +
                     '?price=' +
                     priceFormat(Number(watch('totalHour')) * 100000),
               );
            }
            setBookingAction(0);
            return reset();
         }
         return toast.error(response.message);
      },
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
      console.log(data);
      mutate(data);
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
                        <svg width="63" height="75" viewBox="0 0 99 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <g clip-path="url(#clip0_1_7091)">
                              <path
                                 d="M17.8073 40.8071C17.6324 42.0322 17.3674 44.0252 17.1925 45.2503C17.1925 44.9329 17.0759 44.8313 17.1342 45.6692C16.8427 45.3201 16.7261 45.5295 16.6996 45.8469C12.7195 48.7476 10.3028 47.0339 7.55747 51.8959C6.70951 53.8572 6.74131 55.6726 6.06823 53.889C5.60185 53.4002 5.13547 55.7424 6.41802 57.526C6.68301 58.1925 7.73237 59.2778 9.37 60.0078C9.53584 60.344 9.65404 60.7107 9.71979 61.0932C9.82569 60.853 9.94246 60.6199 10.0696 60.395C9.68799 58.8907 11.209 60.4648 11.7602 61.4423C12.6983 61.6898 12.958 61.7216 12.4068 63.8543C11.5005 64.6604 12.0252 67.1104 10.4777 64.9397C6.56641 61.8993 3.78933 61.1313 2.33189 56.9992C2.33189 56.9992 2.33189 56.9992 2.30009 56.9293H2.33189C2.28065 55.9168 2.28065 54.9015 2.33189 53.889V53.8191C2.68167 48.608 6.39152 47.8336 8.52204 46.1579C10.112 45.9802 12.5817 42.6923 14.9454 41.8227C15.4704 41.5982 16.0367 41.55 16.583 41.6831C17.1342 41.0547 17.5741 41.1245 17.8073 40.8071Z"
                                 fill="#BD4545"
                              />
                              <path
                                 d="M83.7365 47.605C83.4026 49.2299 82.9203 48.957 83.498 46.6465C83.3125 48.1509 83.7683 48.1509 83.8001 46.6085C83.71 46.6465 83.6199 46.5259 83.6199 46.1451L83.3125 40.8641C83.2224 41.0926 83.1005 41.0546 82.8567 39.7787C83.0104 34.5359 80.9117 30.8925 80.0002 26.7477C80.2704 26.2462 78.2035 22.203 77.5676 24.8435C76.656 22.1014 76.9899 27.3062 76.6825 25.8083C75.4688 26.8112 75.7126 26.5382 76.7461 28.271C76.0783 29.2739 77.6894 29.5405 77.1701 29.7754C78.5374 36.256 79.5709 40.2611 79.5444 40.7245C79.4225 41.575 78.8448 44.0822 78.8713 42.8445C78.813 42.8064 78.7812 42.616 78.813 42.2669C78.4791 42.9651 76.6931 42.616 75.8928 43.2698C69.9942 42.3431 63.6079 47.2051 56.3419 45.8912C48.4346 45.3517 40.8983 47.5479 34.4167 45.2565C29.0904 46.088 25.0732 42.4637 21.6071 42.6541C20.3617 41.2259 19.7257 41.264 19.4872 41.4227C19.7734 40.8639 19.9761 40.2496 20.0861 39.6074C21.7608 28.563 24.5273 24.6467 26.6578 18.9024C30.8976 11.0761 33.8019 7.18523 39.1229 8.30236C41.0096 8.22619 41.9795 6.72187 43.0765 7.80092C43.7125 9.19098 44.2319 5.40798 45.419 7.57241C46.0232 9.47661 47.6079 7.68667 47.1786 6.10618C47.6079 6.6457 49.3409 4.67803 49.7066 4.44953C51.6198 2.13276 51.0103 7.80092 52.2876 6.14427C52.3194 6.6457 52.8176 9.57182 53.9623 7.57241C53.9623 7.839 54.6301 9.47661 55.8755 7.72475C56.2094 6.98846 57.2164 7.87708 58.0961 7.95325C64.4559 10.1113 68.436 13.8182 71.3456 16.5539C71.4357 16.8586 72.6812 21.2953 73.9584 20.997C74.022 24.9324 75.9988 24.1199 76.4228 22.5394C76.735 21.9892 77.0097 21.4097 77.2443 20.8066C77.292 20.7787 77.3449 20.7656 77.398 20.7685C77.1807 20.7304 76.8203 20.4575 76.8203 19.0738V18.6104C76.7567 18.5342 76.7249 18.4962 76.6984 18.5342C76.7035 18.4541 76.6926 18.3736 76.6666 18.2994C77.0641 16.0651 75.3575 17.1061 75.543 16.1794C72.7447 13.596 70.5559 6.23313 66.2949 5.96654C63.8623 3.68785 60.126 2.2597 56.6281 3.34509C56.4479 1.02832 54.1372 0.806165 54.2856 2.22162C52.9288 0.86329 51.9378 1.6694 49.643 0.0889167C47.6079 -0.139587 46.9931 -0.101503 45.0534 2.40569C44.5658 4.36701 43.8079 4.56378 43.5005 4.06234C43.5906 4.90654 43.3468 5.49049 42.7427 3.42761C41.4336 3.54186 40.6757 5.62378 40.5538 3.65611C35.5667 4.65899 32.0371 6.19504 28.6028 9.67338C26.1384 15.9001 22.6724 17.982 21.093 22.1459C19.7522 24.6467 17.5634 33.1331 16.8055 38.084C16.7419 38.4712 16.6836 38.8584 16.6518 39.2392V39.7407C16.6782 40.0004 16.6235 40.2626 16.4981 40.477C16.3179 41.8226 16.0423 44.0251 15.8621 45.3707V45.4088C15.9204 45.7579 15.9204 46.2213 15.7985 46.1832C15.984 48.3032 16.4398 49.8075 15.5866 49.5727C15.5826 49.7044 15.563 49.8348 15.5283 49.9599C15.9204 53.8127 16.408 52.7717 17.0175 53.8508C16.8055 55.4376 19.1374 56.8213 19.0261 55.2027C19.784 57.8623 21.1831 57.2085 23.7376 56.8594C31.9152 58.9413 40.4585 61.6389 47.0567 59.4808C50.5863 57.748 56.5168 60.7503 60.1048 59.1C65.2138 58.4653 70.6566 60.6424 74.7905 57.0942C77.6788 54.0856 80.0902 57.729 81.5424 54.5553C83.5192 53.0129 84.399 54.13 83.8531 49.0395C84.3089 47.3194 83.6994 47.3194 83.7365 47.605ZM79.6345 50.7787C77.9597 51.972 75.5006 52.3591 73.2164 52.9368C68.0491 54.1681 62.85 54.2062 58.8646 54.7457C57.3171 55.0948 55.6105 54.7457 54.5771 54.8663C52.33 55.0948 51.6622 54.9806 49.7755 55.0568C42.1438 55.2091 34.9361 54.7838 28.3961 53.4001C25.5714 52.5115 23.0169 52.5877 20.0649 50.9691C19.8264 50.4676 18.7611 50.0424 19.0632 48.9633C19.6727 49.1982 19.0632 48.5 19.0632 48.7729C18.9648 48.4188 18.9385 48.0417 18.9864 47.6729C19.0343 47.3041 19.1552 46.9544 19.3388 46.6529C18.8088 46.6148 19.0049 46.4942 19.519 46.5767C19.519 46.6529 20.7962 46.7672 21.0082 46.9957C21.2202 47.2242 21.4375 47.3067 21.0983 46.9957C24.8635 48.4951 28.7916 49.327 32.7579 49.4648C40.3896 50.1566 46.3783 50.8548 52.7645 50.4296C61.3078 50.201 67.6304 49.6171 74.5679 48.0747C75.9034 47.44 77.4563 47.44 79.6133 46.4561C79.6716 46.418 79.7034 46.418 79.7352 46.4561C79.906 46.5499 80.0606 46.6812 80.1909 46.8433C79.6133 47.2686 79.8889 48.5381 80.281 49.0395C80.4665 48.7729 80.9223 49.8139 80.3446 49.7758C80.811 50.2074 79.8995 50.328 79.6557 50.8294L79.6345 50.7787ZM83.3443 40.7499L83.7365 40.4833C83.5457 39.7216 83.4874 40.4198 83.3655 40.8007L83.3443 40.7499ZM83.8319 46.2657C83.8388 46.3709 83.828 46.4767 83.8001 46.5767C83.8317 46.5509 83.8544 46.5123 83.8642 46.468C83.8739 46.4237 83.87 46.3766 83.8531 46.3355L83.8319 46.2657ZM78.9667 42.1907C78.9349 42.5017 78.9031 42.6922 78.9031 42.8255C79.0462 43.1174 79.5921 41.1117 78.9667 42.1907ZM49.7066 4.44318C50.2843 6.09983 50.4326 3.80845 49.7066 4.44318V4.44318ZM15.5283 49.5917H15.5866C15.7084 48.2397 14.9188 47.605 15.5283 49.5917ZM15.3693 46.0436C15.3428 46.6783 15.5866 47.624 15.5548 45.9293C15.4647 45.9674 15.4064 46.0436 15.3693 46.0436ZM0.323166 58.3066C-0.28631 60.2743 0.111174 58.5351 0.323166 58.3066V58.3066Z"
                                 fill="#6D1950"
                              />
                              <path
                                 d="M97.4736 61.7406C95.4067 64.7048 93.5518 66.5201 91.241 66.8185C85.4908 67.6309 79.8995 73.0261 76.3116 71.9471C69.5914 71.1791 63.449 76.6885 55.2979 74.486C54.4656 73.7384 53.4493 73.3439 52.4091 73.3646C51.3689 73.3852 50.364 73.82 49.5529 74.6003C44.2001 73.4451 41.0362 75.7555 35.0792 73.8703C28.3273 72.4803 22.0364 70.3983 15.2845 69.8207C13.0957 70.2841 12.6346 66.1202 13.1646 66.8502C13.4402 66.6598 16.4505 67.6246 16.0848 65.5807C21.0083 69.0527 26.6049 71.3631 34.6605 69.3891C41.1687 69.8525 48.4983 68.2339 56.5539 70.0239C67.1959 67.7896 76.1631 66.2155 85.1092 64.946C87.4464 63.8289 90.0327 64.2097 93.5305 60.3188C93.7783 58.9143 94.3471 57.6199 95.1735 56.5802C94.8078 55.3806 94.6435 52.2577 93.9227 53.1463C91.0343 49.3379 88.2679 46.4753 85.6551 45.9738C85.054 45.8215 84.433 45.8215 83.8319 45.9738V46.3356L83.6199 46.1833L83.3126 40.9023V40.8579L83.3444 40.8198L83.7365 40.5532C83.7683 40.7056 83.8319 40.9404 83.8902 41.2832C84.4202 41.7846 85.0456 42.286 85.6551 42.7875C88.6335 45.1804 92.1897 47.3385 94.4421 47.9923C96.562 49.998 96.085 52.5814 97.7863 52.08C99.1059 54.1809 99.7843 57.3038 97.4736 61.7406Z"
                                 fill="#BD4545"
                              />
                           </g>
                           <defs>
                              <clipPath id="clip0_1_7091">
                                 <rect width="99" height="75" fill="white" />
                              </clipPath>
                           </defs>
                        </svg>
                        <p className="text-[#6D1950] font-bold">{translate('Find_Guide')}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container bg-[#FDF9ED] mt-10 rounded-lg py-6 px-[120px] pb-[100px]">
            <div className=" flex ">
               <button onClick={() => navigate(-1)} className="w-[78px] flex items-center justify-center">
                  <svg width="78" height="65" viewBox="0 0 78 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M1 20C1 9.50659 9.50659 1 20 1H58C68.4934 1 77 9.50659 77 20V45C77 55.4934 68.4934 64 58 64H20C9.50659 64 1 55.4934 1 45V20Z"
                        fill="#FDF9ED"
                        stroke="#BD4545"
                        stroke-width="2"
                     />
                     <path d="M21 27.7L35 16V39.4L21 27.7Z" fill="#BD4545" />
                     <path
                        d="M44 23.7H32V31.7H44C46.8 31.7 49 33.9 49 36.7C49 39.5 46.8 41.7 44 41.7H41V49.7H44C51.2 49.7 57 43.9 57 36.7C57 29.5 51.2 23.7 44 23.7Z"
                        fill="#BD4545"
                     />
                  </svg>
               </button>
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
                     <svg width="44" height="53" viewBox="0 0 70 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M64.1667 0H5.83333C2.65417 0.116802 0.116667 2.65724 0 5.84009V46.7207C0.116667 49.9035 2.65417 52.444 5.83333 52.5608H64.1667C67.3458 52.444 69.8833 49.9035 70 46.7207V5.84009C69.9463 4.30831 69.3145 2.85388 68.232 1.77009C67.1494 0.68629 65.6967 0.0537447 64.1667 0ZM64.1667 46.7207H5.83333V5.84009H64.1667V46.7207ZM40.8333 40.8806V37.2305C40.8333 32.3833 31.0917 29.9304 26.25 29.9304C21.4083 29.9304 11.6667 32.3833 11.6667 37.2305V40.8806H40.8333ZM26.25 11.6802C24.3161 11.6802 22.4615 12.4493 21.094 13.8183C19.7266 15.1874 18.9583 17.0442 18.9583 18.9803C18.9583 19.9389 19.1469 20.8882 19.5134 21.7739C19.8798 22.6596 20.4169 23.4644 21.094 24.1422C22.4615 25.5113 24.3161 26.2804 26.25 26.2804C27.2076 26.2804 28.1557 26.0916 29.0404 25.7247C29.9251 25.3578 30.7289 24.8201 31.406 24.1422C32.0831 23.4644 32.6202 22.6596 32.9866 21.7739C33.3531 20.8882 33.5417 19.9389 33.5417 18.9803C33.5417 18.0216 33.3531 17.0723 32.9866 16.1866C32.6202 15.301 32.0831 14.4962 31.406 13.8183C30.7289 13.1404 29.9251 12.6027 29.0404 12.2359C28.1557 11.869 27.2076 11.6802 26.25 11.6802ZM40.8333 11.6802V14.6002H58.3333V11.6802H40.8333ZM40.8333 17.5203V20.4403H58.3333V17.5203H40.8333ZM40.8333 23.3603V26.2804H52.5V23.3603H40.8333Z"
                           fill="#BD4545"
                        />
                     </svg>

                     <div className="border-b border-[#000000] min-h-[32px] mb-3 w-full  text-[#6D1950]">
                        {data?.email}
                     </div>
                  </div>
                  <div className="flex items-end gap-4 w-[410px] mt-3">
                     <svg width="42" height="53" viewBox="0 0 42 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M21 0C9.40669 0 0 7.56852 0 16.8945C0 31.9119 21 52.5608 21 52.5608C21 52.5608 42 31.9119 42 16.8945C42 7.56852 32.5933 0 21 0ZM21 26.2804C19.3386 26.2804 17.7146 25.84 16.3332 25.0149C14.9518 24.1899 13.8752 23.0172 13.2394 21.6452C12.6036 20.2731 12.4373 18.7634 12.7614 17.3068C13.0855 15.8503 13.8855 14.5124 15.0603 13.4623C16.2351 12.4122 17.7318 11.697 19.3612 11.4073C20.9907 11.1176 22.6796 11.2663 24.2145 11.8346C25.7494 12.4029 27.0613 13.3653 27.9843 14.6001C28.9073 15.8349 29.4 17.2866 29.4 18.7717C29.3976 20.7625 28.5118 22.6711 26.937 24.0787C25.3622 25.4864 23.2271 26.2782 21 26.2804Z"
                           fill="#BD4545"
                        />
                     </svg>

                     <div className="border-b border-[#000000] min-h-[32px] mb-3 w-full text-[#6D1950]">Thủ đức</div>
                  </div>
                  <div className="flex items-end gap-4 w-[410px] mt-3">
                     <svg width="37" height="53" viewBox="0 0 37 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M33.6 5.63149H28.56V3.75433C28.5573 2.75953 28.2025 1.80633 27.5729 1.1029C26.9434 0.399469 26.0903 0.00297104 25.2 0H11.76C10.8697 0.00297104 10.0166 0.399469 9.38706 1.1029C8.75751 1.80633 8.40266 2.75953 8.4 3.75433V5.63149H3.36C2.46969 5.63447 1.61661 6.03096 0.987059 6.73439C0.357512 7.43782 0.00265898 8.39103 0 9.38582V48.8063C0.00265898 49.8011 0.357512 50.7543 0.987059 51.4577C1.61661 52.1611 2.46969 52.5576 3.36 52.5606H18.48V48.8063H3.36V9.38582H8.4V15.0173H28.56V9.38582H33.6V30.0346H36.96V9.38582C36.9573 8.39103 36.6025 7.43782 35.9729 6.73439C35.3434 6.03096 34.4903 5.63447 33.6 5.63149ZM25.2 11.263H11.76V3.75433H25.2V11.263Z"
                           fill="#BD4545"
                        />
                     </svg>

                     <div className="border-b border-[#000000] min-h-[32px] mb-3 w-full  text-[#6D1950]">
                        {data?.totalTour}
                     </div>
                  </div>
                  <div className="flex items-end gap-4 w-[410px] mt-3">
                     <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           d="M19.7499 1.975C19.9792 1.58158 20.3076 1.25515 20.7024 1.02828C21.0972 0.8014 21.5446 0.682007 21.9999 0.682007C22.4553 0.682007 22.9026 0.8014 23.2974 1.02828C23.6922 1.25515 24.0206 1.58158 24.2499 1.975L30.0728 11.9708L41.3812 14.4208C41.826 14.5175 42.2377 14.7291 42.5752 15.0344C42.9128 15.3398 43.1644 15.7284 43.305 16.1613C43.4456 16.5942 43.4703 17.0565 43.3765 17.5019C43.2828 17.9474 43.0739 18.3604 42.7707 18.7L35.0624 27.3271L36.2291 38.8375C36.2751 39.2907 36.2014 39.7481 36.0154 40.164C35.8294 40.5798 35.5375 40.9396 35.1689 41.2074C34.8004 41.4752 34.368 41.6416 33.915 41.69C33.462 41.7384 33.0042 41.6672 32.5874 41.4833L21.9999 36.8167L11.4124 41.4833C10.9956 41.6672 10.5378 41.7384 10.0848 41.69C9.63182 41.6416 9.19946 41.4752 8.83089 41.2074C8.46233 40.9396 8.17046 40.5798 7.98443 40.164C7.7984 39.7481 7.72472 39.2907 7.77074 38.8375L8.93741 27.3271L1.22907 18.7021C0.925382 18.3626 0.716065 17.9493 0.62202 17.5036C0.527975 17.0579 0.552492 16.5953 0.693124 16.162C0.833756 15.7287 1.08558 15.3399 1.42346 15.0344C1.76134 14.7288 2.17346 14.5173 2.61866 14.4208L13.927 11.9708L19.7499 1.975ZM21.9999 6.38958L17.1812 14.6646C16.999 14.9769 16.7537 15.2479 16.461 15.4602C16.1683 15.6726 15.8346 15.8216 15.4812 15.8979L6.12283 17.925L12.502 25.0646C12.9895 25.6104 13.2249 26.3354 13.152 27.0625L12.1874 36.5896L20.9499 32.7271C21.2808 32.5813 21.6384 32.506 21.9999 32.506C22.3615 32.506 22.719 32.5813 23.0499 32.7271L31.8124 36.5896L30.8478 27.0625C30.8112 26.7027 30.8499 26.3393 30.9614 25.9953C31.073 25.6513 31.2549 25.3344 31.4957 25.0646L37.877 17.925L28.5187 15.8979C28.1652 15.8216 27.8315 15.6726 27.5388 15.4602C27.2461 15.2479 27.0009 14.9769 26.8187 14.6646L21.9999 6.38958Z"
                           fill="#BD4545"
                        />
                     </svg>

                     <div className="border-b border-[#000000] min-h-[32px] mb-3 w-full  text-[#6D1950]">
                        {data?.rating} / 5
                     </div>
                  </div>
               </div>
               <div className="col-span-1 ">
                  <div className="border h-full px-[75px] py-[36px] border-[#000000]">
                     <p className="text-[24px] font-bold text-[#6D1950]">{translate('ExperiContinueence')}</p>
                     <ul className="ml-10">
                        <li className="text-[#6D1950] text-lg font-bold list-disc">Có nhiều năm kinh nghiệm</li>
                        <li className="text-[#6D1950] text-lg font-bold list-disc">Vui vẻ hoạt bát</li>
                        <li className="text-[#6D1950] text-lg font-bold list-disc">Có kiến thức địa lý tốt</li>
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
