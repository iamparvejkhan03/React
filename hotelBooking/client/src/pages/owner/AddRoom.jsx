import { useForm } from "react-hook-form";
import { Container } from "../";
import { assets } from "../../assets/assets";
import { Heading } from "../../components";
import { forwardRef } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useState } from "react";

const amenities = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'];

const CheckBox = forwardRef(function CheckBox({label, value, checked, ...props}, ref){
    return (
        <label>
            <input type="checkbox" value={value} checked={checked} ref={ref} {...props} />{label}
        </label>
    );
})

function AddRoom(){
    const {axios, getToken}  = useAppContext();
    const [loading, setLoading] = useState(false);
    
    const { register, handleSubmit, setValue, getValues, watch, formState: {errors} } = useForm({
        defaultValues:{
            images: {
                img1:null,
                img2:null,
                img3:null,
                img4:null,
            },
            roomType: null,
            price: null,
            amenities: []
        }
    });

    const handleFormSubmit = async (form) => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append('pricePerNight', form.price);
            formData.append('roomType', form.roomType);
            formData.append('amenities', JSON.stringify(form.amenities));

            Object.keys(form.images).forEach((key, index) => {
                formData.append('images', form.images[key]);
            })

            const { data } = await axios.post('/api/rooms/create', formData, {headers: {Authorization: `Bearer ${await getToken()}`, 'Content-Type': "multipart/form-data"}});

            if(data.success){
                toast.success(data.message);
            }else{
                console.log(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    const images = watch('images');

    return (
        <section>
            <Container>
                <Heading subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.">Add Room</Heading>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="my-10">
                        <h5 className="text-lg my-2">Images</h5>
                        <div className="flex flex-wrap gap-3">
                            {
                                Object.keys(getValues('images')).map((image) => (
                                    <label key={image} htmlFor={`${image}`}>
                                        <img src={ images[image] ? URL.createObjectURL(images[image]) : assets.uploadArea} alt={image} className="cursor-pointer h-21 w-36 rounded object-cover outline outline-gray-300" />
                                        
                                        <input id={`${image}`} type="file" accept="image/*" className="hidden" onChange={(e) => setValue(`images.${image}`, e.target.files[0])} />
                                    </label>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <div>
                            <label htmlFor="roomType">Room Type</label>
                            <select id="roomType" className="outline-2 outline-gray-300 w-full sm:w-[14rem] block my-1 p-2 rounded" {...register('roomType', {required:false})}>
                                <option value="">Select Room Type</option>
                                <option value="Single Bed">Single Bed</option>
                                <option value="Double Bed">Double Bed</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price">Price/night</label>
                            <input id="price" type="number" className="outline-2 outline-gray-300 block my-1 p-2 rounded w-full sm:w-[6rem]" placeholder={0} {...register('price', {required:false})} />
                        </div>
                    </div>

                    <div className="my-5 flex flex-col">
                        <h5 className="text-lg">Amenities</h5>
                        {
                            amenities.map(amenity => (
                                <CheckBox key={amenity} value={amenity} label={amenity} {...register('amenities', {required:false})} />
                            ))
                        }
                    </div>

                    <button type="submit" className="cursor-pointer bg-blue-600 py-2 px-8 rounded text-white">{loading ? 'Adding...' : 'Add Room'}</button>
                </form>
            </Container>
        </section>
    );
}

export default AddRoom;