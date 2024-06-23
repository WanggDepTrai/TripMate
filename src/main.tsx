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

const storedLanguage = localStorage.getItem(LOCALSTORAGE_LANGUAGE_KEY);

let selectedLanguage;

if (storedLanguage) {
   try {
      selectedLanguage = JSON.parse(storedLanguage);
   } catch (e) {
      // Nếu parse thất bại, sử dụng giá trị mặc định
      selectedLanguage = LANGUAGE.VI;
   }
} else {
   selectedLanguage = LANGUAGE.VI;
}

// Kiểm tra ngôn ngữ đã lưu
const lng = selectedLanguage === LANGUAGE.VI ? LANGUAGE.VI : LANGUAGE.EN;

void i18next.init({
   resources,
   interpolation: { escapeValue: false },
   lng: lng,
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
