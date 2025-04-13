import { useSelector } from "react-redux";
import Container from "../container/Container";
import Logo from '../Logo';
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Header(){
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Sign Up',
            slug: '/signup',
            active: !authStatus
        }, 
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        }
    ];

    return (
        <header  className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="100px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {
                            navItems.map(item => (
                                item.active && (
                                    <li key={item.name}>
                                        <Link to={item.slug}>{item.name}</Link>
                                    </li>
                                )
                            ))
                        }
                        {
                            authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;