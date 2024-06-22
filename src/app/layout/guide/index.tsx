import Header from '@layout/admin/header';
import Sidebar from './sidebar';

export const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="w-full h-screen relative">
         <div className="fixed top-0 left-0 bottom-0">
            <Sidebar />
         </div>
         <div className="w-[calc(100%)-266px] ml-[266px] p-4">
            <Header />
            {children}
         </div>
      </div>
   );
};
