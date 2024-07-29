import conversation from "../models/conversation";
import message from "../models/message";

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

      return {
        addNewChat,
        getAllChats,
        isChatExists
    }
}

export type ChatRepositoryMongodbType = typeof chatRepositoryMongodb;