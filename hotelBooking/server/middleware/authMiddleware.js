import User from "../models/user.js";

const protect = async (req, res, next) => {
    try {
        const {userId} = req.auth;
        if(!userId) {
            res.json({success:false, message:"User not authenticated."})
        }else{
            const user = await User.findById(userId);

            req.user = user;

            next();
        }
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export default protect;