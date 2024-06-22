import { FaUser, FaHome, FaClipboardList, FaBlog, FaEnvelope } from 'react-icons/fa';
import { ROUTE_PATH } from '@constants';
import { SvgIcon, cn } from '@helpers';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const pages = {
   index: 'Pages',
   item: [
      {
         title: 'All Guides',
         path: ROUTE_PATH.ADMIN_ALL_GUIDE,
      },
      {
         title: 'Add Customers',
         path: ROUTE_PATH.ADMIN_ALL_CUSTOMERS,
      },
      {
         title: 'All Tours',
         path: ROUTE_PATH.ADMIN_BOOKING,
      },
   ],
};

const Sidebar = () => {
   return (
      <div className="w-[250px] fixed top-5 bottom-5 left-4 bg-white rounded-lg shadow px-4 pt-4 ">
         <div className="relative h-full">
            <Link to={ROUTE_PATH.ADMIN_HOME} className="flex items-center mb-6">
               <SvgIcon name="logo-tripmate" className="w-[58px] h-[50px]" />
               <span className="text-xl font-bold">TripMate</span>
            </Link>
            <nav>
               <ul>
                  <li className="mb-4">
                     <NavLink
                        to={ROUTE_PATH.GUIDE_HOME}
                        className={({ isActive }) => {
                           return cn('flex gap-x-4 items-center px-3 py-2 rounded-xl', {
                              'bg-[#F0D171]': isActive,
                           });
                        }}
                     >
                        <span className="mr-2 ">🏠</span> Dashboard
                     </NavLink>
                  </li>
                  {/* <SidebarItem data={pages} /> */}
                  <li className="mb-4">
                     <NavLink
                        to={ROUTE_PATH.TRIPMATE}
                        className={({ isActive }) =>
                           cn('flex gap-x-4 items-center px-3 py-2 rounded-xl', {
                              'bg-[#F0D171]': isActive,
                           })
                        }
                     >
                        <span className="mr-2">
                           <FaUser />
                        </span>
                        Tripmate’s Guide
                     </NavLink>
                  </li>
                  <li className="mb-4">
                     <NavLink
                        to={ROUTE_PATH.TRANSACTION_GUIDE}
                        className={({ isActive }) =>
                           cn('flex gap-x-4 items-center px-3 py-2 rounded-xl', {
                              'bg-[#F0D171]': isActive,
                           })
                        }
                     >
                        <span className="mr-2">
                           <FaUser />
                        </span>
                        Transaction
                     </NavLink>
                  </li>
                  <li className="mb-4">
                     <a href="#" className="flex gap-x-4 items-center px-3 py-2 rounded-xl">
                        <span className="mr-2">
                           <FaClipboardList />
                        </span>
                        Manage
                     </a>
                  </li>
                  <li className="mb-4">
                     <a href="#" className="flex gap-x-4 items-center px-3 py-2 rounded-xl">
                        <span className="mr-2">
                           <FaBlog />
                        </span>
                        Blogs
                     </a>
                  </li>
                  <li className="mb-4">
                     <NavLink
                        to={ROUTE_PATH.GUIDE_MESSAGE}
                        className={({ isActive }) =>
                           cn('flex gap-x-4 items-center px-3 py-2 rounded-xl', {
                              'bg-[#F0D171]': isActive,
                           })
                        }
                     >
                        <span className="mr-2">
                           <FaEnvelope />
                        </span>
                        Messages
                     </NavLink>
                  </li>
               </ul>
            </nav>
            <a href="#" className="absolute bottom-5 flex gap-x-4 px-4 items-center mt-auto text-red-600">
               <span className="mr-2">🔓</span> Logout
            </a>
         </div>
      </div>
   );
};

const SidebarItem = ({ data }: { data: any }) => {
   const [open, setOpen] = useState(false);
   return (
      <li className="mb-4">
         <div
            // to={ROUTE_PATH.ADMIN_PAGE}
            // className={({ isActive }) =>
            //    cn('flex gap-x-4 items-center px-3 py-2 rounded-xl', {
            //       'bg-[#F0D171]': isActive,
            //    })
            // }
            className="gap-x-4 items-center px-3 py-2 rounded-xl flex justify-between cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
         >
            <div className="">
               <span className="mr-2">📄</span> {data.index}
            </div>
            <SvgIcon name="drop-down" />
         </div>
         {open && (
            <ul className="mt-4 pl-3 bg-slate-50 rounded-xl py-2">
               {data.item.map((item: any) => {
                  return (
                     <li className="mb-4">
                        <a href={item.path} className="flex gap-x-2 items-center px-3 py-1 rounded-xl font-bold">
                           {item.title}
                        </a>
                     </li>
                  );
               })}
            </ul>
         )}
      </li>
   );
};

export default Sidebar;
