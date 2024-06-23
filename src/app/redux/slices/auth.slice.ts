import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../rootReducer';
import { SETTINGS_CONFIG } from '@configs';

interface InitialState {
   user: {
      _id: string;
      code: string;
      account_name: string;
      full_name: string;
      fullName: string;
      email: string;
      phone: string;
      avatar_url: string;
      role_id: string;
      isAdmin: boolean;
      gender: string;
      birth_day: string;
      address: string;
      cccd_number: string;
      status?: string;
      hire_date: string;
   } | null;
   isAuhthentication: boolean;
}

const initialState: InitialState = {
   user: null,
   isAuhthentication: localStorage.getItem(SETTINGS_CONFIG.ACCESS_TOKEN_KEY) ? true : false,
};

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      actionLoginReducer: (state, action) => {
         state.user = action.payload;
         state.isAuhthentication = true;
      },

      actionLogoutReducer: (state) => {
         localStorage.clear();
         state.isAuhthentication = false;
         state.user = null;
      },
   },
   extraReducers: (builder) => {
      builder;
   },
});

const { actionLoginReducer, actionLogoutReducer } = authSlice.actions;

export const useAuth = () => {
   const dispatch: any = useDispatch();
   const auth = useSelector((state: RootState) => state.auth);

   // const authRefreshToken = () => {
   //    return dispatch(actionRefreshToken());
   // };

   const authLogin = (data: AxiosResponseData | any) => {
      dispatch(actionLoginReducer(data));
   };

   const authLogout = () => {
      localStorage.removeItem(SETTINGS_CONFIG.ACCESS_TOKEN_KEY);
      dispatch(actionLogoutReducer());
   };

   return { ...auth, authLogin, authLogout };
};

export default authSlice;
