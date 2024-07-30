import { ChatDbRepositoryInterace } from "../../Interfaces/chatDbRepository";
import { newMessageInterface } from "../../../types/chatInterface";

export const newChat = async(
    senderId: string,
    recieverId: string,
    chatRepository: ReturnType<ChatDbRepositoryInterace>
)=>{
    const isChatExist = await chatRepository.checkChat(senderId,recieverId)
    if(isChatExist){
        return isChatExist
    }
    return await chatRepository.createNewChat([senderId, recieverId]);
}

export const newMessage = async (
    newMessageData: newMessageInterface,
    chatRepository: ReturnType<ChatDbRepositoryInterace>
)=>{
   const message = await chatRepository.addNewMessage(newMessageData);
   console.log(message);
   return message
}