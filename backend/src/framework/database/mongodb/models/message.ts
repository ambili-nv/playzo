import mongoose from "mongoose";
import conversation from "./conversation";

const messageSchema = new mongoose.Schema(
    {
        conversationId:{type:String},
        senderId:{type:String},
        text:{type:String},
        isRead: { type: Boolean, 
        default: false },
    },
    { timestamps: true }
)
export default mongoose.model("Message", messageSchema);