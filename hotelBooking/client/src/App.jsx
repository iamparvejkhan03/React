import {Header, Footer} from './components';
import { Outlet, useLocation } from 'react-router-dom';
import {ScrollToTop, HotelRegistrationForm} from './components';
import { useAppContext, AppContextProvider } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

function App(){
    const {pathname} = useLocation();
    const ownerPath = pathname.includes("owner");
    const {showHotelRegForm} = useAppContext();

    return (
        <>
            <ScrollToTop />
            <Toaster />
            {showHotelRegForm && <HotelRegistrationForm />}
            {!ownerPath && <Header />}
            <Outlet />
            <Footer />
        </>
    );
}

export default App;