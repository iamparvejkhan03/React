import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import { v2 as cloudinary } from 'cloudinary';

//API to create a room
const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId});

        if(!hotel) return res.json({success:false, message:"Hotel not found."});

        const uploadImages = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });

        const images = await Promise.all(uploadImages);

        const roomData = {
            hotel: hotel._id, roomType, pricePerNight: +pricePerNight, amenities: JSON.parse(amenities), images
        }

        await Room.create(roomData);

        res.json({success:true, message:"Room created."});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

//API to find all the rooms in a specific hotel 
const getHotelRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({owner: req.auth.userId});

        const allRooms = await Room.find({hotel:hotel._id.toString()}).populate("hotel");

        res.json({success:true, allRooms});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

//API to find all the rooms
const getRooms = async (req, res) => {
    try {
        const allRooms = await Room.find({isAvailable:true}).populate({
            path: "hotel",
            populate: {
                path: "owner",
                select: "image"
            }
        }).sort({createdAt: -1});

        res.json({success:true, allRooms});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

//API to toggle the room availability
const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body; 
        const { toggle } = req.body;

        await Room.findByIdAndUpdate(roomId, {isAvailable: toggle});

        res.json({success:true, message:"Room availability updated."});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export { createRoom, getHotelRooms, getRooms, toggleRoomAvailability }