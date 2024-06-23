import { PaginatedItems, useConfirm } from '@components';
import { SETTINGS_CONFIG, serviceApi } from '@configs';
import { cn, priceFormat } from '@helpers';
import { useSearchParamsHook } from '@hooks';
import { format } from 'date-fns';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import Modal from './components/modal';
import { number } from 'yup';

const payMentMethod = ['Tiền mặt', 'Chuyển khoản'] as const;

export const bookingMethod = [
   {
      number: 0,
      key: 'Pending',
      title: 'Pending',
      border: 'border-gray-800',
      text: 'text-gray-800',
   },
   {
      number: 1,
      key: 'Confirmed',
      title: 'Xác nhận',
      border: 'border-yellow-400',
      text: 'text-yellow-400',
   },
   {
      number: 2,
      key: 'Cancelled',
      title: 'Hủy',
      border: 'border-red-700',
      text: 'text-red-700',
   },
   {
      number: 3,
      key: 'Completed',
      title: 'Hoàn thành',
      border: 'border-green-700',
      text: 'text-green-700',
   },
] as const;

export const Booking = () => {
   const { searchParams, setParams } = useSearchParamsHook();

   const coreConfirm = useConfirm();

   const { data, refetch } = useQuery(['getBooking', searchParams['page']], async () => {
      const page = searchParams['page'] ? String(searchParams['page']) : '1';

      const res = await serviceApi.request.get('bookings-filter?pageNumber=' + page);
      return res.data;
   });

   const handleSubmitPayCompleted = async (id: string) => {
      coreConfirm({
         title: 'Xác nhận',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận đã thanh toán hóa đơn',
         callbackOK: async () => {
            await serviceApi.request
               .put(`bookings/${id}/status?status=1`, {})
               .then((response: any) => {
                  if (response.isSuccess) {
                     refetch();
                     return toast.success(response.message);
                  }
                  return toast.error(response.message);
               })
               .catch((error) => {
                  console.log(error);
               });
         },
      });
   };

   const handleClickModal = (bookingId: string | undefined = undefined) => {
      bookingId && setParams('bookingId', bookingId);
   };

   return (
      <div className="grid grid-cols-4 gap-x-4 w-full">
         <div className="col-span-4 bg-white rounded-2xl">
            <div className="p-5 border-b border-[#E1E1E1]">Listed Guides</div>
            <div className="p-5">
               <table className="w-full table-auto">
                  <thead>
                     <tr className="">
                        <th className="p-2 text-left">Tên khách hàng</th>
                        <th className="p-2 text-left">Tên hướng dẫn</th>
                        <th className="p-2 text-left">Ngày đi tour</th>
                        <th className="p-2 text-left">Thời gian bắt đầu</th>
                        <th className="p-2 text-left">Thanh toán</th>
                        <th className="p-2 text-left">Trạng thái</th>
                        <th className="p-2 text-left">Tổng tiền</th>
                        <th className="p-2 text-left">Ngày đặt phòng</th>
                     </tr>
                  </thead>
                  <tbody className="">
                     {data?.items?.map((item: any) => {
                        return (
                           <tr
                              key={item.id}
                              className="group  cursor-pointer rounded-3xl"
                              onClick={() => handleClickModal(item.id)}
                           >
                              <td className="p-2">
                                 <div className="flex items-center gap-x-2">
                                    <div className="">{item.customerName}</div>
                                 </div>
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.guideName}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {format(item.bookingDate, 'MM-dd-yyyy')}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.startTime}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {payMentMethod[0] === payMentMethod[item.paymentMethod] ? (
                                    <button
                                       type="button"
                                       className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none rounded-full focus:ring-gray-300 font-medium text-sm px-5 py-1 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                    >
                                       {payMentMethod[item.paymentMethod]}
                                    </button>
                                 ) : (
                                    <button
                                       type="button"
                                       className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 rounded-full"
                                    >
                                       {payMentMethod[item.paymentMethod]}
                                    </button>
                                 )}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 <button
                                    type="button"
                                    className={cn(
                                       `border ${bookingMethod[item.status].border} ${
                                          bookingMethod[item.status].text
                                       } font-medium text-sm px-5 py-1 rounded-full text-center dark:border-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900`,
                                    )}
                                 >
                                    {bookingMethod[item.status].title}
                                 </button>
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {priceFormat(item.totalAmount)}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {format(item.bookingDate, 'MM-dd-yyyy')}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {/* {payMentMethod[item.paymentMethod] === payMentMethod[1] &&
                                    bookingMethod[item.status] !== bookingMethod[1] && (
                                       <button
                                          className="hover:bg-gray-300 p-1 rounded-xl"
                                          onClick={() => handleSubmitPayCompleted(item.id)}
                                       >
                                          <img
                                             className="w-3"
                                             src="https://cdn-icons-png.flaticon.com/512/1055/1055183.png"
                                             alt=""
                                          />
                                       </button>
                                    )} */}
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
               <Modal refetch={refetch} />
               <div className="flex justify-end">
                  <PaginatedItems total_page={data?.totalPagesCount || 1} />
               </div>
            </div>
         </div>
      </div>
   );
};
