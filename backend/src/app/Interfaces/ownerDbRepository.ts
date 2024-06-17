import { ownerEntityType } from "../../enitity/ownerEntity"
import { ownerRepositoryMongodbType } from "../../framework/database/mongodb/repositories/ownerRepositoryMongodb"

export const ownerDbRepository = (
    repository : ReturnType<ownerRepositoryMongodbType>
)=>{
   const addOwner = async(owner:ownerEntityType)=> await repository.addOwner(owner)

  const getOwnerbyEmail = async (email:string)=>await repository.getOwnerbyEmail(email)
    
 const findOtpOwner = async(ownerId:string)=>{
    const owner = await repository.findOtpOwner(ownerId)
    console.log(owner,"id...");
    
    return owner
 }   

 const updateOwnerProfile = async (ownerId:string,ownerData:Record<string,any>)=>await repository.updateOwnerInfo(ownerId,ownerData)

 const addOTP = async (otp: string, id:string) => await repository.AddOTP(otp,id);


   return {
    addOwner,
    getOwnerbyEmail,
    findOtpOwner,
    updateOwnerProfile,
    addOTP
   }

}


export type ownerDbInterface = typeof ownerDbRepository