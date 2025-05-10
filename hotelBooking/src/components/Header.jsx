import {assets} from '../assets/assets';
import {Container, Button} from '.'
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        {name: 'Home', path: '/'},
        {name: 'Hotels', path: '/rooms'},
        {name: 'Experience', path: '/experience'},
        {name: 'About', path: '/about'},
    ];

    return (
        <header className="w-full fixed">
            <Container classes="flex justify-between items-center">
                <Link to="/" className='z-50'>
                    <img src={assets.logo} alt="logo" className={`h-7 lg:h-9 ${isMenuOpen && 'invert'} lg:invert-0`} />
                </Link>

                <nav className={`w-0 ${isMenuOpen && 'absolute top-0 left-0 w-full h-[100vh] flex justify-center items-center bg-white'} transition-w duration-300 lg:block lg:w-auto lg:bg-transparent lg:static`}>
                    <ul className={`${isMenuOpen ? 'flex flex-col text-center' : 'hidden'} lg:flex lg:text-left lg:flex-row lg:items-center lg:gap-x-10 gap-y-6 lg:gap-y-0`}>
                        {
                            isMenuOpen && <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.closeMenu} className='h-7 lg:hidden absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 cursor-pointer' />
                        }
                        {
                            navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink to={link.path} className={"lg:text-white"}>{link.name}</NavLink>
                                </li>
                            ))
                        }
                        <li><Button classes='lg:text-white border text-sm border-black lg:border-white px-3 py-1 rounded-full cursor-pointer'>Dashboard</Button></li>
                        {
                            isMenuOpen && <Button classes='inline text-white bg-black border border-black px-3 py-1 rounded-full lg:hidden cursor-pointer'>Login</Button>
                        }
                    </ul>
                </nav>

                <div className='lg:flex lg:gap-x-10 lg:items-center hidden'>
                    <img src={assets.searchIcon} alt="search-icon" className='h-7' />
                    <Button classes='inline text-white bg-black border border-black px-8 py-2 rounded-full cursor-pointer'>Login</Button>
                </div>

                <div className='lg:hidden'>
                    <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menu-icon" className='h-5 cursor-pointer' />
                </div>
            </Container>
        </header>
    );
}

export default Header;