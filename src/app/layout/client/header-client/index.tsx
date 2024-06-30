import { Link } from 'react-router-dom';

import { User } from './component/user';
import languages from './i18n';

import { LanguageSystem } from '@components';
import { ROUTE_PATH } from '@constants';
import { useI18n } from '@hooks';
import { SvgIcon } from '@helpers';

export const HeaderClient = () => {
   const translate = useI18n(languages);

   const data = [
      {
         title: translate('HOME'),
         link: ROUTE_PATH.CLIENT_HOME,
      },
      {
         title: translate('TOURS'),
         link: ROUTE_PATH.CLIENT_HOME,
      },
      {
         title: translate('Guides'),
         link: ROUTE_PATH.CLIENT_GUIDE,
      },
      {
         title: translate('Blogs'),
         link: ROUTE_PATH.CLIENT_HOME,
      },
   ];

   return (
      <header className="h-header-client flex items-center z-[99999]">
         <div className="container h-full items-center justify-between grid grid-cols-6  py-3">
            <div className="col-span-1 flex justify-start items-center h-full">
               <Link to={ROUTE_PATH.CLIENT_HOME} className="h-full flex justify-start items-center">
                  <SvgIcon name="logo-tripmate" className="w-[58px] h-[50px]" />
                  <h3 className="font-medium text-2xl text-[#6D1950]">TripMate</h3>
               </Link>
            </div>
            <div className="col-span-3 h-full flex justify-between items-center">
               <div className="flex justify-between items-center gap-4">
                  {data.map((item, index) => (
                     <Link
                        to={item.link}
                        key={index}
                        className="h-full flex items-center justify-center uppercase hover:text-[#310321] hover:underline font-bold text-[#6D1950]"
                     >
                        {item.title}
                     </Link>
                  ))}
               </div>
               <div className=""></div>
            </div>
            <div className="col-span-2 h-full items-center flex gap-4 justify-end">
               {/* <Card /> */}
               <User />
               <LanguageSystem />
            </div>
         </div>
      </header>
   );
};
