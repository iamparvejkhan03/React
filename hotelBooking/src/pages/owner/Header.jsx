import { UserButton } from "@clerk/clerk-react";
import { assets } from "../../assets/assets";
import { Container } from "../../components";

function Header(){
    return (
        <header className="fixed top-0 w-full">
            <Container classes="flex items-center justify-between bg-white shadow">
                <img src={assets.logo} alt="logo" className="invert" />
                <UserButton />
            </Container>
        </header>
    );
}

export default Header;