// import { useAuth } from '@App/redux/slices/auth.slice';
import { ROLES } from '@constants';
import { useLocalStorage } from '@hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function ClientRouter({ children }: { children?: React.ReactNode }) {
   const { getLocalStorage } = useLocalStorage();

   if (getLocalStorage('role') && getLocalStorage('role') !== ROLES[2]) {
      return <Navigate to="/sign-in" replace />;
   }

   return children || <Outlet />;
}
