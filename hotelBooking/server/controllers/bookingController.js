import Room from "../models/room.js";
import Booking from "../models/booking.js";
import Hotel from "../models/hotel.js";
import transporter from "../config/nodemailer.js";

//API to create a booking
//Endpoint: post, /api/bookings/create
const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;

        const user = req.user._id;

        const roomData = await Room.findById(room).populate("hotel");

        const roomAvailability = await isRoomAvailable(req.body);

        if(!roomAvailability) return res.json({success:false, message:"Room not available."});

        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();

        totalPrice *= Math.ceil(timeDiff / (1000 * 3600 * 24));

        const bookingData = {
            user, room, hotel: roomData.hotel._id, checkInDate, checkOutDate, totalPrice: +totalPrice, guests: +guests
        }

        const booking = await Booking.create(bookingData);

        if(booking){
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: req.user.email,
                subject: "Hotel Booking Details",
                html: `
                    <h2>Your Booking Details</h2>
                    <p>Dear ${req.user.username}</p>
                    <p>Thank you for your booking! Here are your details:</p>
                    <ul>
                        <li><strong>Booking ID</strong>: ${booking._id}</li>
                        <li><strong>Hotel Name</strong>: ${roomData.hotel.name}</li>
                        <li><strong>Location</strong>: ${roomData.hotel.address}</li>
                        <li><strong>Date</strong>: ${checkInDate} - ${checkOutDate}</li>
                        <li><strong>Amount</strong>:$${totalPrice}</li>
                    </ul>
                    <p>We look forward to welcoming you!</p>
                    <p>If you need to make any changes, feel free to contact us.</p>
                `
            }
            await transporter.sendMail(mailOptions);
        }

        res.json({success:true, message:"Booking created."});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

//Function to check availability of the room
const isRoomAvailable = async ({room, checkInDate, checkOutDate}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: {$lte: checkInDate},
            checkOutDate: {$gte: checkOutDate},
        });

        return bookings.length === 0;
    } catch (error) {
        console.log(error.message);
    }
}

//API to check the room availability and send data
//Endpoint: get, /api/bookings/check-room-availability
const checkRoomAvailability = async (req, res) => {
    try {
        const roomAvailable = await isRoomAvailable(req.body);

        roomAvailable ? res.json({success:true, message:"Room is available."}) : res.json({success:false, message:"Room is not available."});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

//API to check get the all bookings of a user
//Endpoint: get, /api/bookings/user-bookings
const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const allBookings = await Booking.find({user: userId}).populate("room hotel").sort({createdAt: -1});

        res.json({success:true, message: allBookings});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

//API to check get the all bookings of a hotel
//Endpoint: get, /api/bookings/hotel-bookings
const getHotelBookings = async (req, res) => {
    try {
        const user = req.auth.userId;
        const hotel = await Hotel.findOne({owner:user});
        if(!hotel) return res.json({success:false, message:"No hotel found"});

        const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({createdAt: -1});

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((accumulator, booking) => (accumulator + Number(booking.totalPrice)), 0);


        res.json({success:true, dashboardData: {totalBookings, totalRevenue, bookings}});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export { createBooking, checkRoomAvailability, getUserBookings, getHotelBookings }