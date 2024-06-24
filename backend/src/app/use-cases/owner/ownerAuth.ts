import { CreateOwnerInterface,OwnerInterface } from "../../../types/ownerInterface";
import createOwnerEntity,{googleSignInOwnerEntity, googleSignInOwnerEntityType, ownerEntityType} from "../../../enitity/ownerEntity"
import { ownerDbInterface } from "../../Interfaces/ownerDbRepository";
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import { AuthServiceInterfaceType } from "../../service-interface/authServiceInrerface";
import sentMail from "../../../utils/sendMail";
import { otpEmail } from "../../../utils/userEmail";
import { log } from "console";
import owner from "../../../framework/database/mongodb/models/owner";
import { userDbRepository } from "../../Interfaces/userDbRepository";




// owner Register

export const ownerRegister:any = async(
    owner:CreateOwnerInterface,
    ownerRepository:ReturnType<ownerDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
) =>{
    // console.log("recieved data ");

    const {name, email , password, phoneNumber}  = owner
    //@ts-ignore
    const isEmailExist = await ownerRepository.getOwnerbyEmail(email)
    if (isEmailExist){
        throw new CustomError("Email already Exist",HttpStatus.BAD_REQUEST)
    }

    const hashedPassword: string = await authService.encryptPassword(password);


    const ownerEntity : ownerEntityType = createOwnerEntity(
        name,
        email,
        phoneNumber,
        hashedPassword
    )
    
    //@ts-ignore
    const createdOwner : OwnerInterface = await ownerRepository.addOwner(ownerEntity)
    const OTP = authService.generateOTP();
    console.log(OTP,"owner otp");
    
    const emailSubject = "Account verification";
    sentMail(createdOwner.email,emailSubject,otpEmail(OTP,createdOwner.name))
    await ownerRepository.addOTP(OTP,createdOwner.id)

    return {createdOwner}
    
}



export const verifyOwner = async (
    ownerOTP:string,
    OwnerId:string,
    ownerRepository:ReturnType<ownerDbInterface>
    )=>{
        console.log(OwnerId,"ownerID get");
        
        if(!ownerOTP)
            throw new CustomError("Please provide an OTP",HttpStatus.BAD_REQUEST);
            const otpOwner = await ownerRepository.findOtpOwner(OwnerId)
            console.log(otpOwner,"otpUser found");

        if(!otpOwner){
            throw new CustomError(
                "Invalid OTP",
                HttpStatus.BAD_REQUEST
             )
        }

        if(otpOwner.OTP === ownerOTP){
            await ownerRepository.updateOwnerProfile(OwnerId,{
                isVerified:true
            });
            return true
        } else {
            throw new CustomError(
                "Invalid OTP..",
                HttpStatus.BAD_REQUEST
            )
        }
}

export const deleteOTP = async(
    OwnerId :string,
    ownerDbRepository:ReturnType<ownerDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
)=>{
    const newOtp: string = authService.generateOTP();
    console.log(newOtp,"new otp -owner");
    
    const deleted = await ownerDbRepository.deleteOtpOwner(OwnerId);
    if(deleted){
        await ownerDbRepository.addOTP(newOtp,OwnerId)
    }
    const owner = await ownerDbRepository.getOwnerbyId(OwnerId)
    if(owner){
        const emailSubject = "Account verification , New OTP";
        sentMail(owner.email,emailSubject,otpEmail(newOtp,owner.name))
    }
}


export const login = async(
    owner:{email:string,password:string},
    ownerDbRepository:ReturnType<ownerDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
)=>{
    const {email,password} = owner
    const isEmailExist = await ownerDbRepository.getOwnerbyEmail(email)
    console.log(isEmailExist,"Email checked-owner login");

    if(!isEmailExist){
        throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    if(!isEmailExist.isVerified){
        throw new CustomError("Your account is not is verified",HttpStatus.UNAUTHORIZED)
    }

    if(isEmailExist.isBlocked){
        throw new CustomError("your account has been blocked",HttpStatus.UNAUTHORIZED);
    }

    if (!isEmailExist.password) {
        throw new CustomError("Invalid credentials2",HttpStatus.UNAUTHORIZED)
    }
    const isPasswordMatched = await authService.comparePassword(password,isEmailExist.password)
    if(!isPasswordMatched){
        throw new CustomError("Invalid credentials3",HttpStatus.UNAUTHORIZED)
    }

    const accessToken = authService.createTokens(
        isEmailExist.id,
        isEmailExist.name,
        isEmailExist.role
    )
    return {accessToken,isEmailExist};
}


export const authGoogleSigninOwner = async(
    ownerData:{
        name:string;
        email:string;
        email_verified:boolean;
    },
    ownerDbRepository:ReturnType<ownerDbInterface>
)=>{
    const {name,email,email_verified} = ownerData
    const isEmailExist = await ownerDbRepository.getOwnerbyEmail(email)
    console.log(isEmailExist,"Owner email checked");
    if(isEmailExist){
        return{isEmailExist}
    } else {
        const googleSigninOwner : googleSignInOwnerEntityType = googleSignInOwnerEntity(
            name,email,email_verified
        )

        const createdOwner = await ownerDbRepository.registerGoogleSignInOwner(
            googleSigninOwner
        )

        return {createdOwner}
    }
    
}