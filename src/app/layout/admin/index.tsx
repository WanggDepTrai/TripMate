import React from 'react';
import Sidebar from './sidebar';
import Header from './header';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <Sidebar />
         <div className="w-[calc(100%)-266px] ml-[266px] p-4">
            <Header />
            {children}
         </div>
      </>
   );
};

export default AdminLayout;
