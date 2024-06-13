import { userEntityType } from "../../enitity/userEntity";
import { userRepositoryMongodbType } from "../../framework/database/mongodb/repositories/userRepositoryMongodb";

export const userDbRepository = (
    repository : ReturnType<userRepositoryMongodbType>
)=>{
    const addUser = async (user:userEntityType)=> await repository.addUser(user);
    const getUserbyEmail = async (email:any) =>await repository.getUserbyEmail(email)


    return{
        addUser,
        getUserbyEmail
    }
}

export type userDbInterface = typeof userDbRepository