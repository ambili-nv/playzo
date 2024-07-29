// import React from "react";
// import { FaUserCircle } from "react-icons/fa";

// interface ConversationProps {
//   conversation: {
//     _id: string;
//     members: string[];
//     lastMessage: {
//       text: string;
//       createdAt: string;
//     };
//   };
//   lastMessage: {
//     text: string;
// };
// }

// const Conversation: React.FC<ConversationProps> = ({ conversation, lastMessage  }) => {
//   return (
//     <div
//       key={conversation._id}
//       className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-300"
//       // onClick={onClick
//     >
//                   <img
//               className="w-14 h-14 rounded-full object-cover mb-2 sm:mb-0 sm:mr-4"
//               // src={doctorData.profileImage}
//               alt=" Profile"
//             />
//       <FaUserCircle size={40} className="text-gray-600" />
//       <div className="ml-3 flex-1">
//         <p className="font-semibold text-gray-700">User {conversation.members[1]}</p>
//         <p className="text-gray-500 truncate">{conversation.lastMessage.text}</p>
//       </div>
//       <span className="text-gray-400 text-sm">{new Date(conversation.lastMessage.createdAt).toLocaleDateString()}</span>
//     </div>
//   );
// };

// export default Conversation;




// import React,{useEffect, useState} from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { USER_API } from "../../../constants";
// import axios from "axios";

// interface ConversationProps {
//   conversation: {
//     _id: string;
//     members: string[];
//     lastMessage: {
//       text: string;
//       createdAt: string;
//     };
//   };
//   lastMessage: {
//     text: string;
// };
// }
// //@ts-ignore
// const Conversation: React.FC<ConversationProps> = ({ conversation, lastMessage  }) => {
//   const [ownerData, setownerData] = useState<any>({});

//   useEffect(() => {
//     const fetchOwnerData = async () => {
//       try {
//         const ownerId = conversation.members[1];
//         const response = await axios.get(`${USER_API}/owner/${ownerId}`);
//         setownerData(response.data.owner);
//       } catch (error) {
//         console.error("Error fetching owner data:", error);
//       }
//     };

//     // if (conversation.members.length > 0) {
//       fetchOwnerData();
//     // }
//   }, [conversation]);

//   // Rest of your component code
// };


//   return (
//     <div
//       className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-300"
      
//     >
//       <FaUserCircle size={40} className="text-gray-600" />
//       <div className="ml-3 flex-1">
//         <p className="font-semibold text-gray-700">User {conversation.members[1]}</p>
//         <p className="text-gray-500 truncate">{conversation.lastMessage.text}</p>
//       </div>
//       <span className="text-gray-400 text-sm">
//         {new Date(conversation.lastMessage.createdAt).toLocaleDateString()}
//       </span>
//     </div>
//   );
// };

// export default Conversation;












import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { USER_API } from "../../../constants";
import axios from "axios";

interface ConversationProps {
  conversation: {
    _id: string;
    members: string[];
    lastMessage: {
      text: string;
      createdAt: string;
    };
  };
  lastMessage: {
    text: string;
  };
}

interface OwnerData {
  // Define the structure based on your API response
  name?: string;
  // Add other fields as necessary
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  const [ownerData, setOwnerData] = useState<OwnerData | null>(null);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerId = conversation.members[1];
        console.log(ownerId,"id owner chat");
        
        const response = await axios.get(`${USER_API}/owner/${ownerId}`);
        setOwnerData(response.data.owner);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    // if (conversation.members.length > 0) {
      fetchOwnerData();
    // }
  }, [conversation]);

  return (
    <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-300">
      <FaUserCircle size={40} className="text-gray-600" />
      <div className="ml-3 flex-1">
        <p className="font-semibold text-gray-700">
          {ownerData?.name ? ownerData.name : `User ${conversation.members[1]}`}
        </p>
        {/* <p className="text-gray-500 truncate">{conversation.lastMessage.text}</p> */}
      </div>
      <span className="text-gray-400 text-sm">
        {new Date(conversation.lastMessage.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default Conversation;
