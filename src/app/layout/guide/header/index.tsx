import { ROUTE_PATH } from '@constants';
import { useI18n } from '@hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/app/redux/slices';

import languages from '../../client/header-client/i18n';
import { SvgIcon } from '@helpers';

const Header = () => {
   const translate = useI18n(languages);
   const { isAuhthentication, authLogout } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      authLogout();
      return navigate(ROUTE_PATH.SIGN_IN);
   };

   return (
      <div className="w-full h-[58px] bg-white shadow px-4">
         <div className="grid grid-cols-5 h-full">
            <div className="col-span-1"></div>
            <div className="col-span-3 h-full flex justify-center items-center group">
               <div className="relative w-[545px] h-[32px] flex justify-center items-center">
                  <div className="text-sm text-[#BD4545] absolute flex items-center justify-center gap-2">
                     <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M19.1381 20.8481L11.4936 13.2268C10.8832 13.7453 10.1813 14.1465 9.38778 14.4305C8.59427 14.7145 7.7967 14.8565 6.99506 14.8565C5.04018 14.8565 3.38562 14.1818 2.03137 12.8325C0.677125 11.4824 0 9.83325 0 7.88513C0 5.93702 0.67631 4.28709 2.02893 2.93534C3.38237 1.58278 5.03612 0.906494 6.99017 0.906494C8.94505 0.906494 10.6004 1.58156 11.9563 2.93169C13.3122 4.28182 13.9901 5.93175 13.9901 7.88148C13.9901 8.72694 13.84 9.54521 13.5396 10.3363C13.2385 11.1274 12.8438 11.8041 12.3555 12.3664L20 19.9864L19.1381 20.8481ZM6.99506 13.6382C8.61462 13.6382 9.9823 13.0824 11.0981 11.9708C12.2131 10.8592 12.7706 9.49571 12.7706 7.88027C12.7706 6.26563 12.2131 4.90252 11.0981 3.79093C9.98311 2.67935 8.61584 2.12356 6.99628 2.12356C5.37671 2.12356 4.00903 2.67935 2.89324 3.79093C1.77827 4.90252 1.22078 6.26563 1.22078 7.88027C1.22078 9.4949 1.77827 10.858 2.89324 11.9696C4.00822 13.0812 5.37549 13.6382 6.99506 13.6382Z"
                           fill="#BD4545"
                        />
                     </svg>

                     <span>Search for anything</span>
                  </div>
                  <input type="text" className="w-full h-full border border-[#BD4545]" />
               </div>
            </div>
            <div className="col-span-1 flex gap-2 items-center justify-end">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M13.066 17.5867H10.7583C10.3891 17.5867 10.1122 17.3097 10.1122 16.9405V16.2482C10.1122 14.3098 11.3583 12.5559 13.2045 11.9098C13.7583 11.7251 14.266 11.4021 14.6814 10.9405C16.9891 8.17129 14.866 4.84821 12.0968 4.7559C11.0814 4.70975 10.1122 5.07898 9.37372 5.77129C8.77372 6.32514 8.40449 7.01744 8.31218 7.80206C8.26603 8.07898 7.98911 8.30975 7.61988 8.30975H5.31218C4.8968 8.30975 4.57372 7.98667 4.61988 7.57129C4.80449 5.81744 5.58911 4.24821 6.83526 3.00206C8.31218 1.61744 10.2045 0.878982 12.2353 0.925135C16.066 1.0636 19.2045 4.20206 19.343 8.03283C19.4814 11.2636 17.4968 14.1713 14.4968 15.279C14.0814 15.4636 13.8045 15.7867 13.8045 16.2021V16.8944C13.8045 17.3098 13.4353 17.5867 13.066 17.5867ZM13.8045 22.4328C13.8045 22.8021 13.4814 23.1251 13.1122 23.1251H10.8045C10.4353 23.1251 10.1122 22.8021 10.1122 22.4328V20.1251C10.1122 19.7559 10.4353 19.4328 10.8045 19.4328H13.1122C13.4814 19.4328 13.8045 19.7559 13.8045 20.1251V22.4328Z"
                     fill="#BD4545"
                  />
               </svg>

               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M21.6191 14.9539L19.9114 13.5231C20.0037 13.0154 20.0499 12.4616 20.0499 11.9539C20.0499 11.4462 20.0037 10.8923 19.9114 10.3846L21.6191 8.95387C22.1729 8.49233 22.3576 7.66156 21.9883 7.0154L21.2499 5.67694C20.9729 5.2154 20.4653 4.93848 19.9114 4.93848C19.7268 4.93848 19.5422 4.98463 19.4037 5.03079L17.3268 5.8154C16.496 5.07694 15.5729 4.56925 14.6499 4.24617L14.2806 2.07694C14.1422 1.33848 13.496 0.923096 12.7576 0.923096H11.2806C10.5422 0.923096 9.89602 1.33848 9.75756 2.07694L9.38833 4.20002C8.37294 4.5231 7.49602 5.07694 6.66525 5.76925L4.63448 4.98463C4.44987 4.93848 4.3114 4.89233 4.12679 4.89233C3.57294 4.89233 3.06525 5.16925 2.78833 5.63079L2.04987 6.9231C1.68064 7.56925 1.8191 8.40002 2.4191 8.86156L4.12679 10.2923C4.03448 10.8 3.98833 11.3539 3.98833 11.8616C3.98833 12.4154 4.03448 12.9231 4.12679 13.4308L2.4191 14.8616C1.86525 15.3231 1.68064 16.1539 2.04987 16.8L2.78833 18.1846C3.06525 18.6462 3.57294 18.9231 4.12679 18.9231C4.3114 18.9231 4.49602 18.8769 4.63448 18.8308L6.7114 18.0462C7.54217 18.7846 8.46525 19.2923 9.38833 19.6154L9.75756 21.8308C9.89602 22.5693 10.496 23.0769 11.2806 23.0769H12.7576C13.496 23.0769 14.1422 22.5231 14.2806 21.7846L14.6499 19.5693C15.7114 19.2 16.6345 18.6462 17.4653 17.8616L19.4037 18.6462C19.5883 18.6923 19.7729 18.7385 19.9576 18.7385C20.5114 18.7385 21.0191 18.4616 21.296 18L21.9883 16.8C22.3576 16.2462 22.1729 15.4154 21.6191 14.9539ZM12.0653 17.1231C9.29602 17.1231 7.03448 14.8616 7.03448 12.0462C7.03448 9.23079 9.24987 6.96925 12.0653 6.96925C14.8806 6.96925 17.096 9.23079 17.096 12.0462C17.096 14.8616 14.8345 17.1231 12.0653 17.1231ZM13.4037 8.30771H11.2806C10.9576 8.30771 10.6806 8.49233 10.5883 8.76925L9.29602 12.0923C9.20371 12.3231 9.38833 12.6 9.66525 12.6H11.8345L11.0499 15.3692C10.9576 15.6462 11.2806 15.7846 11.4653 15.6L14.7422 11.7692C14.9729 11.5385 14.7883 11.1692 14.4653 11.1692H12.8499L14.2806 8.90771C14.4191 8.67694 14.2345 8.35387 13.9576 8.35387H13.4037V8.30771Z"
                     fill="#BD4545"
                  />
               </svg>

               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M21.2308 15.238H21C20.1231 15.238 19.3846 14.4996 19.3846 13.6226V8.31495C19.3846 4.11495 15.8769 0.745722 11.6308 0.930337C7.66156 1.11495 4.6154 4.53034 4.6154 8.54572V13.6688C4.6154 14.5457 3.87694 15.238 3.00002 15.238H2.76925C1.75386 15.238 0.923096 16.115 0.923096 17.1303V17.8226C0.923096 18.1457 1.24617 18.4688 1.6154 18.4688H22.3846C22.7539 18.4688 23.0769 18.1457 23.0769 17.7765V17.0842C23.0769 16.0688 22.2462 15.238 21.2308 15.238ZM14.2616 20.315H9.73848C9.46156 20.315 9.23079 20.5919 9.27694 20.8688C9.50771 22.1611 10.6616 23.0842 12 23.0842C13.3385 23.0842 14.4923 22.115 14.7231 20.8688C14.7692 20.5919 14.5385 20.315 14.2616 20.315Z"
                     fill="#BD4545"
                  />
               </svg>

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
            </div>
         </div>
      </div>
   );
};

export default Header;
