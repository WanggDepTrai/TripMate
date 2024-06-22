// import { useAuth } from '@App/redux/slices/auth.slice';
import { ROLES } from '@constants';
import { useLocalStorage } from '@hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/app/redux/slices';

export function GuideRouter({ children }: { children?: React.ReactNode }) {
   const { isAuhthentication } = useAuth();
   const { getLocalStorage } = useLocalStorage();

   if (!isAuhthentication || getLocalStorage('role') !== ROLES[1]) {
      return <Navigate to="/" replace />;
   }

   return children || <Outlet />;
}
