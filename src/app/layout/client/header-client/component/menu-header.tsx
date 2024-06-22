/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from 'react-router-dom';

import { ROUTE_PATH } from '~/app/constants';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface MenuHeaderProps {
   data: any;
}

export const MenuHeader = ({ data }: MenuHeaderProps) => {
   const { name, subMenu } = data;

   return (
      <div className="relative h-full flex items-center group">
         <Link to={ROUTE_PATH.CLIENT_PRODUCT} className="flex items-center gap-2 cursor-pointer ">
            <p className="font-medium group-hover:text-active hover:text-active text-black">{name}</p>
            {subMenu && (
               <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="#F0D171" />
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M23.3847 21.2309V21.9078C23.3847 22.7078 22.7078 23.3847 21.9078 23.3847H10.0924C9.2924 23.3847 8.61548 22.7078 8.61548 21.9078V21.2309C8.61548 19.4462 10.7078 18.3386 12.677 17.477L12.8616 17.3847C13.0155 17.3232 13.1693 17.3232 13.3232 17.4155C14.1232 17.9386 15.0155 18.2155 15.9693 18.2155C16.9232 18.2155 17.8462 17.9078 18.6155 17.4155C18.7693 17.3232 18.9232 17.3232 19.077 17.3847L19.2616 17.477C21.2924 18.3386 23.3847 19.4155 23.3847 21.2309ZM16.0001 8.61548C18.0309 8.61548 19.6616 10.4309 19.6616 12.677C19.6616 14.9232 18.0309 16.7386 16.0001 16.7386C13.9693 16.7386 12.3386 14.9232 12.3386 12.677C12.3386 10.4309 13.9693 8.61548 16.0001 8.61548Z"
                     fill="white"
                  />
               </svg>
            )}
         </Link>
         {subMenu && (
            <div className="z-10 w-[500px] shadow-submenu p-8 absolute rounded-b-md top-[99%] border-t-[2px] border-solid border-[#c10516] hidden group-hover:block bg-white m-h-20 -left-10">
               <div className="">
                  <div className="grid grid-cols-2 gap-5">
                     {subMenu.map((item: any, index: number) => (
                        <div key={index} className="col-span-1 border-b border-b-[#ddd] pb-[10px]">
                           <Link to="/" className="hover:text-active text-[#666666d9] font-medium">
                              {item.name}
                           </Link>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
