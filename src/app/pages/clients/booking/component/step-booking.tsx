import { useI18n } from '@hooks';
import languages from '../i18n';
import React from 'react';
import { useAuth } from '~/app/redux/slices';

const StepBooking = ({ handleNextStep }: any) => {
   const translate = useI18n(languages);

   const { user } = useAuth();
   
   return (
      <>
         <h1 className=" font-bold text-[#BD4545] text-[48px] mb-2">{translate('Booking_for_me')}</h1>
         <p className=" text-[#6D1950] font-medium text-[28px] mb-6">
            {translate('Fill_Information_And_Check_Validate')}
         </p>

         <div
            className="border border-[#0000001a] p-4 mb-6 rounded-md flex items-center"
            style={{
               boxShadow: '0px 4px 4px 0px #00000040',
            }}
         >
            <div className="bg-yellow-300 p-2 rounded-full mr-4">
               <svg
                  className="w-6 h-6 text-yellow-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M5.121 17.804A7.5 7.5 0 0118 10.5m-6.879 7.304A7.5 7.5 0 1118 10.5m-6.879 7.304l-4.95 1.414 1.414-4.95m0 0a7.5 7.5 0 010-10.607m0 0a7.5 7.5 0 0110.607 0m-10.607 0L12 12"
                  ></path>
               </svg>
            </div>
            <div>
               <p className="font-semibold text-yellow-700">
                  {translate('Login_with_name')} {user?.full_name}
               </p>
               <p className="text-sm text-yellow-700">{user?.email}</p>
            </div>
         </div>

         <section className="mb-6 ">
            <h2 className=" font-semibold text-[#BD4545] mb-2 text-[40px]">
               {translate('Contact_Information')} <span className="text-red-500">*</span>
            </h2>
            <div className="border border-[#0000001a] rounded-md shadow">
               <p className="font-semibold text-xl text-[#6D1950] mb-4 px-4 p-2 border-b border-b-[#0000001a]">
                  {translate('Contact_information_Receive_payment_invoice')}
               </p>
               <div className="grid grid-cols-2 gap-4 mb-4 p-4">
                  <div>
                     <label className="block text-xl font-medium text-[#6D1950] mb-1">
                        {translate('Fullname')} <span className="text-red-500">*</span>
                     </label>
                     <input type="text" className="w-full border shadow rounded-md p-2" />
                  </div>
                  <div>
                     <label className="block text-xl font-medium text-[#6D1950] mb-1">
                        {translate('Passport_or_CCCD')}{' '}
                     </label>
                     <input type="text" className="w-full border shadow rounded-md p-2" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                     <label className="block text-xl font-medium text-[#6D1950] mb-1">
                        {translate('Phonenumber')} <span className="text-red-500">*</span>
                     </label>
                     <div className="flex">
                        <div className="border shadow rounded-l-md p-2 w-[100px] flex items-center">
                           <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/320px-Flag_of_Vietnam.svg.png"
                              alt="Vietnam Flag"
                              className="w-6 h-4 mr-2"
                           />
                           <span>+84</span>
                        </div>
                        <input type="text" className="w-full border shadow rounded-r-md p-2" />
                     </div>
                  </div>
                  <div>
                     <label className="block text-xl font-medium text-[#6D1950] mb-1">
                        Email <span className="text-red-500">*</span>
                     </label>
                     <input type="email" className="w-full border shadow rounded-md p-2" />
                  </div>
               </div>
            </div>
         </section>

         <section className="mb-6">
            <h2 className="font-semibold text-[#BD4545] mb-2 text-[40px]">
               {translate('Passenger_information')} <span className="text-red-500">*</span>
            </h2>
            <div className="border border-[#0000001a] rounded-md shadow">
               <p className="font-semibold text-xl text-[#6D1950] mb-4 px-4 py-2 border-b border-b-[#0000001a]">
                  {translate('Passenger1')}
               </p>
               <div className="grid grid-cols-2 gap-4 mb-4 p-4">
                  <div>
                     <label className="block text-sm font-medium text-[#6D1950] mb-1">
                        {translate('Fullname')} <span className="text-red-500">*</span>
                     </label>
                     <input type="text" className="w-full border shadow rounded-md p-2" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-[#6D1950] mb-1">
                        {translate('Passport_or_CCCD')}{' '}
                     </label>
                     <input type="text" className="w-full border shadow rounded-md p-2" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                     <label className="block text-sm font-medium text-[#6D1950] mb-1">
                        {translate('Phonenumber')} <span className="text-red-500">*</span>
                     </label>
                     <div className="flex">
                        <div className="border shadow rounded-l-md p-2 w-[100px] flex items-center">
                           <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/320px-Flag_of_Vietnam.svg.png"
                              alt="Vietnam Flag"
                              className="w-6 h-4 mr-2"
                           />
                           <span>+84</span>
                        </div>
                        <input type="text" className="w-full border shadow rounded-r-md p-2" />
                     </div>
                  </div>
                  <div className="">
                     <label className="block text-sm font-medium text-[#6D1950] mb-1">
                        Email <span className="text-red-500">*</span>
                     </label>
                     <input type="email" className="w-full border shadow rounded-md p-2" />
                  </div>
               </div>
            </div>
         </section>
         <div className="flex justify-end">
            <button
               className="bg-red-700 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 transition duration-200 hover:bg-red-800"
               onClick={handleNextStep}
            >
               {translate('Continue')}
            </button>
         </div>
      </>
   );
};

export default StepBooking;
