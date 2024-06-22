import { useRoutes, type RouteObject } from 'react-router-dom';

import clientRoutes from './client-route';
import guideRoutes from './guide-route';

import { ROUTE_PATH } from '~/app/constants';
import { Register, SignIn } from '@pages';
import adminRoute from './admin-route';
import { PublicRouter } from './components';

const routes = (): RouteObject[] => {
   return [
      /**
       * Route Public
       * Route sign-in
       */
      {
         path: ROUTE_PATH.SIGN_IN,
         element: (
            <PublicRouter>
               <SignIn />
            </PublicRouter>
         ),
      },

      {
         path: ROUTE_PATH.REGISTER,
         element: (
            <PublicRouter>
               <Register />
            </PublicRouter>
         ),
      },

      guideRoutes,
      clientRoutes,
      adminRoute,

      /**
       * Nod found route 404
       */
      {
         path: '*',
         element: <>404</>,
      },
   ];
};

export default function Routers() {
   return useRoutes(routes());
}
