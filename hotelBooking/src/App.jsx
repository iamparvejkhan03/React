import {Header, Footer} from './components';
import { Outlet, useLocation } from 'react-router-dom';
import {ScrollToTop, HotelRegistrationForm} from './components';

function App(){
    const {pathname} = useLocation();
    const ownerPath = pathname.includes("owner");
    console.log(ownerPath)

    return (
        <>
            <ScrollToTop />
            {false && <HotelRegistrationForm />}
            {!ownerPath && <Header />}
            <Outlet />
            <Footer />
        </>
    );
}

export default App;