import { Container } from '../';
import  { Heading } from '../../components';
import { assets, roomsDummyData } from '../../assets/assets';

function ListRoom(){
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
                                    roomsDummyData.map(room => (
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
                                            <td className='p-3'>${room.pricePerNight}</td>
                                            <td className='p-3'>
                                                <label htmlFor={room._id} className='relative'>
                                                    <input id={room._id} type="checkbox" className='peer sr-only' />
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