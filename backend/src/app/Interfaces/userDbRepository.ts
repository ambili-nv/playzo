import { userEntityType,googleSignInUserEntityType } from "../../enitity/userEntity";
import { userRepositoryMongodbType } from "../../framework/database/mongodb/repositories/userRepositoryMongodb";

export const userDbRepository = (
    repository : ReturnType<userRepositoryMongodbType>
)=>{
    const getUserbyEmail = async (email:string) =>await repository.getUserbyEmail(email)
    const addUser = async (user:userEntityType)=> await repository.addUser(user);
    const addOTP = async (otp: string, id:string) => await repository.AddOTP(otp,id);
    const findOtpUser = async (userId: string) => {
      const user = await repository.findOtpUser(userId);
      return user;
    };

    const updateProfile = async (userID:string, userData : Record<string,any>)=>await repository.updateUserInfo(userID,userData);
    const deleteOtpUser = async (userId: string) =>await repository.deleteOtpUser(userId);
    const getUserbyId = async (id: string)=> await repository.getUserbyId(id);    

    const registerGoogleSignInUser = async(user:googleSignInUserEntityType) => await repository.registerGoogleSignInUser(user)

    return{
        addUser,
        getUserbyEmail,
        addOTP,
        findOtpUser,
        updateProfile,
        deleteOtpUser,
        getUserbyId,
        registerGoogleSignInUser
    }
}

export type userDbInterface = typeof userDbRepository