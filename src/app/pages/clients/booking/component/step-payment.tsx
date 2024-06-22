import { useI18n } from '@hooks';
import languages from '../i18n';

import { ROUTE_PATH } from '@constants';
import { SvgIcon } from '@helpers';
import { Link } from 'react-router-dom';

const StepPayment = ({ handleBackStep }: any) => {
   const translate = useI18n(languages);

   return (
      <div className="mb-10">
         <h1 className="text-3xl font-bold text-center">Vui lòng thanh toán </h1>
         <div className="flex items-center flex-col ">
            <div className="text-xl font-bold">Tổng thanh toán: </div>

            <img
               className="w-[200px] h-[200px]"
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUVEvbHK2Imd-y0rp11JZudjhMVEgHjSOSXg&s"
            />
         </div>
      </div>
   );
};

export default StepPayment;
