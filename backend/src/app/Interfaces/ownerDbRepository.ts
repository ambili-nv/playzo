import { ownerEntityType } from "../../enitity/ownerEntity"
import { ownerRepositoryMongodbType } from "../../framework/database/mongodb/repositories/ownerRepositoryMongodb"

export const ownerDbRepository = (
    repository : ReturnType<ownerRepositoryMongodbType>
)=>{
   const addOwner = async(owner:ownerEntityType)=> await repository.addOwner(owner)

  const getOwnerbyEmail = async (email:string)=>await repository.getOwnerbyEmail(email)
    
 const findOtpOwner = async(OwnerId:string)=>{
    const owner = await repository.findOtpOwner(OwnerId)
    console.log(owner,"id...");
    
    return owner
 }   

 const updateOwnerProfile = async (OwnerId:string,ownerData:Record<string,any>)=>await repository.updateOwnerInfo(OwnerId,ownerData)

 const addOTP = async (otp: string, id:string) => await repository.AddOTP(otp,id);
const deleteOtpOwner = async(OwnerId:string)=>await repository.deleteOtpOwner(OwnerId)
const getOwnerbyId = async(id:string)=>await repository.getOwnerById(id)
   return {
    addOwner,
    getOwnerbyEmail,
    findOtpOwner,
    updateOwnerProfile,
    addOTP,
    deleteOtpOwner,
    getOwnerbyId
   }

}


export type ownerDbInterface = typeof ownerDbRepository