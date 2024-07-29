import conversation from "../models/conversation";
import message from "../models/message";
import { newMessageInterface } from "../../../../types/chatInterface";

export const chatRepositoryMongodb = ()=>{

    const addNewChat = async (members: string[]) => {
        return await conversation.create({ members });
      };

      const isChatExists = async (senderId: string, recieverId: string) =>
        await conversation.findOne({ members: { $all: [senderId, recieverId] } });

    const getAllChats = async(id:string)=>{
       const allChat =   await conversation.find({ members: { $in: [id] } });
       console.log(allChat,"allChat db");
       return allChat
    }

    const addNewMessage = async (newMessageData: newMessageInterface) =>
        await message.create(newMessageData);

      return {
        addNewChat,
        getAllChats,
        isChatExists,
        addNewMessage
    }
}

export type ChatRepositoryMongodbType = typeof chatRepositoryMongodb;