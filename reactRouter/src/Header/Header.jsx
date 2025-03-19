import {Link, NavLink} from 'react-router-dom';

function Header(){
    return (
        <header className="flex justify-between items-center w-full py-2 px-20 shadow sticky z-50 top-0">
            <figure className="w-40">
                <img src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" alt="logo" />
            </figure>
            
            <ul className="flex bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <li className="px-3">
                    <NavLink className={({isActive}) => `${isActive ? "text-orange-500" : "text-gray-500"}`} to="/">Home</NavLink>
                </li>
                <li className="px-3">
                    <NavLink className={({isActive}) => `${isActive ? "text-orange-500" : "text-gray-500"}`} to="/about">About</NavLink>
                </li>
                <li className="px-3">
                    <NavLink className={({isActive}) => `${isActive ? "text-orange-500" : "text-gray-500"}`} to="/contact">Contact</NavLink>
                </li>
                <li className="px-3">
                    <NavLink className={({isActive}) => `${isActive ? "text-orange-500" : "text-gray-500"}`} to="/github">Github</NavLink>
                </li>
            </ul>

            <ul className="flex bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <li className="px-3">
                    <Link to="/login">Login</Link>
                </li>
                <li className="px-3">
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;