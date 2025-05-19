import { assets } from "../assets/assets";

function TestimonialCard({testimonial}){
    return (
        <div className="text-gray-500 bg-white p-5 sm:p-7 md:p-5 rounded-lg shadow-lg">
            <div className="flex gap-5 mb-3">
                <img src={testimonial.image} alt="reviewer-image" className="h-12 w-12 object-cover rounded-full" />
                <div>
                    <h5 className="text-black">{testimonial.name}</h5>
                    <p className="text-sm">{testimonial.address}</p>
                </div>
            </div>
            <p className="flex">
                {
                    Array(5).fill('').map((_, index) => (
                        testimonial.rating > index ? <img key={index} className="h-4 w-4" src={assets.starIconFilled} alt="star-filled" /> : <img key={index} className="h-4 w-4" src={assets.starIconOutlined} alt="star-outlined" />
                    ))
                }
            </p>
            <p>{testimonial.review}</p>
        </div>
    );
}

export default TestimonialCard;