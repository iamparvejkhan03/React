import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Heading, Input } from './';
import { useForm } from "react-hook-form";

function HotelRegistrationForm(){
    const {setShowHotelRegForm, axios, getToken, setIsOwner} = useAppContext();
    
    const {register, handleSubmit, setValue} = useForm({
            defaultValues: {
                hotel: "",
                contact: "",
                address: "",
                city: "",
            }
        });
    
    const handleFormSubmit = async (formData) => {
        try {
            // console.log(formData);
            const {data} = await axios.post('/api/hotels/register', {name: formData.hotel, contact: formData.contact, address: formData.address, city: formData.city}, {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success){
                toast.success(data.message);
                setIsOwner(true);

                setValue("hotel", "");
                setValue("contact", "");
                setValue("address", "");
                setValue("city", ""); 

                setShowHotelRegForm(false);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    } 

    return (
        <div className="flex justify-center items-center fixed z-60 top-0 left-0 right-0 bottom-0 bg-black/50">
            <div className="w-[80vw] h-auto lg:w-[60vw] flex items-center bg-white rounded-xl overflow-hidden relative shadow-[5px_5px_20px_rgba(255,255,255,0.3)]">
                <img className="absolute right-5 top-5 cursor-pointer" onClick={() => setShowHotelRegForm(false)} src={assets.closeIcon} alt="Close Icon" />
                <figure className="hidden md:block md:w-1/2 min-h-full">
                    <img className="w-full h-full object-cover" src={assets.regImage} alt="Registration Image" />
                </figure>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full md:w-1/2 p-10">
                    <Heading classes="text-center">Register Your Hotel</Heading>

                    <Input label="Hotel Name" labelClasses="block text-gray-500" inputClasses="outline-2 outline-gray-300 px-2 py-1 rounded my-2 w-full" placeholder="Type here" {...register("hotel", {required:true})} />

                    <Input label="Contact" type="tel" labelClasses="block text-gray-500" inputClasses="outline-2 outline-gray-300 px-2 py-1 rounded my-2 w-full" placeholder="Type here" {...register("contact", {required:true})} />

                    <Input label="Address" labelClasses="block text-gray-500" inputClasses="outline-2 outline-gray-300 px-2 py-1 rounded my-2 w-full" placeholder="Type here" {...register("address", {required:true})} />

                    <> 
                        <label className="block text-gray-500" htmlFor="city">City</label>
                        <select className="outline-2 outline-gray-300 px-2 py-1 rounded my-2 w-full" id="city" {...register("city", {required:true})}>
                            <option value="">Select City</option>
                            <option value="delhi">Delhi</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="chennai">Chennai</option>
                            <option value="banglore">Banglore</option>
                            <option value="kolkata">Kolkata</option>
                        </select>
                    </>

                    <Input type="submit" value="Register" inputClasses="block bg-blue-600/90 rounded text-white py-2 px-6 my-3 cursor-pointer" placeholder="Type here" />
                </form>
            </div>
        </div>
    );
}

export default HotelRegistrationForm;