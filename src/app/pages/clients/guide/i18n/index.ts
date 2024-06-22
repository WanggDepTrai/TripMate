import en from './en';
import vi from './vi';

import { LANGUAGE } from '@constants';

export default {
   name: 'HOME_CLIENT',
   locales: [
      {
         key: LANGUAGE.EN,
         value: en,
      },
      {
         key: LANGUAGE.VI,
         value: vi,
      },
   ],
};
