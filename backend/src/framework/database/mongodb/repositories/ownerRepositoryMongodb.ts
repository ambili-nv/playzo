import { ownerEntityType } from "../../../../enitity/ownerEntity"
import { OwnerInterface } from "../../../../types/ownerInterface"
import Owner from "../models/owner"
export const ownerRepositoryMongodb = () =>{

    const addOwner = async (owner:ownerEntityType)=>{
        const newOwner:any = new Owner({
            name:owner.name(),
            email:owner.getEmail(),
            password:owner.getPassword(),
            phoneNumber:owner.getphoneNumber
    })
await newOwner.save()
return newOwner
}

return {
    addOwner,
}
}

export type ownerRepositoryMongodbType = typeof  ownerRepositoryMongodb