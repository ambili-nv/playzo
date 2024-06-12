import mongoose from "mongoose";

import configKeys from "../../../config";

const connectDB = async ()=>{
    try {
        await mongoose.connect(configKeys.MONGO_URL);
        console.log("Database connected succesfully");
    } catch (error) {
        console.log("Error in connecting database", error);
    }
}

export default connectDB