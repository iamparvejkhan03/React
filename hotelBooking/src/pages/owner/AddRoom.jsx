import { Container } from "../";
import { assets } from "../../assets/assets";
import { Heading } from "../../components";
import { useState } from "react";

const amenities = ['Free Wi-Fi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'];

function CheckBox({label}){
    return (
        <label>
            <input type="checkbox" />{label}
        </label>
    );
}

function AddRoom(){
    const [images, setImages] = useState({
        img1:null,
        img2:null,
        img3:null,
        img4:null,
    });

    return (
        <section>
            <Container>
                <Heading subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.">Add Room</Heading>

                <form>
                    <div className="my-10">
                        <h5 className="text-lg my-2">Images</h5>
                        <div className="flex flex-wrap gap-3">
                            {
                                Object.keys(images).map((image) => (
                                    <label key={image} htmlFor={`${image}`}>
                                        <img src={images[image] ? URL.createObjectURL(images[image]) : assets.uploadArea} alt={image} className="cursor-pointer h-21 w-36 rounded object-cover outline outline-gray-300" />
                                        
                                        <input onChange={(e) => setImages(prev => ({...prev, [image]: e.target.files[0]}))} id={`${image}`} type="file" accept="image/*" className="hidden" />
                                    </label>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <div>
                            <label htmlFor="room-type">Room Type</label>
                            <select id="room-type" className="outline-2 outline-gray-300 w-full sm:w-[14rem] block my-1 p-2 rounded">
                                <option value="">Select Room Type</option>
                                <option value="single">Single Bed</option>
                                <option value="double">Double Bed</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price">Price/night</label>
                            <input id="price" type="number" className="outline-2 outline-gray-300 block my-1 p-2 rounded w-full sm:w-[6rem]" placeholder={0} />
                        </div>
                    </div>

                    <div className="my-5 flex flex-col">
                        <h5 className="text-lg">Amenities</h5>
                        {
                            amenities.map(amenity => (
                                <CheckBox key={amenity} label={amenity} />
                            ))
                        }
                    </div>

                    <button type="submit" className="bg-blue-600 py-2 px-8 rounded text-white">Add Room</button>
                </form>
            </Container>
        </section>
    );
}

export default AddRoom;