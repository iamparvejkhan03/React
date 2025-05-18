import { UserButton } from "@clerk/clerk-react";
import { assets } from "../../assets/assets";
import { Container } from "../../components";
import { Link } from "react-router-dom";

function Header(){
    return (
        <header className="flex justify-between shadow py-5 px-10 fixed bg-white z-50 w-full">
            <Link to="/">
                <img className="invert" src={assets.logo} alt="logo" />
            </Link>
            <UserButton />
        </header>
    );
}

export default Header;