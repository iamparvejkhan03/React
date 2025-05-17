import { Outlet } from 'react-router-dom';
import { Header } from '../index'

function Owner(){
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Owner;