import { ownerDbInterface, ownerDbRepository } from "../../Interfaces/ownerDbRepository";
import { userDbInterface } from "../../Interfaces/userDbRepository";

export const userBlock = async(
    id:string,
    userDbRepository:ReturnType<userDbInterface>
)=>{
    const user  = await userDbRepository.getUserbyId(id);

    await userDbRepository.updateUserBlock(id,!user?.isBlocked)
    return user
}


export const OwnerBlock = async(
    id:string,
    ownerDbRepository:ReturnType<ownerDbInterface>
)=>{
    const owner = await ownerDbRepository.getOwnerbyId(id);
    await ownerDbRepository.updateOwnerBlock(id,!owner?.isBlocked)
    return owner
}