import { PaginatedItems, useConfirm } from '@components';
import { serviceApi } from '@configs';
import { priceFormat } from '@helpers';
import { useSearchParamsHook } from '@hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const confirmContent = ['Xác nhận đã nhận được tiền từ Admin', 'Xác nhận gửi tiền cho Admin'] as const;

export const TransactionGuide = () => {
   const { searchParams } = useSearchParamsHook();

   const coreConfirm = useConfirm();

   const { data, refetch } = useQuery(['gettransactionsfilter', searchParams['page']], async () => {
      const page = searchParams['page'] ? String(searchParams['page']) : '1';

      const res = await serviceApi.request.get('transactions-guide-filter?pageIndex=' + page);

      return res.data;
   });

   const { mutate: transaction } = useMutation({
      mutationKey: ['putTransactionsstatus'],
      mutationFn: async ({ id, status }: { id: string; status: number }) => {
         const res = await serviceApi.request.put(`transactions/${id}/confirm?status=${status}`);
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

   const handleSubmitPayCompleted = async (id: string, status: number) => {
      coreConfirm({
         title: 'Xác nhận',
         confirmOk: 'Xác nhận',
         content: confirmContent[status],
         callbackOK: async () => {
            transaction({ id, status });
         },
      });
   };

   return (
      <div className="grid grid-cols-4 gap-x-4 w-full">
         <div className="col-span-4 bg-white rounded-2xl">
            <div className="p-5">
               <table className="w-full table-auto">
                  <thead>
                     <tr className="">
                        {/* <th className="p-2 text-left">BookingId</th> */}
                        <th className="p-2 text-left">Trạng thái tour</th>
                        <th className="p-2 text-left">Người gửi</th>
                        <th className="p-2 text-left">Người nhận</th>
                        <th className="p-2 text-left">Loại giao dịch</th>
                        <th className="p-2 text-left">Trạng thái</th>
                        <th className="p-2 text-left">Tổng tiền</th>
                        {/* <th className="p-2 text-left">Thao tác</th> */}
                     </tr>
                  </thead>
                  <tbody className="">
                     {data?.items?.map((item: any) => {
                        return (
                           <tr
                              key={item.id}
                              className="group  cursor-pointer rounded-3xl"
                              // onClick={() => handleClickModal(item.id)}
                           >
                              <td className="p-2 text-[#6F757E] group-hover:text-[#050F24]">{item.bookingStatus}</td>
                              <td className="p-2 text-[#6F757E] group-hover:text-[#050F24]">{item.sender}</td>
                              <td className="p-2 text-[#6F757E] group-hover:text-[#050F24]">{item.receiver}</td>
                              <td className="p-2 text-[#6F757E] group-hover:text-[#050F24]">{item.transactionType}</td>

                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.status}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {priceFormat(item.amount)}
                              </td>

                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {/* {item.bookingStatus === 'Completed' &&
                                    item.transactionType === 'GuideFee' &&
                                    item.status !== 'PeddingConfirmed' && (
                                       <button
                                          className="hover:bg-gray-300 p-1 rounded-xl"
                                          onClick={() => handleSubmitPayCompleted(item.id, 2)}
                                       >
                                          <img
                                             className="w-3"
                                             src="https://cdn-icons-png.flaticon.com/512/1055/1055183.png"
                                             alt=""
                                          />
                                       </button>
                                    )} */}

                                 {/* Guid xác nhận đã nhận tiền từ admin => booking status === Confirmed và transaction status === PeddingConfirmed */}
                                 {/* {item.bookingStatus === 'Completed' &&
                                    item.transactionType === 'PlatformFee' &&
                                    item.status === 'Pending' && (
                                       <button
                                          className="hover:bg-gray-300 p-1 rounded-xl"
                                          onClick={() => handleSubmitPayCompleted(item.id, 1)}
                                       >
                                          <img
                                             className="w-3"
                                             src="https://cdn-icons-png.flaticon.com/512/1055/1055183.png"
                                             alt=""
                                          />
                                       </button>
                                    )} */}
                                 {/* Guid gửi phí nền tảng cho admin (payMethod = tiền mặt)
                                  booking status === Completed (trang thái tour === Completed là bắt buộc),
                                  transaction status === Pending || Failed
                                  transaction Type === PlatformFee
                                  */}
                               
                                 {(item.bookingStatus === 'Completed' || item.bookingStatus === 'Cancelled') &&
                                    (item.status === 'Pending' || item.status === 'Failed') &&
                                    item.transactionType === 'PlatformFee' && (
                                       <button
                                          className="hover:bg-gray-300 p-1 rounded-xl"
                                          onClick={() => handleSubmitPayCompleted(item.id, 1)}
                                       >
                                          {/* <img
                                          className="w-3"
                                          src="https://cdn-icons-png.flaticon.com/512/1055/1055183.png"
                                          alt=""
                                       /> */}
                                          <svg
                                             className="w-6 h-6 text-gray-800 dark:text-white"
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 12H5m14 0-4 4m4-4-4-4"
                                             />
                                          </svg>
                                       </button>
                                    )}
                                 {/* Guid gửi tiền cho admin => booking status === Completed và transaction status === pending */}
                                 {(item.bookingStatus === 'Completed' || item.bookingStatus === 'Cancelled') &&
                                    item.transactionType === 'PlatformFee' &&
                                    item.status === 'Pending' && (
                                       <button
                                          className="hover:bg-gray-300 p-1 rounded-xl"
                                          onClick={() => handleSubmitPayCompleted(item.id, 1)}
                                       >
                                          <svg
                                             className="w-6 h-6 text-gray-800 dark:text-white"
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 12H5m14 0-4 4m4-4-4-4"
                                             />
                                          </svg>
                                       </button>
                                    )}
                                 {/* Hủy && trả lại tiền */}
                                 {/* {item.bookingStatus === 'Cancelled' &&
                                    item.transactionType === 'PlatformFee' &&
                                    item.status === 'PeddingConfirmed' && (
                                       <button
                                          className="hover:bg-gray-300 p-1 rounded-xl"
                                          onClick={() => handleSubmitPayCompleted(item.id, 2)}
                                       >
                                          <svg
                                             className="w-6 h-6 text-gray-800 dark:text-white"
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             fill="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                fill-rule="evenodd"
                                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                                                clip-rule="evenodd"
                                             />
                                          </svg>
                                       </button>
                                    )} */}
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
               <div className="flex justify-end">
                  <PaginatedItems total_page={data?.totalPagesCount || 1} />
               </div>
            </div>
         </div>
      </div>
   );
};
