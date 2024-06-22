// import { useTranslation } from 'react-i18next';

// import { useLocalStorage } from '@hooks';
import { useAuth } from '../redux/slices/auth.slice';
import { SETTINGS_CONFIG, serviceApi } from '../configs';
import { ROLES } from '../constants';
import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from '../hooks/use-local-storage';
import { useEffect } from 'react';

// import { LOCALSTORAGE_LANGUAGE_KEY } from '@constants';
// import { useLocalStorage } from '@hooks';

export const InitApp = (props: { children: React.ReactNode }) => {
   const {authLogin} = useAuth();

   const { getLocalStorage } = useLocalStorage();

   const ROLE = getLocalStorage(SETTINGS_CONFIG.ROLE);

   const apiGetMePath = ROLE === ROLES[2] ? 'users/me' : ROLE === ROLES[1]  ? 'guides/me' : 'users/me';

   const { data } = useQuery(['getUserInfo'], async () => {
      const res = await serviceApi.request.get(apiGetMePath);
      return res.data;
   });

   useEffect(() => {
      if (data) {
         return authLogin(data);
      }
   }, [data]);

   return props.children;
};
