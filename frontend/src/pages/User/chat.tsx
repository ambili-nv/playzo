// import React, { useEffect, useState, useRef } from "react";
// import { FiSend } from "react-icons/fi";
// import Conversation from "../../components/chat/user/conversations";
// import Message from "../../components/chat/user/messages";
// import { useAppSelector } from "../../redux/store/store";
// import axios from "axios";
// import { CHAT_API } from "../../constants";

// const ChatUI: React.FC = () => {
//     const user = useAppSelector((state) => state.userSlice);

//     const [conversations, setConversations] = useState<any[]>([]);
//     const [currentChat, setCurrentChat] = useState<any | null>(null);
//     const [messages, setMessages] = useState<any[]>([]);
//     const [newMessage, setNewMessage] = useState<string>("");
//     const scrollRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const getConversations = async () => {
//             try {
//                 const response = await axios.get(`${CHAT_API}/conversations/${user.id}`);
//                 console.log("API response:", response.data);

//                 if (response.data.success) {
//                     setConversations(response.data.chats);
//                 } else {
//                     console.error("Failed to fetch conversations");
//                 }
//             } catch (error) {
//                 console.error("Error fetching conversations:", error);
//             }
//         };

//         getConversations();
//     }, [user.id]);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             if (currentChat) {
//                 try {
//                     const response = await axios.get(`${CHAT_API}/messages/${currentChat._id}`);
//                     console.log("Messages response:", response.data);

//                     if (response.data.success) {
//                         setMessages(response.data.messages);
//                     } else {
//                         console.error("Failed to fetch messages");
//                     }
//                 } catch (error) {
//                     console.error("Error fetching messages:", error);
//                 }
//             }
//         };

//         fetchMessages();
//     }, [currentChat]);

//     useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const handleConversationClick = async (conversation: any) => {
//         const id = conversation.members.find((member: any) => member !== user.id);
//         console.log("Selected conversation ID:", id);
//         setCurrentChat(conversation);
//     };

//     const handleSubmit = async () => {
//         if (newMessage.trim()) {
//             try {
//                 const response = await axios.post(`${CHAT_API}/messages`, {
//                     conversationId: currentChat._id,
//                     senderId: user.id,
//                     text: newMessage,
//                 });
//                 console.log("Message sent response:", response.data);

//                 if (response.data.success) {
//                     setMessages([...messages, response.data.message]);
//                     setNewMessage("");
//                 } else {
//                     console.error("Failed to send message");
//                 }
//             } catch (error) {
//                 console.error("Error sending message:", error);
//             }
//         }
//     };

//     console.log("Conversations state:", conversations);
//     console.log("Messages state:", messages);

//     return (
//         <div className="h-screen flex flex-col lg:flex-row">
//             {/* Chat Menu */}
//             <div className="w-full lg:w-1/4 bg-gray-200 border-r border-gray-300">
//                 <div className="p-4 h-full flex flex-col">
//                     {conversations.length > 0 ? (
//                         conversations.map((conversation, index) => (
//                             <div
//                                 key={index}
//                                 onClick={() => handleConversationClick(conversation)}
//                             >
//                                 <Conversation
//                                     conversation={conversation}
//                                     lastMessage={conversation.lastMessage}
//                                 />
//                             </div>
//                         ))
//                     ) : (
//                         <div className="flex justify-center items-center flex-grow">
//                             <p className="text-lg text-blue-900 font-bold mb-60">Conversation list is empty!</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Chat Box */}
//             <div className="w-full lg:w-3/4 flex flex-col bg-gray-100">
//                 <div className="flex-1 overflow-y-scroll p-4 border-b border-gray-300">
//                     {!currentChat ? (
//                         <div className="text-center text-gray-400 text-xl mt-20">
//                             Open a chat to start the conversation..
//                         </div>
//                     ) : (
//                         <>
//                             {messages.map((message, index) => (
//                                 <div key={index} ref={scrollRef}>
//                                     <Message
//                                         message={message}
//                                         own={message.senderId === user.id}
//                                     />
//                                 </div>
//                             ))}
//                         </>
//                     )}
//                 </div>
//                 <div className="bg-white p-4 border-t border-gray-300 flex items-center">
//                     <textarea
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
//                         placeholder="Write a message..."
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         value={newMessage}
//                         rows={2}
//                     ></textarea>
//                     <button
//                         className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
//                         onClick={handleSubmit}
//                     >
//                         <FiSend size={20} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatUI;





import React, { useEffect, useState, useRef} from "react";
import { FiSend } from "react-icons/fi";
import Conversation from "../../components/chat/user/conversations";
import Message from "../../components/chat/user/messages";
import { useAppSelector } from "../../redux/store/store";
import axios from "axios";
import { CHAT_API } from "../../constants";
import { useSocket } from "../../context/socketContext";




const ChatUI: React.FC = () => {
    const user = useAppSelector((state) => state.userSlice);

    const [conversations, setConversations] = useState<any[]>([]);
    const [currentChat, setCurrentChat] = useState<any | null>(null);
    const [newMessage, setNewMessage] = useState<string>("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const socket = useSocket();

    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`${CHAT_API}/conversations/${user.id}`);
                console.log("API response:", response.data);

                // Ensure you are accessing the correct field in the response
                if (response.data.success) {
                    setConversations(response.data.chats); // Set state to `chats` array
                } else {
                    console.error("Failed to fetch conversations");
                }
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        getConversations();
    }, [user.id]);

    const handleConversationClick = async (conversation: any) => {
        const id = conversation.members.find((member: any) => member !== user.id);
        console.log("Selected conversation ID:", id);
    }

    const handleSubmit  = async (e: React.FormEvent)=>{
        e.preventDefault();
        const message = {
          senderId: user.id,
          text: newMessage,
          conversationId: currentChat?._id,
        };

        const receiverId = currentChat?.members.find(
            (member: any) => member !== user.id
          );


          socket?.emit("sendMessage", {
            senderId: user.id,
            receiverId,
            text: newMessage,
            conversationId: currentChat?._id,
          });

          try {
            const response = await axios.post(`${CHAT_API}/messages`, message);
          } catch (error) {
            
          }
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
                    {!currentChat ? (
                        <div className="text-center text-gray-400 text-xl mt-20">
                            Open a chat to start the conversation..
                        </div>
                    ) : (
                        <>
                            {/* {messages.map((message, index) => ( */}
                                {/* <div key={index} ref={scrollRef}> */}
                                    {/* <Message */}
                                        {/* // message={message} */}
                                        {/* // own={message.senderId === user.id} */}
                                    {/* /> */}
                                {/* </div> */}
                            {/* ))} */}
                        </>
                    )}
                </div>
                {/* Message Input */}
                <div className="bg-white p-4 border-t border-gray-300 flex items-center">
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
                        placeholder="Write a message..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        rows={2}
                    ></textarea>
                    <button className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    onClick={handleSubmit}
                    >
                        <FiSend size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatUI;
