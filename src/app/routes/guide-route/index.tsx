import { type RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@constants';
import { LayoutAdmin } from '@layout';
import { Dashboard, GuideMessage, TransactionGuide, Tripmate } from '@pages';
import { GuideRouter } from '../components';

const adminRoutes: RouteObject = {
   path: ROUTE_PATH.GUIDE_HOME,
   element: <GuideRouter />,
   children: [
      {
         index: true,
         element: (
            <LayoutAdmin>
               <Dashboard />
            </LayoutAdmin>
         ),
      },
      {
         path: ROUTE_PATH.TRIPMATE,
         element: (
            <LayoutAdmin>
               <Tripmate />
            </LayoutAdmin>
         ),
      },
      {
         path: ROUTE_PATH.GUIDE_MESSAGE,
         element: (
            <LayoutAdmin>
               <GuideMessage />
            </LayoutAdmin>
         ),
      },
      {
         path: ROUTE_PATH.TRANSACTION_GUIDE,
         element: (
            <LayoutAdmin>
               <TransactionGuide />
            </LayoutAdmin>
         ),
      },
   ],
};

export default adminRoutes;
