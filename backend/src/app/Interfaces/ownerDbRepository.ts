import { googleSignInOwnerEntityType, ownerEntityType } from "../../enitity/ownerEntity"
import { VenueEntity } from "../../enitity/venueEntity"
import { ownerRepositoryMongodbType } from "../../framework/database/mongodb/repositories/ownerRepositoryMongodb"

export const ownerDbRepository = (
    repository : ReturnType<ownerRepositoryMongodbType>
)=>{
   const addOwner = async(owner:ownerEntityType)=> await repository.addOwner(owner)

  const getOwnerbyEmail = async (email:string)=>await repository.getOwnerbyEmail(email)
    
 const findOtpOwner = async(OwnerId:string)=>{
    const owner = await repository.findOtpOwner(OwnerId)
   //  console.log(owner,"id...");
    
    return owner
 }   

 const updateOwnerProfile = async (OwnerId:string,ownerData:Record<string,any>)=>await repository.updateOwnerInfo(OwnerId,ownerData)

 const addOTP = async (otp: string, id:string) => await repository.AddOTP(otp,id);
const deleteOtpOwner = async(OwnerId:string)=>await repository.deleteOtpOwner(OwnerId)


const getOwnerbyId = async(id:string)=>await repository.getOwnerById(id)

const registerGoogleSignInOwner = async(owner:googleSignInOwnerEntityType)=>await repository.registerGoogleSignInOwner(owner)

const getAllOwners = async()=>{
   try {
      const allOwners = await repository.getAllOwners();
      // console.log(allOwners,"from db");
      return allOwners

   } catch (error) {
      
   }
}

const updateOwnerBlock = async(id:string,status:boolean)=>{
   await repository.updateOWnerBlock(id,status)
}

const addVenue = async (venue: VenueEntity) => await repository.addVenue(venue);


const editProfileOwner = async(ownerId : string,ownerData:Record<string,any>)=>{
   try {
      return await repository.editOwnerInfo(ownerId,ownerData)
   } catch (error) {
      throw error
   }
}


   return {
    addOwner,
    getOwnerbyEmail,
    findOtpOwner,
    updateOwnerProfile,
    addOTP,
    deleteOtpOwner,
    getOwnerbyId,
    registerGoogleSignInOwner,
    getAllOwners,
    updateOwnerBlock,
    addVenue,
    editProfileOwner
   }

}


export type ownerDbInterface = typeof ownerDbRepository