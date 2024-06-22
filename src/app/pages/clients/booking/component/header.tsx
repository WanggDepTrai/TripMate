import languages from '../i18n';

import { LanguageSystem } from '@components';
import { ROUTE_PATH } from '@constants';
import { SvgIcon } from '@helpers';
import { useI18n } from '@hooks';
import { Link } from 'react-router-dom';

const Header = () => {
   const translate = useI18n(languages);

   return (
      <header className="bg-transparent shadow mb-2">
         <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="flex items-center">
               <Link to={ROUTE_PATH.CLIENT_HOME} className="h-full flex justify-start items-center">
                  <SvgIcon name="logo-tripmate" className="w-[58px] h-[50px]" />
                  <h3 className="font-medium text-2xl text-[#6D1950]">TripMate</h3>
               </Link>
            </div>
            <nav className="flex items-center space-x-4">
               <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center">1</div>
                  <span className="ml-2 text-red-700">{translate('Booking')}</span>
                  <div className="ml-4 w-10 border-t border-t-[#6D1950]"></div>
               </div>
               <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
                     2
                  </div>
                  <span className="ml-2 text-gray-700">{translate('Payment')}</span>
                  <div className="ml-4 w-10 border-t border-t-[#6D1950]"></div>
               </div>
               <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
                     3
                  </div>
                  <span className="ml-2 text-gray-700">{translate('Success')}</span>
                  <div className="ml-4 w-10 border-t border-t-[#6D1950]"></div>
               </div>
               <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
                     4
                  </div>
                  <span className="ml-2 text-gray-700">{translate('Complete_Vote')}</span>
               </div>
            </nav>
            <LanguageSystem />
         </div>
      </header>
   );
};

export default Header;
