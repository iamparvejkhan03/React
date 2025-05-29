import { Link, useNavigate } from "react-router-dom";
import { assets, facilityIcons } from "../assets/assets";

function RoomCard({room}){
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 border-b-2 border-gray-300 py-10">
            <img onClick={() => navigate(`/room/${room._id}`)} className="w-full lg:w-1/2 rounded-xl max-h-64 object-cover cursor-pointer" src={room.images[0]} alt="room-image" />
            <div className="min-h-full flex flex-col justify-around">
                <p className="text-gray-500">{room.hotel.address}</p>
                <h5 className="text-xl"><Link to={`/room/${room._id}`}>{room.hotel.name}</Link></h5>
                <p className="flex">
                    {
                        Array(5).fill('').map((_, index) => (
                            <img key={index} className="h4 w-4" src={assets.starIconFilled} alt="star-filled-icon" />
                        ))
                    }
                    <span className="mx-3">200+ reviews</span>
                </p>
                <p className="text-gray-500"><img className="inline-block align-middle" src={assets.locationIcon} alt="location-icon" /> Los Angeles, California, USA</p>
                <div className="flex gap-2 flex-wrap my-3 lg:my-0">
                    {
                        room.amenities.map((amenity, index) => (
                            <span key={index} className="text-sm bg-gray-300/50 p-2 rounded"><img className="inline-block" src={facilityIcons[amenity]} alt={`${amenity}`} /> {amenity}</span>
                        ))
                    }
                </div>
                <p className="font-semibold">${room.pricePerNight}/day</p>
            </div>
        </div>
    );
}

export default RoomCard;