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
               <SvgIcon name="user" width="24" height="24" />
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
               <SvgIcon name="user" width="24" height="24" />

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
