/* eslint-disable @typescript-eslint/naming-convention */
import React, { forwardRef, useState } from 'react';

import languages from '../i18n';

import { SvgIcon, cn } from '@helpers';
import { useI18n } from '@hooks';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'password', ...props }, ref) => {
   const [showPassword, setShowPassword] = useState<boolean>(false);

   const translate = useI18n(languages);

   const togglePassword = () => setShowPassword((prev) => !prev);

   return (
      <div className="relative w-full">
         <>
            <input
               type={showPassword ? 'text' : type}
               className={cn(
                  'bg-transparent border border-transparent border-b w-full px-2 border-b-black',
                  className,
                  {
                     '!border-gray1 bg-white1 !text-black1': Boolean(props.disabled),
                  },
               )}
               ref={ref}
               placeholder={translate('PASSWORD')}
               {...props}
            />
            {type === 'password' && (
               <button
                  className="absolute inset-y-0 right-3 my-auto ml-3 flex items-center justify-center text-sm"
                  onClick={togglePassword}
                  type="button"
               >
                  {showPassword ? (
                     <SvgIcon name="eye" className="stroke-gray3" />
                  ) : (
                     <SvgIcon name="eye-off" className="stroke-gray3" />
                  )}
               </button>
            )}
         </>
      </div>
   );
});

export default InputPassword;
