import { useParams, useNavigate } from "react-router-dom";
import { assets, roomsDummyData, facilityIcons, roomCommonData, testimonials } from "../assets/assets";
import { Button, Container, Heading, Input } from "../components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

function Room(){
    const {id} = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const { axios, rooms, getToken, user } = useAppContext();
    const [isAvailable, setIsAvailable] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const roomById = rooms.find(room => room._id === id);
        roomById && setRoom(roomById);
        roomById && setMainImage(roomById.images[0]);
    }, [rooms])

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm({
            defaultValues: {
                checkIn: "",
                checkOut: "",
                guests: "",
            }
    });

    const checkAvailability = async () => {
        const {data} = await axios.post('/api/bookings/check-room-availability', {room: id, checkInDate: getValues('checkIn'), checkOutDate: getValues('checkOut')});

        if(data.success){
            setIsAvailable(true);
            toast.success(data.message);
        }else{
            setIsAvailable(false);
            toast.error(data.message);
        }
    }

    useEffect(() => {
        checkAvailability();
    }, [id])
    
    const handleFormSubmit = async (formData) => {
        try{
            if(!isAvailable){
                checkAvailability();
                return;
            }
            const { data } = await axios.post('/api/bookings/create', {room:id, checkInDate:formData.checkIn, checkOutDate:formData.checkOut, guests:formData.guests}, {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success){
                navigate('/my-bookings')
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.message);
        }finally{
            setValue("checkIn", "");
            setValue("checkOut", "");
            setValue("guests", ""); 
        }
    }
    
    return (room &&
        <main className="min-h-[70vh] pt-24">
            {room && (
                <Container>
                    {/* Heading section */}
                    <div className="mb-5">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl md:text-2xl">{room.hotel.name}</h1>
                            <p className="text-sm">[{room.roomType}]</p>
                            <p className="bg-orange-500 py-1 px-2 rounded-full text-white text-xs">20% Off</p>
                        </div>
                        <p className="flex gap-0.5 my-2">
                            {
                                Array(5).fill('').map((_, index) => (
                                    <img key={index} className="h4 w-4" src={assets.starIconFilled} alt="star-rating" />
                                ))
                            }
                            <span className="mx-3">200+ reviews</span>
                        </p>
                        <p className="text-gray-500 text-sm"><img className="inline-block align-middle" src={assets.locationIcon} alt="location-icon" /> {`${room.hotel.address}, ${room.hotel.city}`}</p>
                    </div>
                    
                    {/* Images section */}
                    <section className="flex flex-wrap md:flex-nowrap gap-5">
                        <div className="md:w-1/2"> 
                            <img className="max-w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-110" src={mainImage} alt="mainImage" />
                        </div>
                        <div className="md:w-1/2 flex flex-wrap gap-3 md:gap-5">
                            {
                                room.images.map((img, index) => (
                                    <img onClick={() => setMainImage(img)} className={`w-1/3 grow rounded-xl cursor-pointer ${mainImage === img && "outline-2 outline-orange-500/70"}`} key={index} src={img} alt="room-img" />
                                ))
                            }
                        </div>
                    </section>

                    {/* Pricing section */}
                    <div className="md:flex items-center justify-between border-b-2 border-gray-300/50 py-5">
                        <div className="">
                            <Heading>Experience Luxury Like Never Before</Heading>
                            <div className="flex gap-2 flex-wrap my-3 lg:my-0">
                                {
                                    room.amenities.map((amenity, index) => (
                                        <span key={index} className="text-sm bg-gray-300/50 p-2 rounded"><img className="inline-block" src={facilityIcons[amenity]} alt={`Free ${amenity}`} /> {amenity}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <p className="text-2xl">${room.pricePerNight}/day</p>
                    </div>

                    {/* Availability form section */}
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex items-end flex-wrap bg-white p-5 rounded-md my-14 shadow-[2px_2px_20px_rgba(0,0,0,0.2)]">

                        <div className="flex flex-col order-3 w-full sm:w-1/2 sm:px-2 md:w-1/3 lg:w-2/9">
                            <Input type="date" inputClasses="border-2 border-gray-200 rounded py-1 px-2 text-gray-900 my-2" label="Check In" labelClasses="text-gray-500" labelIconClasses="fas fa-calendar-alt" {...register("checkIn", {required:true})} />
                            {errors.checkIn && <p className="text-red-500 text-sm ">Check in is required!</p>}
                        </div>

                        <div className="flex flex-col order-4 w-full sm:w-1/2 sm:px-2 md:w-1/3 lg:w-2/9">
                            <Input type="date" inputClasses="border-2 border-gray-200 rounded py-1 px-2 text-gray-900 my-2" label="Check Out" labelClasses="text-gray-500" labelIconClasses="fas fa-calendar-alt" {...register("checkOut", {required:true})} />
                            {errors.checkOut && <p className="text-red-500 text-sm ">Check out is required!</p>}
                        </div>

                        <div className="flex flex-col order-2 w-full sm:w-1/2 sm:px-2 md:w-1/3 lg:w-2/9">
                            <Input type="number" inputClasses="border-2 border-gray-200 rounded py-1 px-2 text-gray-900 my-2" placeholder="0" label="No. of Guests" labelClasses="text-gray-500" labelIconClasses="fa-regular fa-user" {...register("guests", {required:true, min:1})} />
                            {errors.guests && <p className="text-red-500 text-sm ">No. of guests is required!</p>}
                        </div>

                        <Input type="submit" value={isAvailable ? `Book Now` : 'Check Availability'} inputClasses="text-white bg-black py-1.5 px-5 rounded order-5 my-2 cursor-pointer grow" />
                    </form>

                    {/* Room features section */}
                    <section>
                        <div className="border-b-2 border-gray-300/50 md:w-3/5 lg:w-2/5">
                            {
                                roomCommonData.map((data, index) => (
                                    <div key={index} className="flex items-start gap-2 my-3">
                                        <img src={data.icon} alt={data.title} />
                                        <div>
                                            <h6 className="text-lg">{data.title}</h6>
                                            <p className="text-gray-500">{data.description}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <p className="md:w-4/5 py-8 border-b-2 text-gray-500 border-gray-300/50">Guests will be allocated on the ground floor based on availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guests, at guests slot please mark the number of guests to get the exact price for groups. The guests will be allocated for ground floor based on the availability.</p>
                    </section>

                    {/* Location map section */}
                    <section className="border-b-2 border-gray-300/50 py-8">
                        <Heading>Location on Map</Heading>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2487.8055182116304!2d76.84438369095105!3d28.1377102750598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1747386202440!5m2!1sen!2sin" className="w-full h-96 md:h-120 lg:h-140" style={{border:'1px solid #eee'}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <h5 className="my-5">{room.hotel.address}</h5>
                        <p className="text-gray-500">It's like a home away from home.</p>
                    </section>

                    {/* Reviews section */}
                    <section className="my-8">
                        <div className="flex gap-3">
                            <img className="h-12 w-12 rounded-full object-cover" src={testimonials[1].image} alt="" />
                            <div>
                                <h6 className="font-[500]">{`Hosted by ${room.hotel.owner.username}`}</h6>
                                <div className="flex sm:items-center flex-col sm:flex-row sm:gap-4 md:gap-14 flex-wrap">
                                    <p className="flex gap-0.5 my-1">
                                        {
                                            Array(5).fill('').map((_, index) => (
                                                <img key={index} className="h4 w-4" src={assets.starIconFilled} alt="star-rating" />
                                            ))
                                        }
                                        <span className="mx-3">200+ reviews</span>
                                    </p>
                                    <p>Response rate: 100%</p>
                                    <p>Response time: 30 min</p>
                                </div>
                                <button className="border-2 border-gray-200 rounded py-2 px-4 cursor-pointer bg-blue-600 text-white text-sm my-3 hover:bg-blue-600/90">Contact Now</button>
                            </div>
                        </div>
                    </section>
                </Container>
            )}
        </main>
    );
}

export default Room;