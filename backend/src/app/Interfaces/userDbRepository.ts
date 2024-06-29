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

    const registerGoogleSignInUser = async(user:googleSignInUserEntityType) => await repository.registerGoogleSignInUser(user);

    const updateVerificationCode = async(email:string, verificationCode:string)=> await repository.updateVerificationCode(email,verificationCode)

    const verifyAndResetPassword = async (verificationCode: string,password: string) =>await repository.findVerificationCodeAndUpdate(verificationCode, password);

    const updateUserBlock = async(id:string,status:boolean)=>{
        await repository.updateUserBlock(id,status)
    }

    // const getAllUsers = async()=> {
    //     // const allUsers =
    //      await repository.getAllusers()
    //     // return allUsers
    // }


    const getAllUsers = async () => {
        try {
            const allUsers = await repository.getAllusers();
            console.log(allUsers, "users - service");
            return allUsers;
        } catch (error) {
            console.error("Error in service function:", error);
            throw error;
        }
    };

   

    const editProfile = async (userID: string, userData: Record<string, any>) => {
        try {
          return await repository.editUserInfo(userID, userData);
        } catch (error) {
          console.error('Error in updateProfile:', error);
          throw error;
        }
      };
      

    


    return{
        addUser,
        getUserbyEmail,
        addOTP,
        findOtpUser,
        updateProfile,
        deleteOtpUser,
        getUserbyId,
        registerGoogleSignInUser,
        updateVerificationCode,
        verifyAndResetPassword,
        getAllUsers,
        updateUserBlock,
        editProfile
    }
}

export type userDbInterface = typeof userDbRepository