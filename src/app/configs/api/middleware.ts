import { SETTINGS_CONFIG } from '@configs/settings';
import { type InternalAxiosRequestConfig } from 'axios';

const middleware = <T>(requestConfig: InternalAxiosRequestConfig<T>) => {
   const authToken = localStorage.getItem(SETTINGS_CONFIG.ACCESS_TOKEN_KEY as string)
      ? JSON.parse(localStorage.getItem(SETTINGS_CONFIG.ACCESS_TOKEN_KEY as string) as string)
      : '';

   if (authToken) {
      requestConfig.headers.Authorization = `Bearer ${authToken}`;
      return requestConfig;
   }

   return requestConfig;
};

export default middleware;
