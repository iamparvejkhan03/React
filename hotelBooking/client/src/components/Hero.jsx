import {Container, Input} from ".";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Hero(){
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm({
        defaultValues: {
            destination: "",
            checkIn: "",
            checkOut: "",
            guests: "",
        }
    });

    const { seachedCities, setSeachedCities, axios, getToken } = useAppContext();
    const navigate = useNavigate();

    const handleFormSubmit = async (data) => {
        navigate(`/rooms?destination=${getValues('destination')}`);
        
        await axios.post('/api/user/store-recent-search', {recentSearchedCity: getValues('destination')}, {headers: {Authorization: `Bearer ${await getToken()}`}});

        setValue("destination", "");
        setValue("checkIn", "");
        setValue("checkOut", "");
        setValue("guests", "");

        setSeachedCities((prevSearchedCities) => {
            const updatedSearchCities = [...prevSearchedCities, getValues('destination')];
            if(updatedSearchCities.length > 3){
                updatedSearchCities.shift();
            }
            return updatedSearchCities;
        })
    }

    return (
        
        <section className={`w-full min-h-screen bg-[url('./assets/heroImage.png')] bg-cover bg-center bg-no-repeat flex justify-start items-center py-28`}>
            <Container classes="text-white w-full xl:w-4/5">
                <p className="bg-blue-300 inline-block py-1 px-3 rounded-full ">The Ultimate Hotel Experience</p>
                <h1 className="text-3xl font-bold my-2 lg:my-4 lg:text-4xl xl:text-5xl">Discover Your Perfect Getaway Destination</h1>
                <p>Unparalleled luxury and confort await of the world's most exlusive hotels and resorts. Start your journey today!</p>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex items-end flex-wrap bg-white p-5 rounded-md mt-4">
                    <div className="flex flex-col order-1 w-full sm:w-1/2 sm:px-2 md:w-1/3 lg:w-2/9">
                        <Input type="text" inputClasses="border-2 border-gray-200  rounded py-1 px-2 text-gray-900 my-2" placeholder="Type here" label="Destination" labelClasses="text-gray-500" labelIconClasses="fa-solid fa-location-dot" {...register("destination", {required:true})} />
                        {errors.destination && <p className="text-red-500 text-sm ">Destination is required!</p>}
                    </div>

                    <div className="flex flex-col order-3 w-full sm:w-1/2 sm:px-2 md:w-1/3 lg:w-2/9">
                        <Input type="date" inputClasses="border-2 border-gray-200 rounded py-1 px-2 text-gray-900 my-2" label="Check In" labelClasses="text-gray-500" labelIconClasses="fas fa-calendar-alt" {...register("checkIn", {required:false})} />
                        {errors.checkIn && <p className="text-red-500 text-sm ">Check in is required!</p>}
                    </div>

                    <div className="flex flex-col order-4 w-full sm:w-1/2 sm:px-2 md:w-1/3 lg:w-2/9">
                        <Input type="date" inputClasses="border-2 border-gray-200 rounded py-1 px-2 text-gray-900 my-2" label="Check Out" labelClasses="text-gray-500" labelIconClasses="fas fa-calendar-alt" {...register("checkOut", {required:false})} />
                        {errors.checkOut && <p className="text-red-500 text-sm ">Check out is required!</p>}
                    </div>

                    <div className="flex flex-col order-2 w-full sm:w-1/2 sm:px-2 md:w-1/3 lg:w-2/9">
                        <Input type="number" inputClasses="border-2 border-gray-200 rounded py-1 px-2 text-gray-900 my-2" placeholder="0" label="No. of Guests" labelClasses="text-gray-500" labelIconClasses="fa-regular fa-user" {...register("guests", {required:false})} />
                        {errors.guests && <p className="text-red-500 text-sm ">No. of guests is required!</p>}
                    </div>

                    <Input type="submit" value="Search" inputClasses="text-white bg-black py-1.5 px-5 rounded order-5 my-2 grow-1 sm:grow-0" />
                </form>
            </Container>
        </section>
    );
}

export default Hero;