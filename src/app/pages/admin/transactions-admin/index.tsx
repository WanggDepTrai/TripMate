import { PaginatedItems, useConfirm } from '@components';
import { serviceApi } from '@configs';
import { priceFormat } from '@helpers';
import { useSearchParamsHook } from '@hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const confirmContent = [
   'Xác nhận đã nhận được tiền từ Người dùng',
   'Xác nhận gửi tiền công cho Guide',
   'Xác nhận đã nhận được tiền từ Guide',
] as const;

export const TransactionAdmin = () => {
   const { searchParams } = useSearchParamsHook();

   const coreConfirm = useConfirm();

   const { data, refetch } = useQuery(['transactions-guide-filter', searchParams['page']], async () => {
      const page = searchParams['page'] ? String(searchParams['page']) : '1';

      const res = await serviceApi.request.get('transactions-filter?PageIndex=' + page);

      return res.data;
   });

   const { mutate: transaction } = useMutation({
      mutationKey: ['putTransactionsstatus'],
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
   const { mutate: transactionConfirm } = useMutation({
      mutationKey: ['putTransactionsstatus'],
      mutationFn: async (id: string) => {
         const res = await serviceApi.request.put(`transactions/${id}/confirm`);
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
   const handleSubmitConfirm = async (id: string) => {
      coreConfirm({
         title: 'Xác nhận',
         confirmOk: 'Xác nhận',
         content: confirmContent[2],
         callbackOK: async () => {
            transactionConfirm(id);
         },
      });
   };

   return (
      <div className="grid grid-cols-4 gap-x-4 w-full">
         <div className="col-span-4 bg-white rounded-2xl">
            <div className="p-5 border-b border-[#E1E1E1]">Listed Guides</div>
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
                              {/* <td className="p-2">
                                 <div className="flex items-center gap-x-2">
                                    <div className="">{item.bookingId}</div>
                                 </div>
                              </td> */}

                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.bookingStatus}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.sender}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.receiver}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.transactionType}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.status}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {priceFormat(item.amount)}
                              </td>

                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {/* Admin gửi tiền công cho guide với payMethod = chuyển khoản
                                  booking status === Confirmed, 
                                  transactionType === GuideFee 
                                  transaction status === Pending 
                                  */}
                                 {item.bookingStatus === 'Completed' &&
                                    item.transactionType === 'GuideFee' &&
                                    item.status === 'Pending' && (
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

                                 {/* Admin hủy gửi tiền công cho guide với 
                                  payMethod = chuyển khoản
                                  booking status === Cancelled, 
                                  transactionType === GuideFee 
                                  transaction status === Pending 
                                  */}
                                 {item.bookingStatus === 'Cancelled' &&
                                    item.transactionType === 'GuideFee' &&
                                    item.status === 'Pending' && (
                                       <button
                                          className="hover:bg-gray-300 p-1 rounded-xl"
                                          onClick={() => handleSubmitPayCompleted(item.id, 4)}
                                       >
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
                                                d="M6 18 18 6M6 6l12 12"
                                             />
                                          </svg>
                                       </button>
                                    )}

                                 {/* Admin xác nhận đã nhận được tiền từ guide => booking status === Completed, transactionType === GuideFee và transaction status === Pending */}
                                 {(item.bookingStatus === 'Completed' || item.bookingStatus === 'Cancelled') &&
                                    item.transactionType === 'PlatformFee' &&
                                    item.status === 'PendingConfirmed' && (
                                       <>
                                          <button
                                             className="hover:bg-gray-300 p-1 rounded-xl"
                                             onClick={() => handleSubmitPayCompleted(item.id, 2)}
                                          >
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 text-gray-800 dark:text-white"
                                             >
                                                <path
                                                   strokeLinecap="round"
                                                   strokeLinejoin="round"
                                                   d="m4.5 12.75 6 6 9-13.5"
                                                />
                                             </svg>
                                          </button>
                                          <button
                                             className="hover:bg-gray-300 p-1 rounded-xl"
                                             onClick={() => handleSubmitPayCompleted(item.id, 4)}
                                          >
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
                                                   d="M6 18 18 6M6 6l12 12"
                                                />
                                             </svg>
                                          </button>
                                       </>
                                    )}
                                 {/* Admin gửi tiền công cho guide => booking status === Confirmed, transactionType === GuideFee và transaction status === Pending */}
                                 {item.bookingStatus === 'Confirmed' &&
                                    item.transactionType === 'PlatformFee' &&
                                    item.status === 'PeddingConfirmed' && (
                                       <button
                                          className="hover:bg-gray-300 p-1 rounded-xl"
                                          onClick={() => handleSubmitConfirm(item.id)}
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
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                             />
                                          </svg>
                                       </button>
                                    )}
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
