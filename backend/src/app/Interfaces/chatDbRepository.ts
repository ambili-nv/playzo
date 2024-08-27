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
    //    console.log(chats,"dbRepo chats");
       
       return chats
    }

    
    const addNewMessage = async (newMessageData: newMessageInterface) =>{

        const newMessage = await repository.addNewMessage(newMessageData);
        // console.log(newMessage,"nw msg rep");
        return newMessage
        
    }


    const getMessages = async(conversationId:string)=>{
      const messages =   await repository.getMessages(conversationId)
      return messages
    }
    return{
        createNewChat,
        getAllChats,
        checkChat,
        addNewMessage,
        getMessages,
    }

}

export type ChatDbRepositoryInterace = typeof chatDbRepository;
