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
    console.log(newUser,"refister details");
    
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

const updateVerificationCode = async (email:string,code:string)=>await User.findOneAndUpdate({email},{verificationCode:code})

const findVerificationCodeAndUpdate = async (
    code: string,
    newPassword: string
  ) =>
    await User.findOneAndUpdate(
      { verificationCode: code },
      { password: newPassword, verificationCode: null },
      { upsert: true }
    );


    // const getAllusers = async ()=>{
    //     const allUSers = await User.find({isVerified:true})
    // console.log(allUSers,"users - repo");
    // return allUSers
    // }


    const getAllusers = async () => {
        try {
            const allUsers = await User.find({ isVerified: true });
            console.log(allUsers, "users - repo");
            return allUsers;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    };


    const updateUserBlock = async (id: string, status: boolean) =>{
        await User.findByIdAndUpdate(id, { isBlocked: status });
    }
    

return {
    addUser,
    getUserbyEmail,
    AddOTP,
    findOtpUser,
    updateUserInfo,
    deleteOtpUser,
    getUserbyId,
    registerGoogleSignInUser,
    updateVerificationCode,
    findVerificationCodeAndUpdate,
    getAllusers,
    updateUserBlock
}

}

export type userRepositoryMongodbType = typeof userRepositoryMongodb;