import { ROUTE_PATH } from '@constants';
import languages from '../i18n';

import { SvgIcon } from '@helpers';
import { useI18n } from '@hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/app/redux/slices';

export const User = () => {
   const translate = useI18n(languages);
   const { isAuhthentication, authLogout } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      authLogout();
      return navigate(ROUTE_PATH.SIGN_IN);
   };

   return (
      <div className="relative h-full flex items-center group">
         {isAuhthentication ? (
            <>
               {/* <div className="w-7 h-7"> */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
               </svg>

               {/* </div> */}
               <div
                  className="header-user min-w-[120px] hidden group-hover:block  absolute z-10 bg-white rounded-md right-0 top-[92%]"
                  style={{ width: 'max-content' }}
               >
                  <div className="py-2 w-full flex flex-col gap-y-1">
                     <div className="px-4 py-1 cursor-pointer hover:text-red-500 hover:bg-slate-400">{`${translate(
                        'PROFILE',
                     )}`}</div>
                     <div
                        className="px-4 py-1 cursor-pointer hover:text-red-500 hover:bg-slate-400"
                        onClick={handleLogout}
                     >{`${translate('LOG_OUT')}`}</div>
                  </div>
               </div>
            </>
         ) : (
            <>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
               </svg>

               <div
                  className="header-user hidden group-hover:block  absolute z-10 bg-white rounded-md right-0 top-[92%]"
                  style={{ width: 'max-content' }}
               >
                  <div className="py-2 w-full flex flex-col gap-y-1">
                     <div className="px-4 py-1 cursor-pointer hover:text-red-500 hover:bg-slate-400">
                        <Link to={ROUTE_PATH.SIGN_IN}>{`${translate('SIGNIN')}`}</Link>
                     </div>
                     <div className="px-4 py-1 cursor-pointer hover:text-red-500 hover:bg-slate-400">
                        <Link to={ROUTE_PATH.REGISTER}>{`${translate('REGISTER')}`}</Link>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};
