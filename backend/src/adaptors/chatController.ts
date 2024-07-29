import { Request, Response, NextFunction } from "express";
import { ChatDbRepositoryInterace } from "../app/Interfaces/chatDbRepository"
import { ChatRepositoryMongodbType } from "../framework/database/mongodb/repositories/chatRepositoryMongodb"
import { HttpStatus } from "../types/httpStatus";
import { newChat,newMessage } from "../app/use-cases/chat/add";
import { getChat } from "../app/use-cases/chat/read";


const chatController = (
    chatDbRepository: ChatDbRepositoryInterace,
    chatDbRepositoryImpl: ChatRepositoryMongodbType
)=>{
    const chatRepository = chatDbRepository(chatDbRepositoryImpl());


    const createNewChat = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            
            const { senderId, recieverId } = req.body;
            const formattedReceiverId = String(recieverId);
            console.log(senderId ,recieverId,"id in chat");
            const chats = await newChat(senderId, formattedReceiverId, chatRepository);
            res.status(HttpStatus.OK).json({ success: true, chats });
        } catch (error) {
            next(error);   
        }
    }

    const getChats = async(req:Request,res:Response,next:NextFunction)=>{
        const {senderId} = req.params
        console.log(senderId,"params senderis");
        const chats = await getChat(senderId,chatRepository)
        console.log(chats,"chats");
        res.status(HttpStatus.OK).json({ success: true, chats });
    }

    const createNewMessage =  async(req:Request,res:Response,next:NextFunction) =>{
        try {
            console.log(req.body);
            
            const message = await newMessage(req.body, chatRepository);
        } catch (error) {
            
        }
    }

    return {
        createNewChat,
        getChats,
        createNewMessage
    }


}

export default chatController