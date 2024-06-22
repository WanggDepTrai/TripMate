import { Link } from 'react-router-dom';

import { ROUTE_PATH } from '@constants';
import { SvgIcon } from '@helpers';

export const Footer = () => {
   return (
      <footer className=" mt-10 border-t border-solid border-[#eee] py-8">
         <div className="container mb-5">
            <div className="grid grid-cols-6 gap-10">
               <div className="col-span-2">
                  <Link to={ROUTE_PATH.CLIENT_HOME} className="flex gap-3 items-center">
                     <SvgIcon name="logo-tripmate" />
                     <h3 className="font-medium text-4xl text-[#6D1950]">TripMate</h3>
                  </Link>
                  <p className="mt-5 text-lg font-medium text-[#6D1950]">
                     Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
                  </p>
                  <div className="flex items-center gap-8">
                     <Link to={ROUTE_PATH.CLIENT_HOME}>
                        <SvgIcon name="facebook" className="w-10" />
                     </Link>
                     <Link to={ROUTE_PATH.CLIENT_HOME}>
                        <SvgIcon name="instagram" className="w-10" />
                     </Link>
                     <Link to={ROUTE_PATH.CLIENT_HOME}>
                        <SvgIcon name="discord" className="w-10" />
                     </Link>
                  </div>
               </div>

               <div className="col-span-4 flex justify-between ">
                  <div className="flex flex-col gap-y-5">
                     <h3 className="text-[#BD4545] font-bold text-xl">Company</h3>
                     <p className="text-[#6D1950]">About us</p>
                     <p className="text-[#6D1950]">Tours</p>
                     <p className="text-[#6D1950]">Guides</p>
                     <p className="text-[#6D1950]">Contacts</p>
                  </div>
                  <div className="flex flex-col gap-y-5">
                     <h3 className="text-[#BD4545] font-bold text-xl">Help</h3>
                     <p className="text-[#6D1950]">Help/FAQ</p>
                     <p className="text-[#6D1950]">Tours</p>
                     <p className="text-[#6D1950]">Guides</p>
                     <p className="text-[#6D1950]">Contacts</p>
                  </div>
                  <div className="flex flex-col gap-y-5">
                     <h3 className="text-[#BD4545] font-bold text-xl">Company</h3>
                     <p className="text-[#6D1950]">About us</p>
                     <p className="text-[#6D1950]">Tours</p>
                     <p className="text-[#6D1950]">Guides</p>
                     <p className="text-[#6D1950]">Contacts</p>
                  </div>
                  <div className="flex flex-col gap-y-5">
                     <h3 className="text-[#BD4545] font-bold text-xl">Company</h3>
                     <p className="text-[#6D1950]">About us</p>
                     <p className="text-[#6D1950]">Tours</p>
                     <p className="text-[#6D1950]">Guides</p>
                     <p className="text-[#6D1950]">Contacts</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="border border-b-black"></div>
         <div className="">
            <h5 className="text-sm pt-4 font-medium text-center">@2024 TripMate, All Rights Reserved</h5>
         </div>
      </footer>
   );
};
