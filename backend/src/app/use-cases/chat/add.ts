import { ChatDbRepositoryInterace } from "../../Interfaces/chatDbRepository";

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