import {assets} from '../assets/assets';
import {Container, Button} from '.'
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const {openSignIn} = useClerk();
    const {user, isSignedIn} = useUser();
    const element = <FontAwesomeIcon icon={faBook} />
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    }

    useEffect(() => {
        if(location.pathname !== "/") setIsScrolled(true);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const navLinks = [
        {name: 'Home', path: '/'},
        {name: 'Hotels', path: '/rooms'},
        {name: 'Experience', path: '/experience'},
        {name: 'About', path: '/about'},
    ];

    return (
        <header className={`w-full fixed transition-all duration-200 z-50 ${isScrolled && "bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.5)]"}`}>
            <Container classes="flex justify-between items-center">
                <Link to="/" className='z-50'>
                    <img src={assets.logo} alt="logo" className={`h-7 lg:h-9 ${(isMenuOpen || isScrolled) && 'invert'}`} />
                </Link>

                <nav className={`w-0 ${isMenuOpen && 'absolute top-0 left-0 w-full h-[100vh] flex justify-center items-center bg-white'} transition-w duration-300 lg:block lg:w-auto lg:bg-transparent lg:static`}>
                    <ul className={`${isMenuOpen ? 'flex flex-col text-center' : 'hidden'} lg:flex lg:text-left lg:flex-row lg:items-center lg:gap-x-10 gap-y-6 lg:gap-y-0`}>
                        {
                            isMenuOpen && <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.closeMenu} className='h-7 lg:hidden absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 cursor-pointer' />
                        }
                        {
                            navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink to={link.path} className={({isActive}) => `${isActive ? "text-blue-300" : isScrolled ? "lg:text-black" : "lg:text-white"}`}>{link.name}</NavLink>
                                </li>
                            ))
                        }
                        {isSignedIn && <li><Button onClick={() => navigate("/owner")} classes={`${!isScrolled && 'lg:text-white lg:border-white'} border text-sm border-black px-3 py-1 rounded-full cursor-pointer`}>Dashboard</Button></li>}
                        {
                            (isMenuOpen && !isSignedIn) && <Button onClick={openSignIn} classes='inline text-white bg-black border border-black px-3 py-1 rounded-full lg:hidden cursor-pointer'>Login</Button>
                        }
                    </ul>
                </nav>

                <div className='lg:flex lg:gap-x-10 lg:items-center hidden'>
                    <img src={assets.searchIcon} alt="search-icon" className={`h-7 ${isScrolled && 'invert'}`} />
                    {isSignedIn ?
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action onClick={() => navigate("/my-bookings")} label="My Booking" labelIcon={element} />
                            </UserButton.MenuItems>
                        </UserButton> : 
                        
                        <Button onClick={openSignIn} classes='inline text-white bg-black border border-black px-8 py-2 rounded-full cursor-pointer'>Login</Button>}
                </div>

                <div className='lg:hidden flex items-center gap-4'>
                    {isSignedIn && <UserButton>
                                        <UserButton.MenuItems>
                                            <UserButton.Action onClick={() => navigate("/my-bookings")} label="My Booking" labelIcon={element} />
                                        </UserButton.MenuItems>
                                    </UserButton>}
                    <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menu-icon" className={`h-5 cursor-pointer ${isScrolled && 'invert'}`} />
                </div>
            </Container>
        </header>
    );
}

export default Header;