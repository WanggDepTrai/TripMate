// import { useAuth } from '@App/redux/slices/auth.slice';
import { SETTINGS_CONFIG } from '@configs';
import { ROLES, ROUTE_PATH } from '@constants';
import { useLocalStorage } from '@hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/app/redux/slices';

function PublicRouter({ children }: { children?: React.ReactNode }) {
   const { isAuhthentication } = useAuth();
   const { getLocalStorage } = useLocalStorage();
   if (isAuhthentication && getLocalStorage(SETTINGS_CONFIG.ROLE)) {
      const redirectRoute = '/'
         // getLocalStorage(SETTINGS_CONFIG.ROLE) === ROLES[0]
         //    ? ROUTE_PATH.ADMIN_HOME
         //    : getLocalStorage(SETTINGS_CONFIG.ROLE) === ROLES[1]
         //    ? ROUTE_PATH.GUIDE_HOME
         //    : ROUTE_PATH.CLIENT_HOME;

      return <Navigate to={redirectRoute} />;
   }

   return children || <Outlet />;
}
export { PublicRouter };
