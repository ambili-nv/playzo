import { Request, Response, NextFunction } from "express";
import { ChatDbRepositoryInterace } from "../app/Interfaces/chatDbRepository"
import { ChatRepositoryMongodbType } from "../framework/database/mongodb/repositories/chatRepositoryMongodb"
import { HttpStatus } from "../types/httpStatus";
import { newChat,newMessage } from "../app/use-cases/chat/add";
import { getChat,fetchMessages} from "../app/use-cases/chat/read";


const chatController = (
    chatDbRepository: ChatDbRepositoryInterace,
    chatDbRepositoryImpl: ChatRepositoryMongodbType
)=>{
    const chatRepository = chatDbRepository(chatDbRepositoryImpl());


    const createNewChat = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            
            const { senderId, recieverId } = req.body;
            const formattedReceiverId = String(recieverId);
            // console.log(senderId ,recieverId,"id in chat");
            const chats = await newChat(senderId, formattedReceiverId, chatRepository);
            // console.log(chats,"cahts c////////////");
            
            res.status(HttpStatus.OK).json({ success: true, chats });
        } catch (error) {
            next(error);   
        }
    }

    

    const getChats = async(req:Request,res:Response,next:NextFunction)=>{
        const {senderId} = req.params
        // console.log(senderId,"params senderis");
        const chats = await getChat(senderId,chatRepository)
        // console.log(chats,"chats///////////?????????????");
        res.status(HttpStatus.OK).json({ success: true, chats });
    }




    const createNewMessage =  async(req:Request,res:Response,next:NextFunction) =>{
        try {
            // console.log(req.body,"messages");
            // const {members,recieverId} = req.body
            // const {recieverId} = req.body.recieverId
            // console.log(recieverId,"id////");
            const message = await newMessage(req.body, chatRepository);
            // console.log(message,"33");
            
            res.status(HttpStatus.OK).json(message);
        } catch (error) {
            
        }
    }

    const getMessages =  async(req:Request,res:Response,next:NextFunction) =>{
        try {
            const {conversationId} = req.params
            // console.log(conversationId,"conversationis chat controller");
            const messages = await fetchMessages(conversationId,chatRepository) 
            // console.log(messages,"retrieve messages in chat controller");
            res.status(HttpStatus.OK).json({ success: true, messages });
        } catch (error) {
            
        }
    }






    return {
        createNewChat,
        getChats,
        createNewMessage,
        getMessages,
    }


}

export default chatController
