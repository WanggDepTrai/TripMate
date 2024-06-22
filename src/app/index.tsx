import { BrowserRouter } from 'react-router-dom';

import CoreComfirmProvider from './components/design-systems/CoreComfirm';

import Routers from '~/app/routes';

const App = () => {
   return (
      <CoreComfirmProvider>
         <BrowserRouter>
            <Routers />
         </BrowserRouter>
      </CoreComfirmProvider>
   );
};

export default App;
