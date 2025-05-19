import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import {Input, Container} from "./";

function Footer(){
    return (
        <footer className="text-gray-500/80 bg-[#F6F9Fc]">
            {/* <div className='text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'> */}
            <Container>
            <div className='flex flex-wrap md:justify-between gap-12 md:gap-6'>
                <div className='w-full md:max-w-80'>
                    <img src={assets.logo} alt="logo" className='mb-4 h-7 md:h-9 invert' />
                    <p className='text-sm'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        <img src={assets.instagramIcon} alt="Instagram-Icon" />
                        <img src={assets.facebookIcon} alt="Facebook-Icon" />
                        <img src={assets.twitterIcon} alt="Twitter-Icon" />
                        <img src={assets.linkendinIcon} alt="LinkedIn-Icon" />
                    </div>
                </div>

                <div>
                    <p className='text-md text-gray-800'>COMPANY</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><Link to={"/"}>About</Link></li>
                        <li><Link to={"/"}>Careers</Link></li>
                        <li><Link to={"/"}>Press</Link></li>
                        <li><Link to={"/"}>Blog</Link></li>
                        <li><Link to={"/"}>Partners</Link></li>
                    </ul>
                </div>

                <div>
                    <p className='text-md text-gray-800'>SUPPORT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><Link to={"/"}>Help Center</Link></li>
                        <li><Link to={"/"}>Safety Information</Link></li>
                        <li><Link to={"/"}>Cancellation Options</Link></li>
                        <li><Link to={"/"}>Contact Us</Link></li>
                        <li><Link to={"/"}>Accessibility</Link></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className='text-md text-gray-800'>STAY UPDATED</p>
                    <p className='mt-3 text-sm'>
                        Subscribe to our newsletter for inspiration and special offers.
                    </p>
                    <div className='flex items-center flex-wrap mt-4'>
                        <Input type="email" inputClasses="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none mx-w-[100%]" placeholder='Your email' />
                        <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'>
                            {/* Arrow icon */}
                            <img src={assets.arrowIcon} alt="arrow-icon" className="invert" />
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} QuickStay. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><Link to={"/"}>Privacy</Link></li>
                    <li><Link to={"/"}>Terms</Link></li>
                    <li><Link to={"/"}>Sitemap</Link></li>
                </ul>
            </div>
            </Container>
        {/* </div> */}
        </footer>
    );
}

export default Footer;