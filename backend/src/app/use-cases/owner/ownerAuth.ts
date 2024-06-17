import { CreateOwnerInterface,OwnerInterface } from "../../../types/ownerInterface";
import createOwnerEntity,{ownerEntityType} from "../../../enitity/ownerEntity"
import { ownerDbInterface } from "../../Interfaces/ownerDbRepository";
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import { AuthServiceInterfaceType } from "../../service-interface/authServiceInrerface";
import sentMail from "../../../utils/sendMail";
import { otpEmail } from "../../../utils/userEmail";

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

    const ownerEntity : ownerEntityType = createOwnerEntity(
        name,
        email,
        phoneNumber,
        password
    )
    
    //@ts-ignore
    const createdOwner : OwnerInterface = await ownerRepository.addOwner(ownerEntity)
    const OTP = authService.generateOTP();
    const emailSubject = "Account verification";
    sentMail(createdOwner.email,emailSubject,otpEmail(OTP,createdOwner.name))
    await ownerRepository.addOTP(OTP,createdOwner.id)

    return {createdOwner}
    
}



export const verifyOwner = async (
    ownerOTP:string,
    ownerId:string,
    ownerRepository:ReturnType<ownerDbInterface>
    )=>{
        console.log(ownerId,"ownerID get");
        
        if(!ownerOTP)
            throw new CustomError("Please provide an OTP",HttpStatus.BAD_REQUEST);
            const otpOwner = await ownerRepository.findOtpOwner(ownerId)
            console.log(otpOwner,"otpUser found");

        if(!otpOwner){
            throw new CustomError(
                "Invalid OTP",
                HttpStatus.BAD_REQUEST
             )
        }

        if(otpOwner.OTP === ownerOTP){
            await ownerRepository.updateOwnerProfile(ownerId,{
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