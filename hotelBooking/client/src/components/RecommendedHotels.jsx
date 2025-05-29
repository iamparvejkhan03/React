import {HotelCard, Container, Heading, Button} from "./";
import { roomsDummyData } from "../assets/assets";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

function RecommendedHotels(){
    const navigate = useNavigate();
    const { rooms, seachedCities } = useAppContext();
    const [recommended, setRecommended] = useState([]);
    
    const filterRooms = () => {
        const filteredRooms = rooms.filter((room) => {
            return seachedCities.includes(room.hotel.city);
        })

        return (filteredRooms);
    }

    useEffect(() => {
        filterRooms();
    }, [rooms])

    return filterRooms().length > 0 && (
        <section className="bg-[#eeeeee]">
            <Container classes="flex flex-col justify-center">
                <Heading classes="" subTitle="Discover our handpicked selection of exceptional properties in your recent searched cities, offering unparalleled luxury and unforgotable experience.">Recommended Hotels</Heading>
                <div className="w-full flex-row gap-10">
                    <Swiper
                        spaceBetween={50}
                        modules={[Pagination, A11y, Autoplay]}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {slidesPerView:1},
                            768: {slidesPerView:2},
                            1099:{slidesPerView:3},
                            1399: {slidesPerView:4}
                        }}
                        autoplay={{delay:5000}}
                        scrollbar={{draggable:true}}
                        loop
                    >
                    {
                        filterRooms().map((room, index) => (
                            <SwiperSlide><HotelCard index={index} room={room} key={room._id} /></SwiperSlide>
                        ))
                    }
                    </Swiper>
                </div>

                <Button onClick={() => navigate('/rooms')} classes=" my-5 self-center">View All Recommendation</Button>
            </Container>
        </section>
    );
}

export default RecommendedHotels;