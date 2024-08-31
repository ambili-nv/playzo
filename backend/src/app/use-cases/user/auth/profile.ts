import { userDbInterface } from "../../../Interfaces/userDbRepository";
import { UserInterface } from "../../../../types/userInterface";


export const getUser = async (
    userId:string,
    userRepository:ReturnType<userDbInterface>
)=>{
    const user = await userRepository.getUserbyId(userId)
    return user
    
}

export const updateUser = async (
    userId:string,
    updateData:UserInterface,
    userRepository:ReturnType<userDbInterface>
)=>{
    const user = await userRepository.editProfile(userId,updateData)
    // console.log(user,"user - edit - profile");
    return user
}