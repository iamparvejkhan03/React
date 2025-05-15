import { assets } from '../assets/assets';
import {Button, Container, Heading, Input} from './';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Newsletter(){
    return (
        <Container classes='my-8'>
            <section className='bg-blue-950 text-white min-h-64 xl:h-72 p-5 md:p-8 lg:p-10 xl:p-14 flex flex-col justify-between rounded-xl shadow-[0px_5px_10px_rgba(0,0,0,0.2)]'>
                <h2 className='text-center text-xl md:text-2xl'>Stay Inspired</h2>
                <p className='text-sm text-gray-300 text-center'>Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.</p>

                <form className='flex flex-col my-3 gap-3 md:flex-row md:items-center md:justify-center'>
                    <Input type="email" inputClasses="border-2 border-gray-500 rounded p-2 text-white text-sm" placeholder="Enter your email" />
                    <button type="submit" className="bg-black border-2 border-black rounded py-2 px-4 text-sm flex justify-center items-center gap-2 cursor-pointer group"><span>Subscribe</span> <FontAwesomeIcon className='group-hover:translate-x-1 transition-all' icon={faArrowRight} /></button>
                </form>

                <p className='text-gray-300 text-center text-xs font-light'>By subscribing, you agree to our Privacy Policy and consent to receice updates.</p>
        </section>
        </Container>
    );
}

export default Newsletter;