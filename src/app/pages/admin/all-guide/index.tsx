import { PaginatedItems, useConfirm } from '@components';
import { SETTINGS_CONFIG, serviceApi } from '@configs';
import { SvgIcon, cn } from '@helpers';
import { dateFormat } from '@helpers';
import { useOnClickOutside, useSearchParamsHook } from '@hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const AllGuide = () => {
   const { searchParams } = useSearchParamsHook();
   const coreConfirm = useConfirm();

   const { data: guideDetail, refetch } = useQuery(['getGuildPagination', searchParams['page']], async () => {
      const page = searchParams['page'] ? String(searchParams['page']) : '1';

      const res = await serviceApi.request.get('guides?pageIndex=' + page);
      return res.data;
   });
console.log(guideDetail);
   const [open, setOpen] = useState(false);

   const { data, mutate } = useMutation({
      mutationFn: async (id: string) => {
         const res = await serviceApi.request.get(`guides/${id}`);
         return res.data;
      },
      onSuccess: (data) => {
         return data;
      },
   });

   const { mutate: handleBanGuide } = useMutation({
      mutationFn: async () => {
         const res = await serviceApi.request.put(`admin/guides/${data?.id}/ban`);
         return res.data;
      },
      onSuccess: (data) => {
         refetch();
         setOpen(false);
         return data;
      },
   });

   const handleOfBirth = (birth: Date) => {
      const dob = new Date(birth);

      // Ngày hiện tại
      let currentDate = new Date();
      // Tính tuổi
      return currentDate.getFullYear() - dob.getFullYear();
   };

   const handleConfirmBan = (name: string) => {
      coreConfirm({
         title: 'Khóa tài khoản',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận khóa tài khoản guide ' + name,
         callbackOK: async () => {
            handleBanGuide();
         },
      });
   };

   return (
      <div className="grid grid-cols-4 gap-x-4 w-full">
         <div className={cn('col-span-3 bg-white rounded-2xl shadow-lg', { 'col-span-4': !open })}>
            <div className="p-5 border-b border-[#E1E1E1]">Listed Guides</div>
            <div className="p-5 h-[calc(100%-70px)] flex flex-col justify-between">
               <table className="w-full table-auto">
                  <thead>
                     <tr className="">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">languages</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Bookings</th>
                        <th className="p-2 text-left">Rating</th>
                     </tr>
                  </thead>
                  <tbody className="">
                     {guideDetail?.map((item: any) => {
                        return (
                           <tr
                              onClick={() => {
                                 setOpen(true);
                                 mutate(item.id);
                              }}
                              key={item.id}
                              className="group hover:bg-[#F0D171] cursor-pointer rounded-3xl"
                           >
                              <td className="p-2">
                                 <div className="flex items-center gap-x-2">
                                    <img className="w-8 h-8 rounded-full" src={item.imageURL} alt="" />
                                    <div className="">
                                       <p className="text-[14px] group-hover:text-[#050F24]">{item.fullName}</p>
                                       <p className="text-[12px] text-[#6F757E] group-hover:text-[#050F24]">
                                          roselle@gmail.com
                                       </p>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.languages}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.status}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">{item.totalTour}</td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.rating}/5
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
               <div className="flex justify-end">
                  <PaginatedItems total_page={guideDetail?.totalPagesCount || 1} />
               </div>
            </div>
         </div>
         {open && data && (
            <div className="col-span-1">
               <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                  <div className="text-center mb-4">
                     <p className="text-gray-500">ID: {data?.id}</p>
                     <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                        <img src={data?.imageURL} alt="Profile Picture" className="w-full h-full object-cover" />
                     </div>
                     <h2 className="text-xl font-semibold">{data?.fullName}</h2>
                  </div>

                  <div className="flex justify-center space-x-4 mb-4">
                     <button className="bg-yellow-100 p-2 rounded-full">
                        <svg
                           className="w-6 h-6"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              fillRule="evenodd"
                              d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                              clipRule="evenodd"
                           />
                           <path
                              fillRule="evenodd"
                              d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </button>
                     <button className="bg-yellow-100 p-2 rounded-full">
                        <svg
                           className="w-6 h-6"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                        </svg>
                     </button>
                     <button className="bg-yellow-100 p-2 rounded-full">
                        <svg
                           className="w-6 h-6"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              fillRule="evenodd"
                              d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </button>
                     <button className="bg-yellow-100 p-2 rounded-full">
                        <svg
                           className="w-6 h-6"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.541A5.965 5.965 0 0 1 14 10v4a1 1 0 1 1-2 0v-4c0-2.206-1.794-4-4-4-.075 0-.148.012-.22.028C7.686 6.022 7.596 6 7.5 6A4.505 4.505 0 0 0 3 10.5V16a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h5a1 1 0 0 0 1-1v-6c0-2.206-1.794-4-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z" />
                        </svg>
                     </button>
                  </div>

                  <div className="mb-4">
                     <h3 className="text-lg font-semibold mb-2">About</h3>
                     <p className="text-gray-600 text-[14px]">{data?.bio}</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-1 gap-y-2 flex items-start justify-center flex-col">
                        <div className="font-bold">Age</div>
                        <span className="text-[14px] text-[#6F757E]">{handleOfBirth(data?.dateOfBirth)}</span>
                     </div>
                     <div className="flex-1 gap-y-2 flex items-start justify-center flex-col">
                        <div className="font-bold">Gendar</div>
                        <span className="text-[14px] text-[#6F757E]">{data?.gender}</span>
                     </div>
                  </div>
                  <div className="flex gap-4 mt-3">
                     <div className="flex-1 gap-y-2 flex items-start justify-start flex-col">
                        <div className="font-bold">Date of birth</div>
                        <span className="text-[14px] text-[#6F757E]">{dateFormat(data?.dateOfBirth)}</span>
                     </div>
                     <div className="flex-1 gap-y-2 flex items-start justify-start flex-col">
                        <div className="font-bold">Address</div>
                        <span className="text-[14px] text-[#6F757E]">{data?.address}</span>
                     </div>
                  </div>

                  <div className="flex justify-center items-center mt-3 gap-2">
                     <button
                        type="button"
                        className="focus:outline-none w-[150px] text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                        onClick={() => setOpen(false)}
                     >
                        Exit
                     </button>

                     <button
                        type="button"
                        className="text-white w-[150px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => handleConfirmBan(data?.fullName)}
                     >
                        {data?.status}
                     </button>

                     {/* <button
                        className="bg-[#7771f0] w-[150px] text-[#6D1950] px-4 py-2 rounded-lg"
                        onClick={() => handleConfirmBan(data?.fullName)}
                     >
                        {data?.status}
                     </button> */}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
