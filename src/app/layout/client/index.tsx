import React from 'react';

import { HeaderClient } from './header-client';
import { Footer } from './footer';

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="flex flex-col overflow-hidden ">
         <HeaderClient />
         <div className="">{children}</div>
         <Footer />
      </div>
   );
};
