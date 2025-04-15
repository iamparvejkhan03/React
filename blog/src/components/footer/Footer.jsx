import {Container} from "..";
import { NavLink, Link } from "react-router-dom";

function Footer(){
    const year = new Date();
    return (
        <footer className="text-white body-font bg-black">
            <Container>
                <div className="container py-10 mx-auto flex items-center sm:flex-row flex-col">

                    <NavLink className={({isActive}) => (isActive ? "flex title-font font-medium items-center md:justify-start justify-center text-orange-500" : "flex title-font font-medium items-center md:justify-start justify-center text-gray-900")}>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-black p-2 bg-white rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>

                    </NavLink>

                    <p className="text-sm it text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                        © {year.getFullYear()} TailBlogs —
                        <Link to="#" className="text-white ml-1">@ParvejKhan</Link>
                    </p>

                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <Link to="#" className="text-white text-lg ml-3"><i className="fa-brands fa-instagram"></i></Link>
                        <Link to="#" className="text-white text-lg ml-3"><i className="fa-brands fa-twitter"></i></Link>
                        <Link to="#" className="text-white text-lg ml-3"><i className="fa-brands fa-linkedin"></i></Link>
                        <Link to="#" className="text-white text-lg ml-3"><i className="fa-brands fa-x-twitter"></i></Link>
                    </span>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;