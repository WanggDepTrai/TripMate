import { Outlet, type RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@constants';
import { Booking, Guide, GuideProfile, HomeClient } from '@pages';
import { LayoutClient } from '@layout';
import { ClientRouter } from '../components';

/**
 *  Purchase page link for users
 */

const clientRoutes: RouteObject = {
   path: ROUTE_PATH.CLIENT_HOME,
   element: <ClientRouter />,
   children: [
      {
         index: true,
         element: (
            <LayoutClient>
               <HomeClient />
            </LayoutClient>
         ),
      },
      {
         path: ROUTE_PATH.CLIENT_GUIDE,
         element: (
            <LayoutClient>
               <Guide />
            </LayoutClient>
         ),
      },
      {
         path: ROUTE_PATH.CLIENT_GUIDE_PROFILE,
         element: (
            <LayoutClient>
               <GuideProfile />
            </LayoutClient>
         ),
      },
      {
         path: ROUTE_PATH.BOOKING + '/:id',
         element: (
            <LayoutClient>
               <Booking />
            </LayoutClient>
         ),
      },
   ],
};

export default clientRoutes;
