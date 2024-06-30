import { Link, useNavigate } from 'react-router-dom';

import * as yup from 'yup';

import languages from '../../i18n';

import { useI18n } from '@hooks';
import { ROUTE_PATH } from '@constants';
import InputPassword from '@pages/auth/component/input-password';
import { SvgIcon } from '@helpers';
import { regexs } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const BaseFormRegister = () => {
   const translate = useI18n(languages);

   const navigate = useNavigate();

   const schema = yup.object({
      PhoneNumber: yup
         .string()
         .required(translate('PHONE_REQUIRED'))
         .matches(regexs.phoneVn, translate('PHONE_REGEX'))
         .default(''),
      Password: yup.string().required(translate('PASSWORD_REQUIRED')).min(6, translate('PASSWORD_MIN')).default(''),
      PasswordConfirm: yup.string().oneOf([yup.ref('Password')], 'Xác nhận mật khẩu không khớp'),
      FullName: yup
         .string()
         .required('Tên không được để trống')
         // .matches(regexs.email, translate('EMAIL_REGEX'))
         .default(''),
      Email: yup
         .string()
         .required(translate('EMAIL_REQUIRED'))
         .matches(regexs.email, translate('EMAIL_REGEX'))
         .default(''),
      Gender: yup
         .string()
         .required('Tên không được để trống')
         // .matches(regexs.email, translate('EMAIL_REGEX'))
         .default('nam'),
   });

   type ValidationFormRegister = yup.InferType<typeof schema>;

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ValidationFormRegister>({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data: ValidationFormRegister) => {
      await axios
         .post(process.env.VITE_API_URL + '/api/users/register', data)
         .then((response) => {
            if (response.data.isSuccess) {
               toast.success('Đăng ký thành công');

               return setTimeout(() => {
                  return navigate(ROUTE_PATH.SIGN_IN);
               }, 1);
            }

            return toast.error(response.data.message);
         })
         .catch((error) => {
            // handle errors
            console.log(error);
         });
   };

   return (
      <div className="w-full h-full flex items-center justify-center">
         <div className="flex items-center flex-col justify-center">
            <h3 className="font-bold text-4xl text-center">{translate(`CREATE_ACCOUNT`)}</h3>
            <button type="button" className="bg-[#F4F4F4] flex px-6 py-3 mt-4 gap-x-2 ">
               <SvgIcon name="google" />
               <span>{translate(`SIGN_UP_WITH_GOOGLE`)}</span>
            </button>
            <p className="my-4 text-[#979797]">-OR-</p>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="w-[401px] flex flex-col items-center justify-center  gap-y-5">
                  <div className="w-full">
                     <input
                        type="text"
                        className="bg-transparent border border-transparent border-b w-full px-2 border-b-black font-normal text-base "
                        placeholder={translate(`PHONE_NUMBER`)}
                        {...register('PhoneNumber')}
                     />
                     {errors.PhoneNumber && <p className="text-sm text-red-500 mt-1">{errors.PhoneNumber?.message}</p>}
                  </div>
                  <div className="w-full">
                     <input
                        type="text"
                        className="bg-transparent border border-transparent border-b w-full px-2 border-b-black font-normal text-base "
                        placeholder={translate(`FullName`)}
                        {...register('FullName')}
                     />
                     {errors.FullName && <p className="text-sm text-red-500 mt-1">{errors.FullName?.message}</p>}
                  </div>
                  <div className="w-full">
                     <input
                        type="text"
                        className="bg-transparent border border-transparent border-b w-full px-2 border-b-black font-normal text-base "
                        placeholder={translate(`Email`)}
                        {...register('Email')}
                     />
                     {errors.Email && <p className="text-sm text-red-500 mt-1">{errors.Email?.message}</p>}
                  </div>

                  <div className="w-full">
                     <InputPassword {...register('PasswordConfirm')} />
                     {errors.PasswordConfirm && (
                        <p className="text-sm text-red-500 mt-1">{errors.PasswordConfirm?.message}</p>
                     )}
                  </div>
                  <div className="w-full">
                     <InputPassword {...register('Password')} />
                     {errors.Password && <p className="text-sm text-red-500 mt-1">{errors.Password?.message}</p>}
                  </div>

                  {/* <div className="w-full flex items-center gap-x-2">
                     <input type="checkbox" id="check" />
                     <label htmlFor="check" className="text-sm">
                        {translate(`CLICK_TO_GUIDE`)}
                     </label>
                  </div> */}

                  <div className="flex flex-col gap-y-3 w-full items-center">
                     <button className="hover:bg-yellow-500 w-full py-3 text-base bg-[#F0D171] flex items-center justify-center font-bold text-[#BD4545]">
                        {translate(`CREATE_ACCOUNT`)}
                     </button>
                     {/* <button className="w-full py-3 text-base bg-[#78B28D] flex items-center justify-center font-bold text-[#BD4545]">
                        {translate(`SIGNIN_GOOGLE`)}
                     </button> */}
                     <div className="text-[13px] flex gap-1 ">
                        <span>{translate(`ALREADY_ACCOUNT`)}</span>
                        <Link to={ROUTE_PATH.SIGN_IN} className="text-[#b6d3ba] hover:text-red-500">
                           {translate(`LOGIN`)}
                        </Link>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default BaseFormRegister;
