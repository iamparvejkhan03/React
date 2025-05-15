import { assets, exclusiveOffers } from "../assets/assets";
import {Container, Heading, Button, OfferCard } from "./";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function ExclusiveOffers(){
    return (
        <section>
            <Container>
                <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
                    <Heading subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgetable memories.">Exclusive Offers</Heading>
                    <Button classes="flex gap-3 items-center mb-5">View All Offers <img src={assets.arrowIcon} alt="" /></Button>
                </div>

                <div className="w-full flex flex-wrap">
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
                        exclusiveOffers.map(offer => (
                            <SwiperSlide><OfferCard key={offer._id} offer={offer} /></SwiperSlide>
                        ))
                    }
                    </Swiper>
                </div>
            </Container>
        </section>
    );
}

export default ExclusiveOffers;