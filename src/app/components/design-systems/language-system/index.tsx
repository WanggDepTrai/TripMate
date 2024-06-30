/* eslint-disable @typescript-eslint/naming-convention */
import { useTranslation } from 'react-i18next';
import { CheckIcon } from '@radix-ui/react-icons';
import { useRef, useState } from 'react';

import { LazyLoadingImage } from '../lazy-loading-image';

import { images } from '@assets/images';
import { useI18n, useLocalStorage, useOnClickOutside } from '@hooks';
import { LANGUAGE, LOCALSTORAGE_LANGUAGE_KEY } from '@constants';

export const LanguageSystem = () => {
   const [open, setOpen] = useState<boolean>(false);
   const ref = useRef<HTMLDivElement>(null);

   useOnClickOutside(ref, () => setOpen(false));

   const translate = useI18n();
   const { i18n } = useTranslation();

   const { setLocalStorage } = useLocalStorage();

   const handleChangeLanguage = (language: string) => {
      setLocalStorage(LOCALSTORAGE_LANGUAGE_KEY, language);
      void i18n.changeLanguage(language);
   };

   return (
      <div className="relative h-full flex items-center z-[99999] group">
         <div className="flex gap-x-2 items-center w-[60px]" onClick={() => setOpen(!open)}>
            <LazyLoadingImage src={images.vnFlag} alt={`${translate('FLAG')}`} width="30" height="20" />
            <span className="font-medium">{`${translate('FLAG')}`}</span>
         </div>
         {/* {open && ( */}
            <div
               className="header-user absolute bg-white rounded-md right-0 top-[92%] group-hover:block hidden shadow-button"
               style={{ width: 'max-content' }}
               ref={ref}
            >
               <div className="py-2 w-40 flex flex-col gap-y-1">
                  <div
                     className="px-4 py-1 cursor-pointer hover:text-red-500 hover:bg-slate-400 flex justify-between items-center"
                     onClick={() => handleChangeLanguage(LANGUAGE.VI)}
                  >
                     <div>{`${translate('COUNTRY_VI')}`}</div>
                     {i18n.language === LANGUAGE.VI && <CheckIcon width={16} height={16} />}
                  </div>
                  <div
                     className="px-4 py-1 cursor-pointer hover:text-red-500 hover:bg-slate-400 flex justify-between items-center"
                     onClick={() => handleChangeLanguage(LANGUAGE.EN)}
                  >
                     <div>{`${translate('COUNTRY_EN')}`}</div>
                     {i18n.language === LANGUAGE.EN && <CheckIcon width={16} height={16} />}
                  </div>
               </div>
            </div>
         {/* )} */}
      </div>
   );
};
