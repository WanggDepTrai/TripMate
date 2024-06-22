import * as yup from 'yup';

import GUIDE_ROUTE from './guide-route-path';
import CLIENT_ROUTE_PATH from './client-route-path';
import ADMIN_ROUTE from './admin-route-path';

export const ROUTE_PATH = {
   /**
    * @admin
    */
   ...ADMIN_ROUTE,

   /**
    * @guide
    */
   ...GUIDE_ROUTE,

   /**
    * @client
    */
   ...CLIENT_ROUTE_PATH,

   SIGN_IN: '/sign-in',

   REGISTER: '/register',

   ERROR_404: '/error/404',

   ALL: '*',
} as const;

export const routePathSchema = yup.string().oneOf(Object.values(ROUTE_PATH)).required();

export type RoutePath = yup.InferType<typeof routePathSchema>;
