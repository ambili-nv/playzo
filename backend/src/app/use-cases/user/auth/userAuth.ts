import { CreateUserInterface,UserInterface } from "../../../../types/userInterface";
import createUserEntity,{userEntityType} from '../../../../enitity/userEntity'
import { userDbInterface } from "../../../Interfaces/userDbRepository";
import CustomError from "../../../../utils/customError";
import { HttpStatus } from "../../../../types/httpStatus";
import {AuthServiceInterfaceType } from "../../../service-interface/authServiceInrerface";
import sentMail from "../../../../utils/sendMail";
import { otpEmail } from "../../../../utils/userEmail";


export const userRegister = async(
    user:CreateUserInterface,
    userRepository:ReturnType<userDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>

)=>{
    console.log("Received user data in userRegister:", user);

    const{ name,email,password,phoneNumber} = user



    const userEntity: userEntityType = createUserEntity(
        name,
        email,
        phoneNumber,
        password,
    );
        const isEmailExist = await userRepository.getUserbyEmail(email)
        if (isEmailExist){
            throw new CustomError("Email already Exist",HttpStatus.BAD_REQUEST)
        }

        //create a new User 
        const createdUser: UserInterface = await userRepository.addUser(userEntity);

        const OTP = authService.generateOTP();  //generate otp
        const emailSubject = "Account verification";
        sentMail(createdUser.email,emailSubject,otpEmail(OTP, createdUser.name)); //send otp
        await userRepository.addOTP(OTP, createdUser.id);




        return {createdUser };
}


        //VErify-otp
export const verifyUser = async (
    userOTP:string,
    userId:string,
    userRepository:ReturnType<userDbInterface>
    )=>{
        if(!userOTP)
            throw new CustomError("Please provide an OTP",HttpStatus.BAD_REQUEST);
            const otpUser = await userRepository.findOtpUser(userId)
            console.log(otpUser,"kityyeeeee");

        if(!otpUser){
            throw new CustomError(
                "Invalid OTP",
                HttpStatus.BAD_REQUEST
             )
        }

        if(otpUser.OTP === userOTP){
            await userRepository.updateProfile(userId,{
                isVerified:true
            });
            return true
        } else {
            throw new CustomError(
                "Invalid OTP",
                HttpStatus.BAD_REQUEST
            )
        }
}


export const deleteOtp = async (
    userId: string,
    userDbRepository: ReturnType<userDbInterface>,
    authService: ReturnType<AuthServiceInterfaceType>
  ) => {
    const newOtp: string = authService.generateOTP();
    const deleted = await userDbRepository.deleteOtpUser(userId); // delete the existing otp user from db
    if (deleted) {
      await userDbRepository.addOTP(newOtp, userId); // create new otp user
    }
    const user = await userDbRepository.getUserbyId(userId);
    if (user) {
      const emailSubject = "Account verification , New OTP";
      sentMail(user.email, emailSubject, otpEmail(newOtp, user.name)); // Sending otp to the user email
    }
   };