import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useI18n } from '@hooks';

import languages from '../i18n';
import { regexs } from '@utils';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { convertToDate } from '@helpers';
import type { GuidItem } from '..';
import { toast } from 'react-toastify';

const BookingGiude = ({ guides }: { guides: any }) => {
   const translate = useI18n(languages);

   const schema = yup.object({
      fullName: yup.string().required(translate('name_required')).default(''),
      email: yup
         .string()
         .required(translate('email_required'))
         .matches(regexs.email, translate('email_regex'))
         .default(''),
      phoneNumber: yup
         .string()
         .required(translate('phone_required'))
         .matches(regexs.phoneVn, translate('phone_regex'))
         .default(''),
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
      StartTime: yup.string().required(translate('start_time_required')),
      // .test('is-future-date', translate('start_time_must_be_future'), function (value) {
      //    if (value) {
      //       const currentDate = new Date();
      //       return new Date(value as unknown as Date) > currentDate;
      //    }

      //    return false;
      // }),
      totalHour: yup.number().required(translate('total_hour_required')).min(1, translate('total_hour_min')),
      Location: yup.string(),
      GuideID: yup.string().required(translate('Guide_required')),
   });

   type ValidationForm = yup.InferType<typeof schema>;

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<ValidationForm>({
      resolver: yupResolver(schema),
   });
   const onSubmit = async (data: ValidationForm) => {
      console.log(data.StartTime);
      await axios
         .post(process.env.VITE_API_URL + '/api/v1/bookings-guest', {
            ...data,
            paymentMethod: 0,
            // GuideID: '1cf4ec95-3664-418c-fd1a-08dc7fa35e5a',
            // StartTime: '00:00',
            BookingDate: convertToDate(new Date(data.BookingDate)),
         })
         .then((response) => {
            console.log(response);
            if (response.data.isSuccess) {
               reset();
               return toast.success(response.data.message);
            }

            return toast.error(response.data.message);
         })
         .catch((error) => {
            // handle errors
            console.log(error);
         });
   };

   const changeNumberAllow = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.value = event.target.value.replace(regexs.integer, '');
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-[567px] z-50 min-h-[632px] px-14 pt-10 bg-white rounded-[30px] flex flex-col gap-5 pb-2"
      >
         <div className="">
            <h3 className="text-[#6D1950] text-center text-xl font-bold">{translate('book_guide')}</h3>
         </div>
         <div className="w-full">
            <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
               {translate('fullName')}
            </label>
            <input
               type="text"
               className=" bg-transparent border border-transparent border-b w-full border-b-black  font-bold"
               placeholder={translate('fullName')}
               {...register('fullName')}
            />
            {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName?.message}</p>}
         </div>
         <div className="w-full">
            <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
               {translate('phone')}
            </label>
            <input
               type="text"
               className=" bg-transparent border border-transparent border-b w-full border-b-black  font-bold"
               placeholder={translate('phone')}
               {...register('phoneNumber')}
            />
            {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber?.message}</p>}
         </div>
         <div className="w-full">
            <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
               {translate('email')}
            </label>
            <input
               type="text"
               className=" bg-transparent border border-transparent border-b w-full border-b-black  font-bold"
               placeholder={translate('email')}
               {...register('email')}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>}
         </div>
         <div className="w-full ">
            <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
               {translate('booking_date')}
            </label>
            <input
               id="start-date"
               type="Date"
               className=" bg-transparent border border-transparent border-b w-full text-[#A2A9B4] border-b-black  font-bold"
               {...register('BookingDate')}
            />
            {errors.BookingDate && <p className="text-sm text-red-500 mt-1">{errors.BookingDate?.message}</p>}
         </div>
         <div className="w-full ">
            <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
               {translate('start_time')}
            </label>
            <input
               id="start-date"
               type="time"
               className=" bg-transparent border border-transparent border-b w-full text-[#A2A9B4] border-b-black  font-bold"
               {...register('StartTime')}
            />
            {errors.StartTime && <p className="text-sm text-red-500 mt-1">{errors.StartTime?.message}</p>}
         </div>
         <div className="w-full">
            <label htmlFor="end-date" className="block text-gray-700 text-sm font-bold mb-2">
               {translate('Guide')}
            </label>
            <select
               {...register('GuideID')}
               className=" bg-transparent border border-transparent border-b w-full text-[#A2A9B4] border-b-black  font-bold"
            >
               <option value=""></option>
               {guides?.items?.map((item: GuidItem) => (
                  <option value={item.id}>{item.fullName}</option>
               ))}
            </select>
            {errors.GuideID && <p className="text-sm text-red-500 mt-1">{errors.GuideID?.message}</p>}
         </div>
         <div className="w-full">
            <label htmlFor="end-date" className="block text-gray-700 text-sm font-bold mb-2">
               {translate('total_hour')}
            </label>
            <input
               id="end-date"
               type="text"
               className=" bg-transparent border border-transparent border-b w-full text-[#A2A9B4] border-b-black  font-bold"
               {...register('totalHour')}
               onInput={changeNumberAllow}
               placeholder={translate('total_hour')}
            />
            {errors.totalHour && <p className="text-sm text-red-500 mt-1">{errors.totalHour?.message}</p>}
         </div>
         <div className="w-full">
            <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
               {translate('location')}
            </label>

            <input
               type="text"
               className=" bg-transparent border border-transparent border-b w-full border-b-black  font-bold"
               placeholder={translate('location')}
               {...register('Location')}
            />
            {errors.Location && <p className="text-sm text-red-500 mt-1">{errors.Location?.message}</p>}
         </div>
         <div className="flex justify-center mt-4">
            <button
               type="submit"
               className="px-12 py-4 text-center font-bold text-[#F0D171] bg-[#BD4545] min-w-[300px] rounded-2xl"
            >
               Booking
            </button>
         </div>
      </form>
   );
};

export default BookingGiude;
