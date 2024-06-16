import { CreateOwnerInterface,OwnerInterface } from "../../../types/ownerInterface";
import createOwnerEntity,{ownerEntityType} from "../../../enitity/ownerEntity"
import { ownerDbInterface } from "../../Interfaces/ownerDbRepository";
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import { AuthServiceInterfaceType } from "../../service-interface/authServiceInrerface";
import sentMail from "../../../utils/sendMail";
import { otpEmail } from "../../../utils/userEmail";
import { userDbInterface } from "../../Interfaces/userDbRepository";

// owner Register

export const ownerRegister:any = async(
    owner:CreateOwnerInterface,
    ownerRepository:ReturnType<userDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
) =>{
    // console.log("recieved data ");

    const {name, email , password, phoneNumber}  = owner

    const ownerEntity : ownerEntityType = createOwnerEntity(
        name,
        email,
        phoneNumber,
        password
    )
    
    //@ts-ignore
    const createdOwner : OwnerInterface = await ownerRepository.addOwner(ownerEntity)

    return {createdOwner}
}