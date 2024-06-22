import { serviceApi } from '@configs';
import { SvgIcon, priceFormat } from '@helpers';
import { useQuery } from '@tanstack/react-query';
import AxisAlignWithTick from './components/axis-align-with-tick';

export const AdminDashboard = () => {
   const { data: bookingTotal } = useQuery(['getBookingTotal'], async () => {
      const res = await serviceApi.request.get('admin/bookings/total');
      return res.data;
   });
   const { data: bookingRevenue } = useQuery(['getBookingRevenue'], async () => {
      const res = await serviceApi.request.get('admin/bookings/revenue');
      return res.data;
   });
   const { data: customerToday } = useQuery(['getCustomersToday'], async () => {
      const res = await serviceApi.request.get('admin/customers/new-today');
      return res.data;
   });
   const { data: bookingEarning } = useQuery(['getBookingEarning'], async () => {
      const res = await serviceApi.request.get('admin/bookings/earning');
      return res.data;
   });
   const { data: statisticsTourduration } = useQuery(['getStatisticsTourduration'], async () => {
      const res = await serviceApi.request.get('admin/statistics/tourduration');
      return res.data;
   });
   const { data: guidesTop } = useQuery(['getGuidesTop'], async () => {
      const res = await serviceApi.request.get('admin/guides/top');
      return res.data;
   });
   const { data: customersTop } = useQuery(['getCustomersTop'], async () => {
      const res = await serviceApi.request.get('admin/customers/top');
      return res.data;
   });

   return (
      <>
         <div className="">
            <div className="grid grid-cols-4 gap-6 mb-6">
               <div className="bg-white p-4 shadow flex gap-4 rounded-2xl col-span-1">
                  <SvgIcon name="Frame-20" />
                  <div className="flex flex-col justify-between">
                     <h2 className="text-lg font-bold">Booking Total</h2>
                     <p className="text-2xl font-bold">{bookingTotal}</p>
                  </div>
               </div>
               <div className="bg-white p-4 rounded-2xl col-span-1 flex gap-4 shadow">
                  <SvgIcon name="Frame-21" />
                  <div className="flex flex-col justify-between">
                     <h2 className="text-lg font-bold">Booking Revenue</h2>
                     <p className="text-2xl font-bold">{priceFormat(bookingRevenue)}</p>
                  </div>
               </div>
               <div className="bg-white p-4 rounded-2xl col-span-1 flex gap-4 shadow">
                  <SvgIcon name="Frame-22" />
                  <div className="flex flex-col justify-between">
                     <h2 className="text-lg font-bold">Customers Today</h2>
                     <p className="text-2xl font-bold">{customerToday}</p>
                  </div>
               </div>
               <div className="bg-white p-4 rounded-2xl col-span-1 flex gap-4 shadow">
                  <SvgIcon name="Frame-20" />
                  <div className="flex flex-col justify-between">
                     <h2 className="text-lg font-bold">Bookings Earning</h2>
                     <p className="text-2xl font-bold">{priceFormat(bookingEarning)}</p>
                  </div>
               </div>

               <div className="col-span-4">
                  <div className="bg-white rounded-2xl p-4 shadow min-h-[371px]">
                     <h2 className="text-lg font-bold">Statistics</h2>
                     {/* <div className="h-40 bg-gray-100 mt-4"></div> */}

                     <AxisAlignWithTick data={statisticsTourduration} />
                  </div>
                 
                  <div className="flex gap-x-4 mt-6">
                     <div className="flex-1">
                        <div className="bg-white rounded-2xl p-4 shadow h-full">
                           <div className="flex items-center">
                              <h2 className="text-lg font-bold">Top Guides</h2>
                           </div>
                           <div className="mt-4 flex flex-col gap-y-5">
                              {guidesTop &&
                                 guidesTop?.map((guide: any) => {
                                    return (
                                       <div className="flex items-center justify-between" key={guide?.id}>
                                          <div className="flex items-center gap-x-2 w-[210px]">
                                             <img className="w-10 h-10 rounded-full" src={guide?.imageURL} alt="" />
                                             <div className="">{guide?.fullName}</div>
                                          </div>
                                          <div className="">{guide?.totalBookings}</div>
                                          <div className="bg-[#F5F5F5] p-3 rounded-full shadow">
                                             <SvgIcon name="email" className="w-4 h-4 text-[#FF8E29]" />
                                          </div>
                                       </div>
                                    );
                                 })}
                           </div>
                        </div>
                     </div>
                     <div className="flex-1">
                        <div className="bg-white rounded-2xl p-4 shadow  h-full">
                           <div className="flex items-center">
                              <h2 className="text-lg font-bold">Top Places</h2>
                           </div>
                           <div className="mt-4 flex flex-col gap-y-5">
                              {customersTop &&
                                 customersTop?.map((customer: any) => {
                                    return (
                                       <div className="flex items-center justify-between" key={customer?.id}>
                                          <div className="flex items-center gap-x-2 w-[210px]">
                                             <img className="w-10 h-10 rounded-full" src={customer?.imageURL} alt="" />
                                             <div className="">{customer?.fullName}</div>
                                          </div>
                                          <div className="">{customer?.totalBookings}</div>
                                          <div className="bg-[#F5F5F5] p-3 rounded-full shadow">
                                             <SvgIcon name="email" className="w-4 h-4 text-[#FF8E29]" />
                                          </div>
                                       </div>
                                    );
                                 })}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
