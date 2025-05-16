import {Container, Heading, RoomCard} from "../components";
import { roomsDummyData } from "../assets/assets";
import { useState } from "react";

function CheckBox({label}){
    return (
        <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" />
            <span>{label}</span>
        </label>
    );
}

function RadioButton({label, name}){
    return (
        <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" name={name} />
            <span>{label}</span>
        </label>
    );
}

const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'];

const priceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];

const sortOptions = ['Price Low to High', 'Price High to Low', 'Newest First'];

function AllRooms(){
    const [isFiltersHidden, setIsFiltersHidden] = useState(true);

    return (
        <main className="min-h-[70vh] pt-24">
            <Container classes="flex flex-col items-start lg:flex-row lg:justify-between">        
                <section className="lg:max-w-8/12 order-2 lg:order-1">
                    <Heading subTitle="Take advantage of our limited-time offer and special packages to enhance your stay and create unforgettable memories.">Hotel Rooms</Heading>
                    {
                        roomsDummyData.map(room => (
                            <RoomCard key={room._id} room={room} />
                        ))
                    }
                </section>
                <section className="w-full lg:max-w-3/12 border border-gray-300 rounded my-6 order-1 lg:order-2">
                    <div className="flex justify-between items-center border-b border-gray-300 px-6 py-3 uppercase">
                        <p className="text-lg">Filters</p>
                        <p className={`text-sm text-gray-600 cursor-pointer ${isFiltersHidden ? 'hidden' : 'block'} lg:block`}>Clear</p>
                        <p className="text-sm text-gray-600 cursor-pointer lg:hidden" onClick={() => setIsFiltersHidden(!isFiltersHidden)}>Show</p>
                    </div>
                    <div className={`${isFiltersHidden ? "h-0 overflow-hidden lg:h-full lg:px-6 lg:py-3 " : "h-full px-6 py-3"}`}>
                        <p className="text-lg my-3">Popular Filters</p>
                        {
                            roomTypes.map((room, index) => (
                                <CheckBox label={room} key={index} />
                            ))
                        }
                        <br />
                        <p className="text-lg my-3">Price Range</p>
                        {
                            priceRanges.map((price, index) => (
                                <CheckBox label={`$${price}`} key={index} />
                            ))
                        }
                        <br />
                        <p className="text-lg my-3">Sort By</p>
                        {
                            sortOptions.map((option, index) => (
                                <RadioButton label={option} name="sortOptions" key={index} />
                            ))
                        }
                    </div>
                </section>
            </Container>
        </main>
    );
}

export default AllRooms;