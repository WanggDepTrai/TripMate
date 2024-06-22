import { SETTINGS_CONFIG, serviceApi } from '@configs';
import { cn } from '@helpers';
import { useLocalStorage, useSearchParamsHook } from '@hooks';
import { useMutation, useQuery } from '@tanstack/react-query';

import React from 'react';
import { bookingMethod } from '..';
import { useConfirm } from '@components';
import { toast } from 'react-toastify';

const Modal = React.forwardRef<HTMLDivElement, { refetch?: any }>(({ refetch }, ref) => {
   const { searchParams, deleteParams } = useSearchParamsHook();
   const { getLocalStorage } = useLocalStorage();

   const coreConfirm = useConfirm();

   const {
      data: bookingData,
      isLoading,
      error,
   } = useQuery(['getBookingDetail', searchParams['bookingId']], async () => {
      const res = await serviceApi.request.get('bookings/' + searchParams['bookingId']);
      return res.data;
   });

   const { mutate } = useMutation({
      mutationKey: ['putBookingStatus'],
      mutationFn: async (status: number) => {
         const id = searchParams['bookingId'];
         const res = await serviceApi.request.put(`bookings/${id}/status?status=${status}`);
         return res;
      },
      onSuccess: (data: any) => {
         if (data.isSuccess) {
            refetch();
            deleteParams('bookingId');
            return toast.success(data.message);
         }
         console.log(data.message);
         return toast.error(data.message);
      },
   });

   const { mutate: transaction } = useMutation({
      mutationKey: ['putTransactionsstatusAdmin'],
      mutationFn: async ({ id, status }: { id: string; status: number }) => {
         const res = await serviceApi.request.put(`transactions/${id}/status?status=${status}`);
         return res;
      },
      onSuccess: (data: any) => {
         if (data.isSuccess) {
            refetch();
            return toast.success(data.message);
         }
         return toast.error(data.message);
      },
   });

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error loading booking data.</div>;

   const {
      userBookingInformation,
      guideInformation,
      paymentMethod,
      bookingDate,
      startTime,
      totalHour,
      location,
      status,
      totalAmount,
   } = bookingData || {};

   const paymentMethodText = paymentMethod === 0 ? 'Credit Card' : 'Paypal';
   const formattedTotalAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
      totalAmount,
   );

   const handleSubmitStatusBooking = async (status: number) => {
      coreConfirm({
         title: 'Xác nhận',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận tour',
         callbackOK: async () => {
            mutate(status);
            // if(paymentMethod && paymentMethod === 1 ){
            //    transaction()
            // }
         },
      });
   };

   return (
      <div
         ref={ref}
         className={cn(
            'hidden fixed top-1/2 left-1/2 z-50 w-full h-screen justify-center items-center translate-x-[-50%] translate-y-[-50%] bg-[#888b9380]',
            {
               flex: searchParams['bookingId'],
            },
         )}
      >
         <div id="default-modal" className="min-w-[700px] overflow-y-auto overflow-x-hidden w-auto md:inset-0 h-auto">
            <div className="relative p-4 w-full max-h-full">
               <div className="relative  w-full bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex w-full items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Booking Detail</h3>
                     <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="default-modal"
                        onClick={() => deleteParams('bookingId')}
                     >
                        <svg
                           className="w-3 h-3"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 14 14"
                        >
                           <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                           />
                        </svg>
                        <span className="sr-only">Close modal</span>
                     </button>
                  </div>
                  <div className="space-y-4">
                     <div className="bg-white  rounded px-3 pt-6 pb-8 mb-4">
                        <div className="flex  gap-10 items-start justify-between">
                           <div className="mb-4">
                              <h3 className="text-gray-600 font-bold">User Information</h3>
                              <div className="flex flex-col gap-y-2 mt-3">
                                 <p className="text-gray-700 ">
                                    <span className="font-bold mr-3 !w-[80px]">Name: </span>
                                    <span>{userBookingInformation?.fullName}</span>
                                 </p>
                                 <p className="text-gray-700 ">
                                    <span className="font-bold mr-3 !w-[80px]">Email: </span>
                                    <span>{userBookingInformation?.email}</span>
                                 </p>
                                 <p className="text-gray-700 ">
                                    <span className="font-bold mr-3 !w-[80px]">Phone: </span>
                                    <span>{userBookingInformation?.phoneNumber}</span>
                                 </p>
                              </div>
                           </div>
                           <div className="mb-4">
                              <h3 className="text-gray-600 font-bold">Guide Information</h3>
                              <div className="flex flex-col gap-y-2 mt-3">
                                 <p className="text-gray-700 ">
                                    <span className="font-bold mr-3 !w-[80px]">Name: </span>
                                    <span>{guideInformation?.fullName}</span>
                                 </p>
                                 <p className="text-gray-700 ">
                                    <span className="font-bold mr-3 !w-[80px]">Email: </span>
                                    <span>{guideInformation?.email}</span>
                                 </p>
                                 <p className="text-gray-700 ">
                                    <span className="font-bold mr-3 !w-[80px]">Phone: </span>
                                    <span>{guideInformation?.phoneNumber}</span>
                                 </p>
                                 <p className="text-gray-700 ">
                                    <span className="font-bold mr-3 !w-[80px]">Gender: </span>
                                    <span>{guideInformation?.gender}</span>
                                 </p>
                                 <p className="text-gray-700 ">
                                    <span className="font-bold mr-3 !w-[80px]">Languages: </span>
                                    <span>{guideInformation?.languages}</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="mb-4">
                           <h3 className="text-gray-600 font-bold">Booking Information</h3>
                           <div className="grid grid-cols-2 gap-y-2 mt-4">
                              <div className="col-span-1">
                                 <div className="grid grid-cols-2">
                                    <div className="col-span-1">
                                       <p className="text-gray-700 font-bo">Date:</p>
                                    </div>
                                    <div className="col-span-1">
                                       {new Date(bookingDate).toLocaleDateString('vi-VN')}
                                    </div>
                                 </div>
                              </div>
                              <div className="col-span-1">
                                 <div className="grid grid-cols-2 gap-x-4">
                                    <div className="col-span-1">
                                       <p className="text-gray-700 font-bo">Start Time:</p>
                                    </div>
                                    <div className="col-span-1">{startTime}</div>
                                 </div>
                              </div>
                              <div className="col-span-1">
                                 <div className="grid grid-cols-2 gap-x-4">
                                    <div className="col-span-1">
                                       <p className="text-gray-700 font-bo">Total Hours:</p>
                                    </div>
                                    <div className="col-span-1">{totalHour}</div>
                                 </div>
                              </div>
                              <div className="col-span-1">
                                 <div className="grid grid-cols-2 gap-x-4">
                                    <div className="col-span-1">
                                       <p className="text-gray-700 font-bo">Location:</p>
                                    </div>
                                    <div className="col-span-1">{location}</div>
                                 </div>
                              </div>
                              <div className="col-span-1">
                                 <div className="grid grid-cols-2 gap-x-4">
                                    <div className="col-span-1">
                                       <p className="text-gray-700 font-bo">Status:</p>
                                    </div>
                                    <div className="col-span-1">
                                       <button
                                          type="button"
                                          className={cn(
                                             `border ${
                                                status ? bookingMethod[status > 2 ? status - 1 : status].border : ''
                                             } ${
                                                status ? bookingMethod[status > 2 ? status - 1 : status].text : ''
                                             } font-medium text-sm px-5 py-1 rounded-full text-center dark:border-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900`,
                                          )}
                                       >
                                          {status !== undefined
                                             ? bookingMethod[status > 2 ? status - 1 : status].title
                                             : ''}
                                       </button>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-span-1">
                                 <div className="grid grid-cols-2 gap-x-4">
                                    <div className="col-span-1">
                                       <p className="text-gray-700 font-bo">Payment Method:</p>
                                    </div>
                                    <div className="col-span-1">{paymentMethodText}</div>
                                 </div>
                              </div>
                              <div className="col-span-1">
                                 <div className="grid grid-cols-2 gap-x-4">
                                    <div className="col-span-1">
                                       <p className="text-gray-700 font-bo">Total Amount:</p>
                                    </div>
                                    <div className="col-span-1">{formattedTotalAmount}</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {getLocalStorage(SETTINGS_CONFIG.ROLE) && getLocalStorage(SETTINGS_CONFIG.ROLE) === 'Admin' && (
                     <div className="flex items-center p-4 md:p-5 border-t border-gray-200 justify-between rounded-b dark:border-gray-600">
                        {status && status !== 2 && (
                           <button
                              data-modal-hide="default-modal"
                              type="button"
                              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                              onClick={() => handleSubmitStatusBooking(bookingMethod[2].number)}
                           >
                              {bookingMethod[2].title}
                           </button>
                        )}

                        {status === 0 && (
                           <button
                              data-modal-hide="default-modal"
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => handleSubmitStatusBooking(bookingMethod[1].number)}
                           >
                              {bookingMethod[1].title}
                           </button>
                        )}

                        {status === 1 && (
                           <button
                              data-modal-hide="default-modal"
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => handleSubmitStatusBooking(3)}
                           >
                              {bookingMethod[3].title}
                           </button>
                        )}
                     </div>
                  )}

                  {getLocalStorage(SETTINGS_CONFIG.ROLE) && getLocalStorage(SETTINGS_CONFIG.ROLE) === 'Guide' && (
                     <div className="flex items-center p-4 md:p-5 border-t border-gray-200 justify-between rounded-b dark:border-gray-600">
                        {status && status !== 2 && (
                           <button
                              data-modal-hide="default-modal"
                              type="button"
                              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                              onClick={() => handleSubmitStatusBooking(bookingMethod[2].number)}
                           >
                              {bookingMethod[2].title}
                           </button>
                        )}
                        {status === 1 && (
                           <button
                              data-modal-hide="default-modal"
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => handleSubmitStatusBooking(3)}
                           >
                              {bookingMethod[3].title}
                           </button>
                        )}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
});

export default Modal;
