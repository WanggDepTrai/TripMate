import { LazyLoadingImage } from '@components';
import { SvgIcon, priceFormat } from '@helpers';

export const Card = () => {
   return (
      <div className="relative max-w-max h-full flex items-center  group">
         <div className="cursor-pointer">
            <SvgIcon name="cart" width="22" height="22" />
         </div>
         <div className="top-card-content rounded-md absolute w-[400px] -right-10 top-[92%] h-[400px] z-10 hidden group-hover:block shadow-card bg-white">
            <div className="px-3 py-4 flex flex-col gap-y-3">
               <div className="flex justify-between gap-x-4 cursor-default">
                  <LazyLoadingImage width="40px" height="40px" />
                  <div className="flex-1 ">
                     <p className="text-sm truncate"></p>
                     <p className="text-sm">x 1</p>
                  </div>
                  <div className="text-sm text-red-500">{priceFormat(10000)}</div>
               </div>
               <div className="flex justify-between gap-x-4 cursor-default">
                  <LazyLoadingImage width="40px" height="40px" />
                  <div className="flex-1 ">
                     <p className="text-sm w-full text truncate">san pham 1</p>
                     <p className="text-sm">x 1</p>
                  </div>
                  <div className="text-sm text-red-500">{priceFormat(10000)}</div>
               </div>
            </div>
         </div>
      </div>
   );
};
