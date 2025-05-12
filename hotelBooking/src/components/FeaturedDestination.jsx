import {HotelCard, Container, Heading} from "./";
import { roomsDummyData } from "../assets/assets";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function FeaturedDestination(){
    return (
        <section>
            <Container>
                <Heading classes="text-xl inline-block relative md:text-2xl my-3 ">Featuted Destination</Heading>
                <div className="w-full flexflex-row gap-10">
                    <Swiper
                        spaceBetween={50}
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {slidesPerView:1},
                            799: {slidesPerView:2},
                            1099:{slidesPerView:3},
                            1399: {slidesPerView:4}
                        }}
                        autoplay={{delay:5000}}
                        scrollbar={{draggable:true}}
                        loop
                    >
                    {
                        roomsDummyData.map((room, index) => (
                            <SwiperSlide><HotelCard index={index} room={room} key={room._id} /></SwiperSlide>
                        ))
                    }
                    </Swiper>
                </div>
            </Container>
        </section>
    );
}

export default FeaturedDestination;