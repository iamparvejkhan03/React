import { Link, NavLink } from "react-router-dom";
import { Button, Container } from "..";

function Header(){
    return (
        <header>
            <Container>
                <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
                    <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-black rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl font-extrabold uppercase italic">TailBlogs</span>
                    </Link>

                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <NavLink to="/" className={({isActive}) => (isActive ? "mr-5 text-orange-500 hover:text-orange-700 font-semibold" : "mr-5 hover:text-gray-900")}>Home</NavLink>

                        <NavLink to="/all-posts" className={({isActive}) => (isActive ? "mr-5 text-orange-500 hover:text-orange-700" : "mr-5 hover:text-gray-900")}>All Posts</NavLink>

                        <NavLink to="/add-post" className={({isActive}) => (isActive ? "mr-5 text-orange-500 hover:text-orange-700" : "mr-5 hover:text-gray-900")}>Add Post</NavLink>
                    </nav>
                    
                    <div className="md:min-w-1/6 md:flex md:justify-between">
                        <Link to="/"><Button className="border rounded-sm py-2 px-5 hover:bg-gray-100 cursor-pointer">Log In <i className="fa-regular fa-user"></i></Button></Link>
                        <Link to="/register"><Button>Register</Button></Link>
                    </div>

                </div>
            </Container>
        </header>
    );
}

export default Header;