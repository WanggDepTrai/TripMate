/* eslint-disable import/order */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/global.css';

import { store } from './app/redux';

import { resources } from '@language';

import App from './app';
import { LANGUAGE, LOCALSTORAGE_LANGUAGE_KEY } from '@constants';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { InitApp } from '@helpers';

void i18next.init({
   resources,
   interpolation: { escapeValue: false },
   lng: localStorage.getItem(LOCALSTORAGE_LANGUAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCALSTORAGE_LANGUAGE_KEY) as string) === LANGUAGE.VI
         ? LANGUAGE.VI
         : LANGUAGE.EN
      : LANGUAGE.VI,
});

const queryClient = new QueryClient();
focusManager.setFocused(false);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.Fragment>
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
            <I18nextProvider i18n={i18next}>
               <InitApp>
                  <App />
               </InitApp>
               <ToastContainer position="bottom-right" />
            </I18nextProvider>
         </Provider>
      </QueryClientProvider>
   </React.Fragment>,
);
