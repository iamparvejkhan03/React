import {Container, Heading, TestimonialCard} from './';
import { testimonials } from "../assets/assets";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Testimonials(){
    return (
        <section className='bg-[#eeeeee]'>
            <Container>
                <Heading subTitle='Discover why discerning travelers choose QuickStay for their luxury accomodations around the world.'>What Our Guests Say</Heading>
                <div className='flex flex-wrap'>
                    <Swiper
                        spaceBetween={40}
                        modules={[Pagination, A11y, Autoplay]}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {slidesPerView:1},
                            768: {slidesPerView:2},
                            1099:{slidesPerView:3},
                        }}
                        autoplay={{delay:5000}}
                        scrollbar={{draggable:true}}
                        loop
                    >
                    {
                        testimonials.map(testimonial => (
                            <SwiperSlide><TestimonialCard testimonial={testimonial} /></SwiperSlide>
                        ))
                    }
                    </Swiper>
                </div>
            </Container>
        </section>
    );
}

export default Testimonials;