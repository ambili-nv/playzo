import { ownerEntityType } from "../../../../enitity/ownerEntity"
import { OwnerInterface } from "../../../../types/ownerInterface"
import OTPmodel from "../models/OTPmodel"
import Owner from "../models/owner"
export const ownerRepositoryMongodb = () =>{

    const getOwnerbyEmail = async (email:any)=>{
        const owner : OwnerInterface | null = await Owner.findOne({email})
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

return {
    addOwner,
    getOwnerbyEmail,
    findOtpOwner,
    updateOwnerInfo,
    AddOTP
}
}

export type ownerRepositoryMongodbType = typeof  ownerRepositoryMongodb