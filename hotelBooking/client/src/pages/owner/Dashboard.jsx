import { Heading } from '../../components';
import { Container } from '../';
import { assets, dashboardDummyData } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';

function Dashboard(){
    const { axios, getToken, currency } = useAppContext();
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [bookings, setBookings] = useState([]);

    const getHotelBookings = async () => {
        try {
            const { data } = await axios.get('/api/bookings/hotel-bookings', {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success){
                setTotalBookings(data.dashboardData.totalBookings);
                setTotalRevenue(data.dashboardData.totalRevenue);
                setBookings(data.dashboardData.bookings);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getHotelBookings();
    }, [])

    return (
        <section>
            <Container>
                <Heading classes='max-w-full' subTitle='Monitor your room listings, track bookings, and analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operations.'>Dashboard</Heading>

                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='flex gap-3 bg-blue-100 p-3 rounded'>
                        <img className='h-9 w-9' src={assets.totalBookingIcon} alt="Total Bookings" />
                        <div>
                            <p className='text-blue-500 font-semibold'>Total Bookings</p>
                            <p>{totalBookings}</p>
                        </div>
                    </div>
                    <div className='flex gap-3 bg-blue-100 p-3 rounded'>
                        <img className='h-9 w-9' src={assets.totalRevenueIcon} alt="Total Bookings" />
                        <div>
                            <p className='text-blue-500 font-semibold'>Total Revenue</p>
                            <p>{currency}{totalRevenue}</p>
                        </div>
                    </div>
                </div>

                <div className='my-8 w-full'>
                    <h5 className='text-xl my-3'>Recent Bookings</h5>
                    <div className='md:min-w-[70%] overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-2 border-gray-300 bg-blue-100'>
                                    <th className='p-3 border-b-2 font-[500] border-gray-300 text-left'>Username</th>
                                    <th className='p-3 border-b-2 font-[500] border-gray-300 text-left'>Room Name</th>
                                    <th className='p-3 border-b-2 font-[500] border-gray-300 text-left'>Total Amount</th>
                                    <th className='p-3 border-b-2 font-[500] border-gray-300 text-left'>Payment Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    bookings.map(booking => (
                                        <tr key={booking._id} className='border-2 border-gray-300'>
                                            <td className='p-3'>{booking.user.username}</td>
                                            <td className='p-3'>{booking.room.roomType}</td>
                                            <td className='p-3'>{currency}{booking.totalPrice}</td>
                                            <td className='p-3'>{booking.isPaid ? <span className='text-green-600 bg-green-200 py-1 px-3 rounded-full text-sm'>Completed</span> : <span className='text-orange-500 bg-orange-200/80 py-1 px-3 rounded-full text-sm'>Pending</span>}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default Dashboard;