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
      //  console.log(allChat,"allChat db");
       return allChat
    }

    const addNewMessage = async (newMessageData: newMessageInterface) =>{

      const nwMessage = await message.create(newMessageData);
      // console.log(nwMessage,"nwmsg db");
      return nwMessage
    }

    const getMessages = async (conversationId:string)=>{
      // console.log("msg db");
      // console.log(conversationId,"id c in db");
      
      const messages = await message.find({conversationId:conversationId})
      // console.log(messages,"msg from db");
      return messages
    }





      return {
        addNewChat,
        getAllChats,
        isChatExists,
        addNewMessage,
        getMessages,
    }
}

export type ChatRepositoryMongodbType = typeof chatRepositoryMongodb;
