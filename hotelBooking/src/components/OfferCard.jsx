import { assets } from "../assets/assets";
import {Button} from './';
import { useNavigate } from "react-router-dom";

function OfferCard({offer}){
    const navigate = useNavigate();
    return (
        <div className="rounded-xl group overflow-hidden relative text-white h-56 sm:h-64 md:h-56 shadow-[0px_1px_5px_rgba(0,0,0,0.25)]">
            <img src={offer.image} alt="offer-img" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 h-full py-3 px-5 flex flex-col items-start justify-between">
                <p className="bg-white text-black px-2 py-1 rounded-full text-sm">{offer.priceOff}% Off</p>
                <div>
                    <h5 className="text-lg">{offer.title}</h5>
                    <p className="text-sm">{offer.description}</p>
                </div>
                <p className="text-gray-300">Expires {offer.expiryDate}</p>
                <button onClick={() => navigate('/offers')} className="flex items-center border-0 text-white cursor-pointer"><span >View Offers</span> <img className="invert ml-2 group-hover:ml-3" src={assets.arrowIcon} alt="" /></button>
            </div>
        </div>
    );
}

export default OfferCard;