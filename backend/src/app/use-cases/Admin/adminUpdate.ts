import { userDbInterface } from "../../Interfaces/userDbRepository";

export const userBlock = async(
    id:string,
    userDbRepository:ReturnType<userDbInterface>
)=>{
    const user  = await userDbRepository.getUserbyId(id);

    await userDbRepository.updateUserBlock(id,!user?.isBlocked)
    return user
}