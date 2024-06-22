import { FaStar, FaArrowUp } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../style/index.css';
import { useQuery } from '@tanstack/react-query';
import { serviceApi } from '@configs';
import { HeaderContetnGuide } from '@components';

export const Dashboard = () => {
   const { data: totalhour } = useQuery(['getGuideTotalhour'], async () => {
      const res = await serviceApi.request.get('guides/me/totalhour');
      console.log(res.data);
      return res.data;
   });

   const { data: totalbooking } = useQuery(['getGuideTotalbooking'], async () => {
      const res = await serviceApi.request.get('guides/me/totalbooking');
      console.log(res.data);
      return res.data;
   });

   const lineData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
         {
            label: 'This year',
            data: [10, 20, 15, 25, 22, 30, 35],
            borderColor: '#FF6384',
            fill: false,
         },
         {
            label: 'Last year',
            data: [15, 25, 20, 30, 25, 35, 40],
            borderColor: '#36A2EB',
            fill: false,
            borderDash: [5, 5],
         },
      ],
   };

   const doughnutData = {
      labels: ['United States', 'Viet Nam', 'Russia', 'Other'],
      datasets: [
         {
            data: [38.6, 22.5, 30.8, 8.1],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
         },
      ],
   };

   return (
      <div>
         <HeaderContetnGuide />
         <div className="min-h-screen bg-white p-8 mt-3 shadow">
            <div>
               <h2 className="text-2xl font-bold mb-4 text-[#BD4545]">Overview</h2>
               <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#FDF9ED] col-span-2 p-4 rounded-md shadow-md">
                     <h3 className="text-lg font-bold">Total Booking</h3>
                     <div className="flex items-end justify-between mt-4 px-3">
                        <p className="text-2xl font-bold">{totalbooking}</p>
                     </div>
                  </div>
                  <div className="bg-[#FDF9ED] col-span-2 p-4 rounded-md shadow-md">
                     <h3 className="text-lg font-bold">Hours</h3>
                     <div className="flex items-end justify-between mt-4 px-3">
                        <p className="text-2xl font-bold">{totalhour} h</p>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#FDF9ED] p-4 rounded-md shadow-md">
                     <h3 className="text-lg font-bold">Total Tours</h3>
                     <Line data={lineData} />
                  </div>
                  <div className="bg-[#FDF9ED] p-4 rounded-md shadow-md  ">
                     <h3 className="text-lg font-bold">Top Locations</h3>
                     <Doughnut data={doughnutData} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
