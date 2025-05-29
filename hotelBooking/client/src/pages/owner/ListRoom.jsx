import { Container } from '../';
import  { Heading } from '../../components';
import { roomsDummyData } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

function ListRoom(){
    const { axios, getToken, currency } = useAppContext();
    const [roomData, setRoomData] = useState([]);
    const [isAvailable, setIsAvailable] = useState(true);

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms/hotel', {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success){
                setRoomData(data.allRooms);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log('Error fetching the rooms data.');
        }
    }

    const handleIsAvailable = async (e, roomId) => {
        setIsAvailable(prev => !prev);
        const toggle = e.target.checked;
        const { data } = await axios.post('/api/rooms/availability', {roomId, toggle}, {headers: {Authorization: `Bearer ${await getToken()}`}});

        if(data.success){
            toast.success(data.message);
            fetchRooms();
        }else{
            toast.error(data.message);
        }
    }

    useEffect(() => {
        fetchRooms();
    }, [])

    return (
        <section>
            <Container>
                <Heading classes='max-w-full' subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.'>Room Listings</Heading>

                <div className='my-8 w-full'>
                    <h5 className='text-xl my-3'>All Rooms</h5>
                    <div className='md:min-w-[70%] overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-2 border-gray-300 bg-blue-100'>
                                    <th className='p-3 border-b-2 font-[500] border-gray-300 text-left'>Name</th>
                                    <th className='p-3 border-b-2 font-[500] border-gray-300 text-left'>Facility</th>
                                    <th className='p-3 border-b-2 font-[500] border-gray-300 text-left'>Price/night</th>
                                    <th className='p-3 border-b-2 font-[500] border-gray-300 text-left'>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    roomData.map(room => (
                                        <tr key={room._id} className='border-2 border-gray-300'>
                                            <td className='p-3'>{room.roomType}</td>
                                            <td className='p-3'>
                                                {
                                                    room.amenities.map((amenity, i) => (
                                                        <span key={i}>
                                                            {amenity}{i !== room.amenities.length - 1 && ', '}
                                                        </span>
                                                    ))
                                                }
                                            </td>
                                            <td className='p-3'>{currency}{room.pricePerNight}</td>
                                            <td className='p-3'>
                                                <label htmlFor={room._id} className='relative'>
                                                    <input id={room._id} onChange={(e) => handleIsAvailable(e, room._id)} checked={room.isAvailable} type="checkbox" className='peer sr-only' />
                                                    <div className='w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300'></div>

                                                    <span className='bg-white h-5 w-5 absolute inline-block top-1 left-1 rounded-full z-50 peer-checked:translate-x-full transition-transform duration-400'></span>
                                                </label>
                                            </td>
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

export default ListRoom;