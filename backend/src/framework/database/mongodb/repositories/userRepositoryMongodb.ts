
import { userEntityType } from "../../../../enitity/userEntity";
import { UserInterface } from "../../../../types/userInterface";
import User from "../models/user";
import OTPModel from "../models/OTPmodel";

export const userRepositoryMongodb =()=>{

    const getUserbyEmail = async (email:any)=>{
        const user: UserInterface | null = await User.findOne({email});
        // console.log(isEmailExist,"///////////////");
        return user
        
    }

const addUser = async(user:userEntityType)=>{

    // console.log(user,"oooooooooooooo")
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

// const findOtpUser = async(userId:string)=>{
//     console.log(findOtpUser,"otp ethyaaaa");
    
//     const user = await OTPModel.findOne({userId})
//     console.log(user,"user inddddddddddd");
    
// }


const findOtpUser = async (userId: string) => {
    console.log(userId, "UserId passed to findOtpUser"); // Log userId to ensure it's correct

    try {
        const user = await OTPModel.findOne({ userId });
        console.log(user, "User found in findOtpUser"); // Log the result of the query

        return user;
    } catch (error) {
        console.error("Error finding OTP user:", error);
        throw new Error("Database query failed");
    }
};

const updateUserInfo = async (id: string, updateData:Record<string,any>)=>await User.findByIdAndUpdate(id,updateData,{new:true});
const deleteOtpUser = async (userId: string) =>await OTPModel.deleteOne({ userId });
const getUserbyId = async (id: string) => await User.findById(id);




return {
    addUser,
    getUserbyEmail,
    AddOTP,
    findOtpUser,
    updateUserInfo,
    deleteOtpUser,
    getUserbyId
}

}

export type userRepositoryMongodbType = typeof userRepositoryMongodb;