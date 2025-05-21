import Hotel from "../models/hotel.js";
import User from "../models/user.js";

//API to register a hotel
const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id;

        //Check if hotel is already registered

        const hotel = await Hotel.findOne({owner});

        if(hotel) return res.json({success:false, message:"Hotel is already registered."});

        const hotelData = {
            name, address, contact, owner, city
        }

        await Hotel.create(hotelData);

        await User.findByIdAndUpdate(owner, {role: "hotelOwner"});

        res.json({success:true, message:"Hotel Saved."});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export { registerHotel }