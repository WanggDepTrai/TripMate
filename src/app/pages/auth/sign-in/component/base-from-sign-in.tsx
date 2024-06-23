import * as yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';

import languages from '../../i18n';

import { useI18n, useLocalStorage } from '@hooks';
import InputPassword from '@pages/auth/component/input-password';
import { ROUTE_PATH } from '@constants';
import { regexs } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useAuth } from '~/app/redux/slices';
import { toast } from 'react-toastify';
import { SETTINGS_CONFIG } from '@configs';

const BaseFromSignIn = () => {
   const translate = useI18n(languages);

   const { authLogin } = useAuth();

   const { setLocalStorage, deleteLocalStorageItem } = useLocalStorage();

   const schema = yup.object({
      email: yup
         .string()
         .required(translate('EMAIL_REQUIRED'))
         .matches(regexs.email, translate('EMAIL_REGEX'))
         .default(''),
      password: yup.string().required(translate('PASSWORD_REQUIRED')).min(6, translate('PASSWORD_MIN')).default(''),
   });

   type ValidationForm = yup.InferType<typeof schema>;

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm<ValidationForm>({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data: ValidationForm) => {
      await axios
         .post(process.env.VITE_API_URL + '/api/auth/login', data)
         .then((response) => {
            if (response.data.isSuccess) {
               setLocalStorage(SETTINGS_CONFIG.ACCESS_TOKEN_KEY, response.data.data.token);
               setLocalStorage(SETTINGS_CONFIG.ROLE, response.data.data.role);
               toast.success('Đăng nhập thành công!');
               return authLogin(response.data.data);

               // const redirectRoute =
               //    response.data.data.role === ROLES[0]
               //       ? ROUTE_PATH.ADMIN_HOME
               //       : response.data.data.role === ROLES[1]
               //       ? ROUTE_PATH.GUIDE_HOME
               //       : ROUTE_PATH.CLIENT_HOME;
               // return navigate(redirectRoute);
            }

            setError('password', {
               message: response.data.message,
            });
            toast.error('Đăng nhập thất bại!');
            return deleteLocalStorageItem('trip_mate_token');
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <div className="w-full h-full flex items-center justify-center">
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center flex-col justify-center">
               <h3 className="font-bold text-4xl text-center">{translate(`LOGIN`)}</h3>
               <div className="w-[401px] flex flex-col items-center justify-center mt-8 gap-y-5">
                  <div className="w-full">
                     <input
                        type="text"
                        className="bg-transparent border border-transparent border-b w-full px-2 border-b-black font-normal text-base "
                        placeholder={translate(`ACCOUNT`)}
                        {...register('email')}
                     />
                     {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>}
                  </div>
                  <div className="w-full">
                     {/* <input
                        type="text"
                        className="bg-transparent border border-transparent border-b w-full px-2 border-b-black "
                     /> */}
                     <InputPassword {...register('password')} />
                     {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password?.message}</p>}
                  </div>
                  <div className="flex flex-col gap-y-3 w-full items-center">
                     <button className="w-full py-3 text-base bg-[#F0D171] flex items-center justify-center font-bold text-[#BD4545]">
                        {translate(`LOGIN`)}
                     </button>
                     {/* <button className="w-full py-3 text-base bg-[#78B28D] flex items-center justify-center font-bold text-[#BD4545]">
                        {translate(`SIGNIN_GOOGLE`)}
                     </button> */}
                     <div className="text-[13px] flex gap-1 ">
                        <span>{translate(`FROGOT_PASSWORD`)}</span>
                        <Link to="" className="text-[#b6d3ba]">
                           {translate(`CLICK_RESET`)}
                        </Link>
                     </div>
                     <Link
                        to={ROUTE_PATH.REGISTER}
                        className="w-full py-3 text-base border border-black flex items-center justify-center font-bold text-[#BD4545]"
                     >
                        {translate(`REGISTER`)}
                     </Link>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default BaseFromSignIn;
