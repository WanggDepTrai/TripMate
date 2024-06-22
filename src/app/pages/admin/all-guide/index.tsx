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

      const res = await serviceApi.request.get('guides-pagination?pageNumber=' + page);
      return res.data;
   });


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
                     {guideDetail?.items?.map((item: any) => {
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
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">31</td>
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
                        <SvgIcon name="message" className="h-6 w-6 text-yellow-500" />
                     </button>
                     <button className="bg-yellow-100 p-2 rounded-full">
                        <SvgIcon name="phone" className="h-6 w-6 text-yellow-500" />
                     </button>
                     <button className="bg-yellow-100 p-2 rounded-full">
                        <SvgIcon name="call-video" className="h-6 w-6 text-yellow-500" />
                     </button>
                     <button className="bg-yellow-100 p-2 rounded-full">
                        <SvgIcon name="email" className="h-6 w-6 text-yellow-500" />
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
