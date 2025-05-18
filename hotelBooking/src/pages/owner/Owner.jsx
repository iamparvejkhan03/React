import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../index'

function Owner(){
    return (
        <>
            <Header />
            <main className='min-h-[70vh] py-19 flex'>
                <Sidebar />
                <Outlet />
            </main>
        </>
    );
}

export default Owner;