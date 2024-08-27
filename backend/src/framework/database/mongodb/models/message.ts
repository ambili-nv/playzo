import mongoose from "mongoose";
import conversation from "./conversation";

const messageSchema = new mongoose.Schema(
    {
        conversationId:{type:String},
        senderId:{type:String},
        text:{type:String},
    },
    { timestamps: true }
)
export default mongoose.model("Message", messageSchema);



// // message.js (model)
// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
//     {
//         conversationId: { type: String },
//         senderId: { type: String },
//         text: { type: String },
//         isRead: { type: Boolean, default: false }, // New field
//     },
//     { timestamps: true }
// );

// export default mongoose.model("Message", messageSchema);
