import { ChatRepositoryMongodbType } from "../../framework/database/mongodb/repositories/chatRepositoryMongodb";
import { newMessageInterface } from "../../types/chatInterface";

export const chatDbRepository = (
    repository: ReturnType<ChatRepositoryMongodbType>
)=>{

    const createNewChat = async (members: string[]) =>
        await repository.addNewChat(members);

    const checkChat = async(senderId:string,recieverId:string)=>{
       return repository.isChatExists(senderId,recieverId)
    }

    const getAllChats =async (senderId:string)=>{
       const chats =  await repository.getAllChats(senderId)
       console.log(chats,"dbRepo chats");
       
       return chats
    }

    
    const addNewMessage = async (newMessageData: newMessageInterface) =>
        await repository.addNewMessage(newMessageData);


    return{
        createNewChat,
        getAllChats,
        checkChat,
        addNewMessage
    }

}

export type ChatDbRepositoryInterace = typeof chatDbRepository;