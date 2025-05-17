import { Button, Container, Heading } from "../components";
import { assets, userBookingsDummyData } from "../assets/assets";

function MyBookings(){
    return (
        <main className="min-h-[70vh] pt-24">
            <Container>
                <Heading subTitle="Easily manage your past, current, and future hotel reservations in one place. Plan your trips seamlessly with just a few clicks.">My Bookings</Heading>

                <section>
                    <div className="hidden lg:grid lg:grid-cols-[3fr_2fr_1fr] border-b-2 border-gray-300/50 py-3">
                        <div className="">Hotels</div>
                        <div className="">Date & Timings</div>
                        <div className="">Payments</div>
                    </div>
                    {
                        userBookingsDummyData.map(booking => (
                            <div key={booking._id} className="grid grid-cols-[1fr] md:grid-cols-[3fr_2fr_1fr] md:items-center border-b-2 border-gray-300/50">
                                <div className="flex flex-col sm:flex-row gap-3 md:gap-5 md:items-center py-4">
                                    <img className="sm:h-28 rounded object-cover" src={booking.room.images[0]} alt="room-image" />
                                    <div>
                                        <h5 className="text-lg sm:text-xl">{booking.hotel.name} <span className="text-sm">[{booking.room.roomType}]</span></h5>
                                        <p className="flex text-sm text-gray-500 gap-1 items-center"><img src={assets.locationIcon} alt="hotel-location" /> {booking.hotel.address}</p>
                                        <p className="flex text-sm text-gray-500 gap-1 items-center"><img src={assets.locationIcon} alt="" /> Guests: {booking.guests}</p>
                                        <p>Total: ${booking.totalPrice}</p>
                                    </div>
                                </div>

                                <div className="flex gap-5 sm:gap-10 md:gap-5 lg:gap-20">
                                    <div className="text-sm">
                                        <p>Check-In:</p>
                                        <p className="text-gray-500">{new Date(booking.checkInDate).toDateString()}</p>
                                    </div>
                                    <div className="text-sm">
                                        <p>Check-Out:</p>
                                        <p className="text-gray-500">{new Date(booking.checkOutDate).toDateString()}</p>
                                    </div>
                                </div>

                                <div className="my-3 flex flex-row md:flex-col gap-3 items-center">
                                    <p className={`flex gap-2 items-center ${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}><span className={`inline-block h-2 w-2 ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span>{booking.isPaid ? "Paid" : "Unpaid"}</p>
                                    {!booking.isPaid && <Button classes="rounded-full text-sm">Pay Now</Button>}
                                </div>
                            </div>
                        ))
                    }
                </section>
            </Container>
        </main>
    );
}

export default MyBookings;