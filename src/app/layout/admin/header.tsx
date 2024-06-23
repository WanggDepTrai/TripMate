import { ROUTE_PATH } from '@constants';
import { SvgIcon } from '@helpers';
import { useI18n, useLocalStorage } from '@hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/app/redux/slices';

import languages from '../client/header-client/i18n';

const Header = () => {
   const translate = useI18n(languages);
   const { isAuhthentication, authLogout, user } = useAuth();
   const navigate = useNavigate();
   const { getLocalStorage } = useLocalStorage();
   const handleLogout = () => {
      authLogout();
      return navigate(ROUTE_PATH.SIGN_IN);
   };

   return (
      <div className="flex justify-between mb-6 relative h-full items-center group">
         <div className="flex items-center gap-x-40">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <input type="text" placeholder="Search..." className="border w-[300px] px-4 py-2 text-sm rounded-lg" />
         </div>
         <div className="cursor-pointer group relative">
            <div className="flex items-center gap-x-4 ">
               <div className="flex items-center gap-2">
                  <img
                     src="https://scontent.fhan5-1.fna.fbcdn.net/v/t39.30808-1/234333086_2662246360748278_8018031834978827494_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFeLa734TNwRvuk7YtGL9bJvOMyYvIsYIy84zJi8ixgjNluLVSiaA59uJ0T9LtIzr4qxdvRj54a6AxBezfu9xt0&_nc_ohc=Z9lpRlfoW-UQ7kNvgEiY6BU&_nc_ht=scontent.fhan5-1.fna&oh=00_AYBIdwRZKbKZEf7cuzDXZ2PnXfDXHTd_cQqjyUqkqjrIsQ&oe=666F719B"
                     alt="User Avatar"
                     className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{user?.fullName as string}</span>
               </div>
               <SvgIcon name="drop-down" className="w-3 h-3" />
            </div>
            {isAuhthentication ? (
               <>
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
      </div>
   );
};

export default Header;
