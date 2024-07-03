import { PaginatedItems } from '@components';
import { SETTINGS_CONFIG, serviceApi } from '@configs';
import { SvgIcon, cn } from '@helpers';
import { useSearchParamsHook } from '@hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const AllCustomer = () => {
   const [open, setOpen] = useState(false);
   const [customer, setCustomer] = useState<any>({});
   const { searchParams } = useSearchParamsHook();

   const { data: guideDetail, refetch } = useQuery(['getGuildCusotmer', searchParams['page']], async () => {
      const page = searchParams['page'] ? String(searchParams['page']) : '1';

      const res = await serviceApi.request.get('admin/customers?pageIndex=' + page, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem(SETTINGS_CONFIG.ACCESS_TOKEN_KEY)?.replace(/"/g, '')}`,
         },
      });
      return res.data;
   });

   const { mutate: handleBanGuide } = useMutation({
      mutationFn: async (id: string) => {
         const res = await serviceApi.request.put(`admin/customers/${id}/ban`);
         return res;
      },
      onSuccess: (data: any) => {
         console.log(data);
         refetch();
         setOpen(false);
         toast.success(data?.message);
         return data;
      },
   });

   return (
      <div className="grid grid-cols-4 gap-x-4 w-full">
         <div className={cn('col-span-3 bg-white rounded-2xl', { 'col-span-4': !open })}>
            <div className="p-5 border-b border-[#E1E1E1]">Listed Customers</div>
            <div className="p-5">
               <table className="w-full table-auto">
                  <thead>
                     <tr className="">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Phone</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Status</th>
                     </tr>
                  </thead>
                  <tbody className="">
                     {guideDetail?.items?.map((item: any) => {
                        return (
                           <tr
                              onClick={() => {
                                 setOpen(true);
                                 setCustomer(item);
                              }}
                              key={item.id}
                              className="group hover:bg-[#F0D171] cursor-pointer rounded-3xl"
                           >
                              <td className="p-2">
                                 <div className="flex items-center gap-x-2">
                                    <img className="w-8 h-8 rounded-full" src={item.imageURL} alt="" />
                                    <div className="">
                                       <p className="text-[14px] group-hover:text-[#050F24]">{item.fullName}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.phoneNumber}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.email}
                              </td>
                              <td className="p-2 text-[#6F757E] text-[14px] group-hover:text-[#050F24]">
                                 {item.status}
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
         {open && customer && (
            <div className="col-span-1">
               <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                  <div className="text-center mb-4">
                     <p className="text-gray-500">ID: {customer?.id}</p>
                     <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                        <img
                           src="https://s3-alpha-sig.figma.com/img/048b/28e2/5e2bc8b3a1b8a60983846492fad84a63?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CacVCHQ-Eluk3F1iMzktqtO5T0G9Nge6Zxsy6VLIwCQ1xrGHURLo~qj2LFB-3oxky70kXeDk-7UAGPryGgUJRbP6rx-eZKazNlxH2RO15ccDaVrZCZGeGe9Vwlco3WgyZrm7OdhVqvWlgtLKT0nWn-5Cd8QSw-U-hFU6LDSPTLePv-u~kOKiieCV~YC9eTcoLUDZql2NmuW~WSU0zLPj0EfH5hiUFEpT2Y2zZZmxMW~jcI3ZaHX7k34rDuId8kcqsJ5c6NoXGgg2PApu1ezPXsu3BTPiYm7OfMtTkjfZZ6vPCtJl6Wp~KSEYCdG~weLwautw4a7zMsFHYtnBgwPcNw__"
                           alt="Profile Picture"
                           className="w-full h-full object-cover"
                        />
                     </div>
                     <h2 className="text-xl font-semibold">{customer?.fullName}</h2>
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
                     <p className="text-gray-600 text-[14px]">{customer?.bio}</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-1 gap-y-2 flex items-start justify-start flex-col">
                        <div className="font-bold">Register Day</div>
                        <span className="text-[14px] text-[#6F757E]">{customer?.registerDay}</span>
                     </div>
                     <div className="flex-1 gap-y-2 flex items-start justify-center flex-col">
                        <div className="font-bold">Gendar</div>
                        <span className="text-[14px] text-[#6F757E]">{customer?.gender}</span>
                     </div>
                  </div>
                  <div className="flex gap-4 mt-3"></div>

                  <div className="flex justify-center items-center mt-3 gap-2">
                     <button
                        onClick={() => setOpen(false)}
                        className="bg-[#F0D171] hover:bg-yellow-500 w-[150px] text-[#6D1950] px-4 py-2 rounded-lg"
                     >
                        Edit
                     </button>
                     {customer?.status !== 'Banned' && (
                        <button
                           className="bg-[#7771f0] hover:bg-purple-800 w-[150px] text-[#6D1950] px-4 py-2 rounded-lg"
                           onClick={() => handleBanGuide(customer?.id)}
                        >
                           {customer?.status}
                        </button>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
