import { assets } from "../assets/assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {Button} from "./"
import { Link } from "react-router-dom";

function HotelCard({room, index}){
    return (
        <div className="bg-white rounded-xl overflow-hidden relative text-gray-600 w-full shadow-[0px_5px_10px_rgba(0,0,0,0.08)] ">
            <Link to={`/room/${room._id}`}>
                <img className="w-full max-h-52 object-cover" src={room.images[0]} alt="hotel-img" />
                <div className="p-5">
                    <div>
                        {index % 2 === 0 && <p className="absolute top-2 left-4 bg-white py-1 px-3 rounded-full text-black">Best Seller</p>}
                        <div className="flex justify-between">
                            <h6 className="text-lg text-black">{room.hotel.name}</h6>
                            <span><img className="inline-block mx-2" src={assets.starIconFilled} alt="rating-stars" />4.5</span>
                        </div>
                        <p>{<FontAwesomeIcon icon={faLocationDot} />} {room.hotel.address}</p>
                    </div><br />
                    <div className="flex justify-between items-center">
                        <p><span className="text-lg text-black">${room.pricePerNight}</span>/night</p>
                        <Button classes="border-2 border-gray-200 rounded py-2 px-4">Book Now</Button>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HotelCard;