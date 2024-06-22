import { Outlet, type RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@constants';
import { AdminDashboard, AllCustomer, AllGuide, TransactionAdmin } from '@pages';
import AdminLayout from '@layout/admin';
import { AdminRouter } from '../components';
import { Booking } from '@pages/admin/booking';
/**
 *  Purchase page link for users
 */

const adminRoute: RouteObject = {
   path: ROUTE_PATH.ADMIN_HOME,
   element: <AdminRouter />,
   children: [
      {
         index: true,
         element: (
            <AdminLayout>
               <AdminDashboard />
            </AdminLayout>
         ),
      },
      {
         path: ROUTE_PATH.ADMIN_ALL_GUIDE,
         element: (
            <AdminLayout>
               <AllGuide />
            </AdminLayout>
         ),
      },
      {
         path: ROUTE_PATH.ADMIN_ALL_CUSTOMERS,
         element: (
            <AdminLayout>
               <AllCustomer />
            </AdminLayout>
         ),
      },
      {
         path: ROUTE_PATH.ADMIN_BOOKING,
         element: (
            <AdminLayout>
               <Booking />
            </AdminLayout>
         ),
      },
      {
         path: ROUTE_PATH.TRANSACTION_ADMIN,
         element: (
            <AdminLayout>
               <TransactionAdmin />
            </AdminLayout>
         ),
      },
   ],
};

export default adminRoute;
