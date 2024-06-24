import { googleSignInOwnerEntityType, ownerEntityType } from "../../../../enitity/ownerEntity"
import { OwnerInterface } from "../../../../types/ownerInterface"
import OTPmodel from "../models/OTPmodel"
import Owner from "../models/owner"
export const ownerRepositoryMongodb = () =>{

    const getOwnerbyEmail = async (email:any)=>{
        const owner : OwnerInterface | null = await Owner.findOne({email})
        console.log(owner,"owner db");
        
        return owner
    }

    const addOwner = async (owner:ownerEntityType)=>{
        const newOwner:any = new Owner({
            name:owner.name(),
            email:owner.getEmail(),
            password:owner.getPassword(),
            phoneNumber:owner.getphoneNumber
    })
await newOwner.save()
return newOwner
}

const AddOTP = async (OTP: string, ownerId: string)=>{
    await OTPmodel.create({OTP, ownerId});
};

const findOtpOwner = async (ownerId:string)=>{
    try {
        const owner = await OTPmodel.findOne({ownerId})
        console.log(owner,"dbbbb");
        
        return owner
    } catch (error) {
        console.error("Error finding OTP user:", error);
        throw new Error("Database query failed");
    }
}

const updateOwnerInfo = async (id:string,updateData:Record<string,any>)=>await Owner.findByIdAndUpdate(id,updateData,{new:true})

const deleteOtpOwner = async(ownerId:string)=>await OTPmodel.deleteOne({ownerId})
const getOwnerById = async (id:string)=>await Owner.findById(id)

const registerGoogleSignInOwner = async(owner:googleSignInOwnerEntityType)=>{
    await Owner.create({
        name:owner.name(),
        email:owner.email(),
        isVerified:owner.email_verified()
    })
}

const getAllOwners = async()=>{
    try{
        const allOwners = await Owner.find({isVerified:true})
        console.log(allOwners,"owners-mongodb-repo");
        return allOwners
    } catch(error){
        throw error
    }
}

const updateOWnerBlock = async(id:string,status:boolean)=>{
    await Owner.findByIdAndUpdate(id,{isBlocked:status})
}

return {
    addOwner,
    getOwnerbyEmail,
    findOtpOwner,
    updateOwnerInfo,
    AddOTP,
    deleteOtpOwner,
    getOwnerById,
    registerGoogleSignInOwner,
    getAllOwners,
    updateOWnerBlock
}
}

export type ownerRepositoryMongodbType = typeof  ownerRepositoryMongodb