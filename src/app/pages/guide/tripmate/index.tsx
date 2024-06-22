import { useSearchParamsHook } from '@hooks';
import '../style/index.css';
import { PaginatedItems, useConfirm } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { serviceApi } from '@configs';
import { toast } from 'react-toastify';
import { cn, priceFormat } from '@helpers';
import { format } from 'date-fns';
import Modal from '@pages/admin/booking/components/modal';

const payMentMethod = ['Tiền mặt', 'Chuyển khoản'] as const;

const bookingMethod = [
   {
      key: 'Pending',
      title: 'Pending',
      border: 'border-gray-800',
      text: 'text-gray-800',
   },
   {
      key: 'Confirmed',
      title: 'Đã xác nhận',
      border: 'border-yellow-400',
      text: 'text-yellow-400',
   },
   {
      key: 'Cancelled',
      title: 'Đã hủy',
      border: 'border-red-700',
      text: 'text-red-700',
   },
   {
      key: 'Completed',
      title: 'Hoàn thành',
      border: 'border-green-700',
      text: 'text-green-700',
   },
] as const;

export const Tripmate = () => {
   const { searchParams, setParams } = useSearchParamsHook();

   const coreConfirm = useConfirm();

   const { data, refetch } = useQuery(['getBooking', searchParams['page']], async () => {
      const page = searchParams['page'] ? String(searchParams['page']) : '1';

      const res = await serviceApi.request.get('bookings-guide-filter?pageNumber=' + page);

      return res.data;
   });

   const { mutate } = useMutation({
      mutationKey: ['putBookingStatus'],
      mutationFn: async (id: string) => {
         const res = await serviceApi.request.put(`bookings/${id}/status?status=1`);
         return res.data;
      },
      onSuccess: (data) => {
         if (data.isSuccess) {
            refetch();
            return toast.success(data.message);
         }
         return toast.error(data.message);
      },
   });

   const handleSubmitPayCompleted = async (id: string) => {
      coreConfirm({
         title: 'Xác nhận',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận đã thanh toán hóa đơn',
         callbackOK: async () => {
            mutate(id);
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
                        <th className="p-2 text-left">Ngày đi tour</th>
                        <th className="p-2 text-left">Bắt đầu</th>
                        <th className="p-2 text-left">Thanh toán</th>
                        <th className="p-2 text-left">Trạng thái</th>
                        <th className="p-2 text-left">Tổng tiền</th>
                        <th className="p-2 text-left">Ngày tạo</th>
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
                                 {format(item.bookingDate, 'MM-dd-yyyy')}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.startTime}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {payMentMethod[0] === payMentMethod[item.paymentMethod] ? (
                                    <button
                                       type="button"
                                       className="text-gray-900 border border-gray-800 focus:ring-4 focus:outline-none rounded-full focus:ring-gray-300 font-medium text-sm px-5 py-1 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:focus:ring-gray-800"
                                    >
                                       {payMentMethod[item.paymentMethod]}
                                    </button>
                                 ) : (
                                    <button
                                       type="button"
                                       className="text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800 rounded-full"
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

   // return (
   //    <div>
   //       <div className="min-h-screen bg-gray-100 p-4">
   //          <div className="mt-6 bg-white  border border-[#0000001a] rounded-md shadow-md">
   //             <div className="flex justify-between items-center mb-4 border-b-[2px] border-b-[#0000001a] p-6">
   //                <div className="flex items-center gap-2">
   //                   <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
   //                      <rect y="0.593994" width="50" height="49.8539" rx="4" fill="#BD4545" />
   //                      <mask
   //                         id="mask0_1_8484"
   //                         style={{
   //                            maskType: 'luminance',
   //                         }}
   //                         maskUnits="userSpaceOnUse"
   //                         x="0"
   //                         y="0"
   //                         width="50"
   //                         height="51"
   //                      >
   //                         <rect y="0.593994" width="50" height="49.8539" rx="4" fill="white" />
   //                      </mask>
   //                      <g mask="url(#mask0_1_8484)">
   //                         <path
   //                            d="M28.4273 22.1035H24.9999H21.5724C19.6874 22.1035 18.145 23.6413 18.145 25.5209V30.647C18.145 31.2736 18.4306 31.8431 18.8305 32.2418C19.2304 32.6405 19.8016 32.9253 20.43 32.9253V38.0514C20.43 39.931 21.9723 41.4688 23.8574 41.4688H24.9999H26.1423C28.0274 41.4688 29.5698 39.931 29.5698 38.0514V32.9253C30.1981 32.9253 30.7693 32.6975 31.1692 32.2418C31.5691 31.8431 31.8547 31.2736 31.8547 30.647V25.5209C31.8547 23.6413 30.3124 22.1035 28.4273 22.1035Z"
   //                            fill="white"
   //                         />
   //                         <path
   //                            d="M24.9996 19.8253C27.208 19.8253 28.9983 18.0402 28.9983 15.8383C28.9983 13.6363 27.208 11.8513 24.9996 11.8513C22.7912 11.8513 21.001 13.6363 21.001 15.8383C21.001 18.0402 22.7912 19.8253 24.9996 19.8253Z"
   //                            fill="white"
   //                         />
   //                         <path
   //                            d="M16.774 35.0327C16.6598 34.9187 16.4884 34.8048 16.3742 34.6909C15.2888 33.5518 14.6605 32.1279 14.6605 30.647V25.5209C14.6605 23.6983 15.4031 21.9896 16.6027 20.7935C16.9454 20.4517 16.6598 19.8252 16.2028 19.8252C15.2317 19.8252 14.1463 19.8252 14.1463 19.8252H10.7189C8.83384 19.8252 7.2915 21.363 7.2915 23.2426V28.3687C7.2915 28.9952 7.57712 29.5648 7.97699 29.9635C8.37685 30.3622 8.94809 30.647 9.57645 30.647V35.7731C9.57645 37.6527 11.1188 39.1905 13.0039 39.1905H14.1463H15.2888C15.8029 39.1905 16.2599 39.0766 16.6598 38.9057C16.8883 38.7918 17.0025 38.6209 17.0025 38.3931C17.0025 37.7096 17.0025 36.1148 17.0025 35.4883C17.0025 35.3174 16.9454 35.1466 16.774 35.0327Z"
   //                            fill="white"
   //                         />
   //                         <path
   //                            d="M14.1461 17.5469C16.3545 17.5469 18.1448 15.7619 18.1448 13.56C18.1448 11.358 16.3545 9.573 14.1461 9.573C11.9377 9.573 10.1475 11.358 10.1475 13.56C10.1475 15.7619 11.9377 17.5469 14.1461 17.5469Z"
   //                            fill="white"
   //                         />
   //                         <path
   //                            d="M39.2807 19.8252H35.8533C35.8533 19.8252 34.7679 19.8252 33.7968 19.8252C33.2827 19.8252 33.0542 20.3948 33.3969 20.7935C34.5965 22.0465 35.3391 23.6983 35.3391 25.5209V30.647C35.3391 32.1279 34.7679 33.5518 33.6254 34.6909C33.5112 34.8048 33.3969 34.9187 33.2256 35.0327C33.1113 35.1466 32.9971 35.3174 32.9971 35.4883C32.9971 36.1148 32.9971 37.6527 32.9971 38.3931C32.9971 38.6209 33.1113 38.8488 33.3398 38.9057C33.7397 39.0766 34.1967 39.1905 34.7108 39.1905H35.8533H36.9957C38.8808 39.1905 40.4231 37.6527 40.4231 35.7731V30.647C41.0515 30.647 41.6227 30.4192 42.0226 29.9635C42.4225 29.5648 42.7081 28.9952 42.7081 28.3687V23.2426C42.7081 21.363 41.1658 19.8252 39.2807 19.8252Z"
   //                            fill="white"
   //                         />
   //                         <path
   //                            d="M35.8531 17.5469C38.0615 17.5469 39.8518 15.7619 39.8518 13.56C39.8518 11.358 38.0615 9.573 35.8531 9.573C33.6448 9.573 31.8545 11.358 31.8545 13.56C31.8545 15.7619 33.6448 17.5469 35.8531 17.5469Z"
   //                            fill="white"
   //                         />
   //                      </g>
   //                   </svg>

   //                   <div>
   //                      <h1 className="text-xl font-bold text-[#6D1950]">Tripmate's Guide</h1>
   //                      <p className="text-2xl text-[#BD4545]">Name of Tripmate's Guide</p>
   //                   </div>
   //                </div>
   //                <div className="flex items-center gap-2">
   //                   <div className="h-8 rounded-full w-20 ">
   //                      <label className="switch">
   //                         <input type="checkbox" />
   //                         <span className="slider round"></span>
   //                      </label>
   //                   </div>
   //                   <span className="text-xl text-purple-800 mr-2">Inactive</span>
   //                </div>
   //             </div>
   //             <div className="flex items-center gap-20 mb-4 px-6 border-b-[2px] border-b-[#0000001a] pb-3 ">
   //                <div>
   //                   <p className="text-sm text-[#6D1950] font-semibold">Status</p>
   //                   <p className="text-lg text-[#BD4545] font-bold">Pending Review</p>
   //                </div>
   //                <div>
   //                   <p className="text-sm text-[#6D1950] font-semibold">First contact date</p>
   //                   <p className="text-lg text-[#BD4545] font-bold">25-Dec-2023</p>
   //                </div>
   //                <div>
   //                   <p className="text-sm text-[#6D1950] font-semibold">Onboarding</p>
   //                   <p className="text-lg text-[#BD4545] font-bold">?</p>
   //                </div>
   //             </div>

   //             <div className="flex items-center mb-6 px-6">
   //                <div className="flex-1">
   //                   <p className="text-center min-h-[24px] mb-2">27/06/2023 </p>
   //                   <div className=" bg-green-500 px-4 py-2 rounded-l-[20px] text-center text-[#6D1950] font-bold">
   //                      Interview & Document Request
   //                   </div>
   //                   <div className="min-h-[24px] text-center mt-2 text-sm text-[#78B28D]">
   //                      <a href="">Send again</a>
   //                   </div>
   //                </div>
   //                <div className="flex-1">
   //                   <p className="text-center min-h-[24px] mb-2">27/06/2023 </p>
   //                   <div className=" bg-yellow-500  px-4 py-2 text-center text-[#6D1950] font-bold">Training</div>
   //                   <div className="min-h-[24px] text-center mt-2 text-sm text-[#78B28D]">
   //                      <a href=""></a>
   //                   </div>
   //                </div>
   //                <div className="flex-1">
   //                   <div className="text-center min-h-[24px] mb-2"></div>
   //                   <div className=" bg-gray-300 px-4 py-2 text-center text-[#6D1950] font-bold">Final approach</div>
   //                   <div className="min-h-[24px] text-center mt-2 text-sm text-[#78B28D]">
   //                      <a href=""></a>
   //                   </div>
   //                </div>
   //                <div className="flex-1">
   //                   <div className="text-center min-h-[24px] mb-2"></div>
   //                   <div className=" bg-gray-300 px-4 py-2 rounded-r-[20px] text-center text-[#6D1950] font-bold">
   //                      Account Setup
   //                   </div>
   //                   <div className="min-h-[24px] text-center mt-2 text-sm text-[#78B28D]">
   //                      <a href=""></a>
   //                   </div>
   //                </div>
   //             </div>
   //          </div>

   //          <div className="border-[#0000001a] shadow-md mt-6 bg-white rounded-lg">
   //             <div className="flex  px-6 py-3 border-b border-b-[#0000001a]">
   //                <button className="px-4 py-2 text-[#BD4545] font-bold text-xl">Details</button>
   //                <button className="px-4 py-2 text-[#BD4545] font-medium text-xl">Document Request</button>
   //                <button className="px-4 py-2 text-[#BD4545] font-medium text-xl">Training</button>
   //                <button className="px-4 py-2 text-[#BD4545] font-medium text-xl">Account Setup</button>
   //                <button className="px-4 py-2 text-[#BD4545] font-medium text-xl">Status</button>
   //                <button className="px-4 py-2 text-[#BD4545] font-medium text-xl">Notes</button>
   //             </div>

   //             <div className="px-6 pb-6  mt-6">
   //                <div className="grid grid-cols-3 gap-4">
   //                   <div className="col-span-1 text-[#6D1950] mt-3">
   //                      <p className="text-sm font-bold">Contact Name</p>
   //                      <p className="text-lg font-bold">Nguyen Dang Quang</p>
   //                   </div>
   //                   <div className="col-span-1 text-[#6D1950] mt-3">
   //                      <p className="text-sm font-bold">Address</p>
   //                      <p className="text-lg font-bold">District 8, Thu Duc City</p>
   //                   </div>
   //                   <div className="col-span-1 text-[#6D1950] mt-3">
   //                      <p className="text-sm font-bold">Country</p>
   //                      <p className="text-lg font-bold">Viet Nam</p>
   //                   </div>
   //                   <div className="col-span-1 text-[#6D1950] mt-3">
   //                      <p className="text-sm font-bold">Citizen Identification Card:</p>
   //                      <p className="text-lg font-bold">08xxxxxxxxxx</p>
   //                   </div>
   //                   <div className="col-span-1 text-[#6D1950] mt-3">
   //                      <p className="text-sm font-bold">Role Of Title</p>
   //                      <p className="text-lg font-bold">Student</p>
   //                   </div>
   //                   <div className="col-span-1 text-[#6D1950] mt-3">
   //                      <p className="text-sm font-bold">Guide Type</p>
   //                      <p className="text-lg font-bold">Parttime</p>
   //                   </div>
   //                   <div className="col-span-1 text-[#6D1950] mt-3">
   //                      <p className="text-sm font-bold">Contact Phone:</p>
   //                      <p className="text-lg font-bold">+84 939366060</p>
   //                   </div>
   //                   <div className="col-span-1 text-[#6D1950] mt-3">
   //                      <p className="text-sm font-bold">Operating Range</p>
   //                      {/* <p className="text-lg font-bold">01-Jan-1990</p> */}
   //                      <select className="text-[#6D1950] border border-[#6D1950] px-1 py-1 rounded-lg w-[150px] mt-2">
   //                         <option value="">District 9</option>
   //                      </select>
   //                   </div>
   //                </div>
   //             </div>
   //          </div>
   //       </div>
   //    </div>
   // );
};
