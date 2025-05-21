import Room from "../models/room.js";

const createBooking = async (req, res) => {
    try {
        const available = checkRoomAvailability(req.body.roomId);
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

//Function to check availability of the room
const checkRoomAvailability = async (roomId) => {
    const available = await Room.findById(roomId);
    

    if(available){
        return true;
    }else{
        res.json({success:false, message:"Room not available."});
    }
}

export { createBooking }