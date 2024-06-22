import BaseFromSignIn from './component/base-from-sign-in';

import { SvgIcon } from '@helpers';
import { LanguageSystem, LazyLoadingImage } from '@components';
import { images } from '@assets/images';

export const SignIn = () => {
   return (
      <div className="bg-[#F0D171] w-full h-full relative overflow-hidden">
         <div className="absolute top-0 right-0 w-2/3 h-full bg-[#FDF9ED] rounded-s-[64px] z-10"></div>
         <div className="container pt-8">
            <div className=" ">
               <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-[#6D1950]">
                     <SvgIcon name="logo-tripmate" />
                     <h3 className="font-medium text-4xl">TripMate</h3>
                  </div>
                  <div className="">
                     <LanguageSystem />
                  </div>
               </div>
            </div>
            <div className="relative z-30">
               <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-2">
                     <LazyLoadingImage src={images.wecomVn} />
                  </div>
                  <div className="col-span-3">
                     <BaseFromSignIn />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
