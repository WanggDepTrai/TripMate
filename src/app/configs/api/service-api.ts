import { SETTINGS_CONFIG } from '@configs/settings';
import type { AxiosInstance } from 'axios';
import { createInstance } from './axios-config';

class ServiceApi {
   BASE_URL: string = SETTINGS_CONFIG.API_URL + '/api/v1/';

   request!: AxiosInstance;

   constructor() {
      this.setRequest();
   }

   setRequest() {
      this.request = createInstance(this.BASE_URL);
   }
}

const serviceApi = new ServiceApi();

export { serviceApi };
