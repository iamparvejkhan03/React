import mongoose from "mongoose";

const dbConnect = async() => {
    try{
        mongoose.connection.on('connected', () => console.log('Database connected successfully.'));
        
        await mongoose.connect(process.env.MONGOOSE_URI);
    }catch(error){
        throw new Error(error.message);
    }
}

export default dbConnect;