import { ChatDbRepositoryInterace } from "../../Interfaces/chatDbRepository";

export const getChat = async(
    senderId:string,
    chatRepository: ReturnType<ChatDbRepositoryInterace>
)=>{
    const chats = await chatRepository.getAllChats(senderId)
    console.log(chats,"read chats");
    return chats
}


export const fetchMessages = async (
    conversationId : string,
    chatRepository : ReturnType<ChatDbRepositoryInterace>
)=>{
    const messages = await chatRepository.getMessages(conversationId)
    console.log(messages,"msg in read");
    
    return messages
}