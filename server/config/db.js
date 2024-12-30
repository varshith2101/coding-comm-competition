import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected To MongoDB");
    }catch(err){
        console.log("Connection Failed: " , err.message);
        process.exit(1);
    }
}