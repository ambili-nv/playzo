import { ownerEntityType } from "../../enitity/ownerEntity"
import { ownerRepositoryMongodbType } from "../../framework/database/mongodb/repositories/ownerRepositoryMongodb"

export const ownerDbRepository = (
    repository : ReturnType<ownerRepositoryMongodbType>
)=>{
   const addOwner = async(owner:ownerEntityType)=> await repository.addOwner(owner)

    


   return {
    addOwner,
   }

}


export type ownerDbInterface = typeof ownerDbRepository