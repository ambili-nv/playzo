import { googleSignInUserEntityType, userEntityType } from "../../../../enitity/userEntity";
import { UserInterface } from "../../../../types/userInterface";
import User from "../models/user";
import OTPModel from "../models/OTPmodel";

export const userRepositoryMongodb =()=>{

    const getUserbyEmail = async (email:any)=>{
        const user: UserInterface | null = await User.findOne({email});
        return user
        
    }

const addUser = async(user:userEntityType)=>{

    const newUser:any = new User({
        name:user.name(),
        email:user.getEmail(),
        password:user.getPassword(),
        phoneNumber:user.getphoneNumber(),
        
    })
    await newUser.save()
    return newUser
}

const AddOTP = async (OTP: string, userId: string)=>{
    await OTPModel.create({OTP, userId});
};



const findOtpUser = async (userId: string) => {

    try {
        const user = await OTPModel.findOne({ userId });

        return user;
    } catch (error) {
        console.error("Error finding OTP user:", error);
        throw new Error("Database query failed");
    }
};

const updateUserInfo = async (id: string, updateData:Record<string,any>)=>await User.findByIdAndUpdate(id,updateData,{new:true});
const deleteOtpUser = async (userId: string) =>await OTPModel.deleteOne({ userId });
const getUserbyId = async (id: string) => await User.findById(id);

const registerGoogleSignInUser = async(user:googleSignInUserEntityType)=>{
    await User.create({
        name:user.name(),
        email:user.email(),
        isVerified:user.email_verified(),

    })
}



return {
    addUser,
    getUserbyEmail,
    AddOTP,
    findOtpUser,
    updateUserInfo,
    deleteOtpUser,
    getUserbyId,
    registerGoogleSignInUser
}

}

export type userRepositoryMongodbType = typeof userRepositoryMongodb;