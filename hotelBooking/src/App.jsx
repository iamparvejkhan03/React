import {Header, Footer} from './components';
import { Outlet } from 'react-router-dom';
import {ScrollToTop} from './components';

function App(){
    return (
        <>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;