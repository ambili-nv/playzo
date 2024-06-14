import { userEntityType } from "../../enitity/userEntity";
import { userRepositoryMongodbType } from "../../framework/database/mongodb/repositories/userRepositoryMongodb";

export const userDbRepository = (
    repository : ReturnType<userRepositoryMongodbType>
)=>{
    const getUserbyEmail = async (email:string) =>await repository.getUserbyEmail(email)
    const addUser = async (user:userEntityType)=> await repository.addUser(user);
    const addOTP = async (otp: string, id:string) => await repository.AddOTP(otp,id);
    const findOtpUser = async (userId: string) => {
      const user = await repository.findOtpUser(userId);
      console.log(user, "User found in repository");
      return user;
    };

    const updateProfile = async (userID:string, userData : Record<string,any>)=>await repository.updateUserInfo(userID,userData);
    const deleteOtpUser = async (userId: string) =>await repository.deleteOtpUser(userId);
    const getUserbyId = async (id: string)=> await repository.getUserbyId(id);    

    return{
        addUser,
        getUserbyEmail,
        addOTP,
        findOtpUser,
        updateProfile,
        deleteOtpUser,
        getUserbyId
    }
}

export type userDbInterface = typeof userDbRepository