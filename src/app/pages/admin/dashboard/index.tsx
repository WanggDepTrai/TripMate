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
                  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect width="70" height="70" rx="10" fill="#27D095" />
                     <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M51 44.3337V35.0003C51 34.647 50.86 34.307 50.6093 34.0577C50.36 33.807 50.02 33.667 49.6667 33.667H20.3333C19.98 33.667 19.64 33.807 19.3907 34.0577C19.14 34.307 19 34.647 19 35.0003V44.3337H20.3333V41.667H49.6667V44.3337H51ZM25.6667 32.3337V31.0003C25.6667 30.2643 26.264 29.667 27 29.667H32.3333C33.0693 29.667 33.6667 30.2643 33.6667 31.0003V32.3337H36.3333V31.0003C36.3333 30.2643 36.9307 29.667 37.6667 29.667H43C43.736 29.667 44.3333 30.2643 44.3333 31.0003V32.3337H48.3333V27.0003C48.3333 26.647 48.1933 26.307 47.9427 26.0577C47.6933 25.807 47.3533 25.667 47 25.667H23C22.6467 25.667 22.3067 25.807 22.0573 26.0577C21.8067 26.307 21.6667 26.647 21.6667 27.0003V32.3337H25.6667Z"
                        fill="white"
                     />
                  </svg>

                  <div className="flex flex-col justify-between">
                     <h2 className="text-lg font-bold">Booking Total</h2>
                     <p className="text-2xl font-bold">{bookingTotal}</p>
                  </div>
               </div>
               <div className="bg-white p-4 rounded-2xl col-span-1 flex gap-4 shadow">
                  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect width="70" height="70" rx="10" fill="#67CADF" />
                     <path
                        d="M28.3333 44.333H20.3333V29.6663H28.3333V44.333ZM39 20.333H31V44.333H39V20.333ZM49.6667 34.9997H41.6667V44.333H49.6667V34.9997ZM51 46.9997H19V49.6663H51V46.9997Z"
                        fill="white"
                     />
                  </svg>

                  <div className="flex flex-col justify-between">
                     <h2 className="text-lg font-bold">Booking Revenue</h2>
                     <p className="text-2xl font-bold">{priceFormat(bookingRevenue)}</p>
                  </div>
               </div>
               <div className="bg-white p-4 rounded-2xl col-span-1 flex gap-4 shadow">
                  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect width="70" height="70" rx="10" fill="#FF8E29" />
                     <g clip-path="url(#clip0_375_1035)">
                        <path
                           d="M32.3333 31V29.536L33.7293 23H36.2693L37.6667 29.5333V30.9973C37.6667 32.42 36.4227 33.6667 35 33.6667C33.5773 33.6667 32.3333 32.4227 32.3333 31ZM39 31C39 32.4227 40.2453 33.6667 41.668 33.6667C43.0907 33.6667 44.3333 32.556 44.3333 31.1333V29.6693L40.3387 23H37.748L39 29.536V31ZM25.6667 31.0907C25.6667 32.5133 26.9107 33.6667 28.3333 33.6667C29.756 33.6667 31 32.5133 31 31.0907V29.628L32.252 23H29.6613L25.6667 29.628V31.0907ZM20.3333 35H49.6667V51H20.3333V35ZM23 45.6667H47V37.6667H23V45.6667ZM24.3333 31.0907V29.628L28.1827 23H25.4973L19 29.628V31.092C19 32.5133 20.244 33.6667 21.6667 33.6667C23.0893 33.6667 24.3333 32.5133 24.3333 31.0907ZM44.5027 23H41.8173L45.6667 29.536V31C45.6667 32.4227 46.9107 33.6667 48.3333 33.6667C49.756 33.6667 51 32.5133 51 31.0907V29.628L44.5027 23ZM44.3333 19H25.6667V21.6667H44.3333V19Z"
                           fill="white"
                        />
                     </g>
                     <defs>
                        <clipPath id="clip0_375_1035">
                           <rect width="32" height="32" fill="white" transform="translate(19 19)" />
                        </clipPath>
                     </defs>
                  </svg>

                  <div className="flex flex-col justify-between">
                     <h2 className="text-lg font-bold">Customers Today</h2>
                     <p className="text-2xl font-bold">{customerToday}</p>
                  </div>
               </div>
               <div className="bg-white p-4 rounded-2xl col-span-1 flex gap-4 shadow">
                  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect width="70" height="70" rx="10" fill="#27D095" />
                     <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M51 44.3337V35.0003C51 34.647 50.86 34.307 50.6093 34.0577C50.36 33.807 50.02 33.667 49.6667 33.667H20.3333C19.98 33.667 19.64 33.807 19.3907 34.0577C19.14 34.307 19 34.647 19 35.0003V44.3337H20.3333V41.667H49.6667V44.3337H51ZM25.6667 32.3337V31.0003C25.6667 30.2643 26.264 29.667 27 29.667H32.3333C33.0693 29.667 33.6667 30.2643 33.6667 31.0003V32.3337H36.3333V31.0003C36.3333 30.2643 36.9307 29.667 37.6667 29.667H43C43.736 29.667 44.3333 30.2643 44.3333 31.0003V32.3337H48.3333V27.0003C48.3333 26.647 48.1933 26.307 47.9427 26.0577C47.6933 25.807 47.3533 25.667 47 25.667H23C22.6467 25.667 22.3067 25.807 22.0573 26.0577C21.8067 26.307 21.6667 26.647 21.6667 27.0003V32.3337H25.6667Z"
                        fill="white"
                     />
                  </svg>
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
                                             {/* <SvgIcon name="email" className="w-4 h-4 text-[#FF8E29]" /> */}
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-4 h-4 text-[#FF8E29]"
                                             >
                                                <path
                                                   stroke-linecap="round"
                                                   stroke-linejoin="round"
                                                   d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                />
                                             </svg>
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
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-4 h-4 text-[#FF8E29]"
                                             >
                                                <path
                                                   stroke-linecap="round"
                                                   stroke-linejoin="round"
                                                   d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                />
                                             </svg>
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
