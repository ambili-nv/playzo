import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import Conversation from "../../components/chat/user/conversations";
import Message from "../../components/chat/user/messages";
import { useAppSelector } from "../../redux/store/store";
import axios from "axios";
import { CHAT_API } from "../../constants";

const ChatUI: React.FC = () => {
    const user = useAppSelector((state) => state.userSlice);
    // console.log(user.id,"id user chat");
    

    const [conversations, setConversations] = useState<any[]>([]);

    useEffect(()=>{
        const getConversations = async()=>{
            try {
                const response =await axios.get(`${CHAT_API}/conversations/${user.id}`)

                const conversationData = response.data
                console.log(conversationData,"conversationData");
                setConversations(conversationData)

            } catch (error) {
                
            }
        }
        getConversations()
    },[user.id])

    const handleConversationClick = async (conversation:any)=>{
        const id = conversation.members.find((member: any) => member !== user.id);
        // console.log(id,"id user");
        
    }

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Chat Menu */}
      <div className="w-full lg:w-1/4 bg-gray-200 border-r border-gray-300">
        <div className="p-4 h-full flex flex-col">
        {conversations.length > 0 ? (
          conversations.map((conversation, index) => (
            <div
              key={index}
              onClick={() => handleConversationClick(conversation)}
            >
              <Conversation
                conversation={conversation}
                lastMessage={conversation.lastMessage}
              />
            </div>
          ))
        ) : (
            <div className="flex justify-center items-center flex-grow">
              <p className="text-lg text-blue-900 font-bold mb-60">Conversation list is empty!</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Box */}
      <div className="w-full lg:w-3/4 flex flex-col bg-gray-100">
        <div className="flex-1 overflow-y-scroll p-4 border-b border-gray-300">
          {/* {selectedConversation ? (
            dummyMessages.map((message, index) => (
              <Message
                key={index}
                message={message}
                own={message.senderId === "1"}
              />
            ))
          ) : ( */}
            <div className="text-center text-gray-400 text-xl mt-20">
              Open a chat to start the conversation..
            </div>
          {/* )} */}
        </div>
        {/* Message Input */}
        <div className="bg-white p-4 border-t border-gray-300 flex items-center">
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
            placeholder="Write a message..."
            rows={2}
          ></textarea>
          <button className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;



































// import React from "react";
// import { FiSend } from "react-icons/fi";
// import { FaUserCircle } from "react-icons/fa";

// //@ts-ignore
// const dummyConversations = [
//   { _id: "1", members: ["1", "2"], lastMessage: { text: "Hello!", createdAt: "2024-07-21T12:34:56Z" } },
//   { _id: "2", members: ["1", "3"], lastMessage: { text: "How are you?", createdAt: "2024-07-20T08:22:34Z" } },
// ];

// const dummyMessages = [
//   { senderId: "1", text: "Hi there!", createdAt: "2024-07-21T12:35:00Z" },
//   { senderId: "2", text: "Hello!", createdAt: "2024-07-21T12:36:00Z" },
// ];

// const ChatUI: React.FC = () => {
//   return (
//     <div className="h-screen flex flex-col lg:flex-row">
//       {/* Chat Menu */}
//       <div className="w-full lg:w-1/4 bg-gray-200 border-r border-gray-300">
//         <div className="p-4 h-full flex flex-col">
//           {dummyConversations.length > 0 ? (
//             //@ts-ignore
//             dummyConversations.map((conversation) => (
//               <div
//                 key={conversation._id}
//                 className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-300"
//               >
//                 <FaUserCircle size={40} className="text-gray-600" />
//                 <div className="ml-3 flex-1">
//                   <p className="font-semibold text-gray-700">User {conversation.members[1]}</p>
//                   <p className="text-gray-500 truncate">{conversation.lastMessage.text}</p>
//                 </div>
//                 <span className="text-gray-400 text-sm">{new Date(conversation.lastMessage.createdAt).toLocaleDateString()}</span>
//               </div>
//             ))
//           ) : (
//             <div className="flex justify-center items-center flex-grow">
//               <p className="text-lg text-blue-900 font-bold mb-60">Conversation list is empty!</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Chat Box */}
//       <div className="w-full lg:w-3/4 flex flex-col bg-gray-100">
//         <div className="flex-1 overflow-y-scroll p-4 border-b border-gray-300">
//           {dummyMessages.length === 0 ? (
//             <div className="text-center text-gray-400 text-xl mt-20">
//               Open a chat to start the conversation..
//             </div>
//           ) : (
//             <>
//               {dummyMessages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${message.senderId === "1" ? "justify-end" : "justify-start"} mb-3`}
//                 >
//                   <div
//                     className={`max-w-xs p-3 rounded-lg ${
//                       message.senderId === "1" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
//                     }`}
//                   >
//                     {message.text}
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//         {/* Message Input */}
//         <div className="bg-white p-4 border-t border-gray-300 flex items-center">
//           <textarea
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
//             placeholder="Write a message..."
//             rows={2}
//           ></textarea>
//           <button className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
//             <FiSend size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatUI;


















// // import React from "react";
// // import { FiSend } from "react-icons/fi";
// // import Conversation from "../../components/chat/user/conversations";
// // import Message from "../../components/chat/user/messages";

// // //@ts-ignore
// // const dummyConversations = [
// //   { _id: "1", members: ["1", "2"], lastMessage: { text: "Hello!", createdAt: "2024-07-21T12:34:56Z" } },
// //   { _id: "2", members: ["1", "3"], lastMessage: { text: "How are you?", createdAt: "2024-07-20T08:22:34Z" } },
// // ];

// // const dummyMessages = [
// //   { senderId: "1", text: "Hi there!", createdAt: "2024-07-21T12:35:00Z" },
// //   { senderId: "2", text: "Hello!", createdAt: "2024-07-21T12:36:00Z" },
// // ];

// // const ChatUI: React.FC = () => {
// //   return (
// //     <div className="h-screen flex flex-col lg:flex-row">
// //       {/* Chat Menu */}
// //       <div className="w-full lg:w-1/4 bg-gray-200 border-r border-gray-300">
// //         <div className="p-4 h-full flex flex-col">
// //           {dummyConversations.length > 0 ? (
// //             dummyConversations.map((conversation) => (
// //               <Conversation
// //                 key={conversation._id}
// //                 conversation={conversation}
// //                 onClick={() => {
// //                   // Handle conversation click
// //                 }}
// //               />
// //             ))
// //           ) : (
// //             <div className="flex justify-center items-center flex-grow">
// //               <p className="text-lg text-blue-900 font-bold mb-60">Conversation list is empty!</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Chat Box */}
// //       <div className="w-full lg:w-3/4 flex flex-col bg-gray-100">
// //         <div className="flex-1 overflow-y-scroll p-4 border-b border-gray-300">
// //           {dummyMessages.length === 0 ? (
// //             <div className="text-center text-gray-400 text-xl mt-20">
// //               Open a chat to start the conversation..
// //             </div>
// //           ) : (
// //             <>
// //               {dummyMessages.map((message, index) => (
// //                 <Message
// //                   key={index}
// //                   message={message}
// //                   own={message.senderId === "1"}
// //                 />
// //               ))}
// //             </>
// //           )}
// //         </div>
// //         {/* Message Input */}
// //         <div className="bg-white p-4 border-t border-gray-300 flex items-center">
// //           <textarea
// //             className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
// //             placeholder="Write a message..."
// //             rows={2}
// //           ></textarea>
// //           <button className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
// //             <FiSend size={20} />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatUI;
