// // import React, { useEffect, useState } from "react";
// // import { FaUserCircle } from "react-icons/fa";
// // import { USER_API } from "../../../constants";
// // import axios from "axios";

// // interface ConversationProps {
// //   conversation: {
// //     _id: string;
// //     members: string[];
// //     lastMessage: {
// //       text: string;
// //       createdAt: string;
// //     };
// //   };
// //   lastMessage: {
// //     text: string;
// //   };
// // }

// // const Conversation: React.FC<ConversationProps> = ({ conversation,lastMessage }) => {
// //   // console.log("Conversation component rendered");
// //   const [ownerData, setOwnerData] =  useState<any>({})

//   // useEffect(() => {
//   //   const fetchOwnerData = async () => {
//   //     try {
//   //       const ownerId = conversation.members[1];
//   //       console.log("Fetching owner data for ID:", ownerId);

//   //       const response = await axios.get(`${USER_API}/owner/${ownerId}`);
//   //       console.log("Owner data response:", response.data);

//   //       setOwnerData(response.data.owner);
//   //     } catch (error) {
//   //       console.error("Error fetching owner data:", error);
//   //     }
//   //   };

//   //   if (conversation.members.length > 1) {
//   //     fetchOwnerData();
//   //   }
//   // }, [conversation]);
//   // // console.log(ownerData,"ownerData//");
  

// //   return (
// //     <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
// //       {ownerData?.profilePic ? (
// //         <img
// //           className="w-16 h-16 rounded-full object-cover shadow-md"
// //           src={ownerData.profilePic}
// //           alt="Owner Profile"
// //         />
// //       ) : (
// //         <FaUserCircle size={48} className="text-gray-600" />
// //       )}
// //       <div className="ml-4 flex-1">
// //         <p className="font-semibold text-gray-800 text-lg">
// //           {ownerData?.name ? ownerData.name : `User ${conversation.members[1]}`}
// //         </p>
// //         <p className="text-gray-500 text-sm mt-1 truncate">
// //           {conversation.lastMessage?.text}
// //         </p>
// //       </div>
// //       <span className="text-gray-400 text-xs flex-shrink-0">
// //         {new Date(conversation.lastMessage?.createdAt).toLocaleDateString()}
// //       </span>
// //     </div>
// //   );
// // };

// // export default Conversation;




// import React, { useEffect, useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import axios from "axios";
// import { USER_API } from "../../../constants";

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
//   };
//   unreadMessages: number; // Prop to track unread messages count
// }

// const Conversation: React.FC<ConversationProps> = ({
//   conversation,
//   lastMessage,
//   unreadMessages,
// }) => {
  // const [ownerData, setOwnerData] = useState<any>({});

  // useEffect(() => {
  //   const fetchOwnerData = async () => {
  //     try {
  //       const ownerId = conversation.members[1];
  //       console.log("Fetching owner data for ID:", ownerId);

  //       const response = await axios.get(`${USER_API}/owner/${ownerId}`);
  //       console.log("Owner data response:", response.data);

  //       setOwnerData(response.data.owner);
  //     } catch (error) {
  //       console.error("Error fetching owner data:", error);
  //     }
  //   };

  //   if (conversation.members.length > 1) {
  //     fetchOwnerData();
  //   }
  // }, [conversation]);

//   return (
    // <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
    //   {ownerData?.profilePic ? (
    //     <img
    //       className="w-16 h-16 rounded-full object-cover shadow-md"
    //       src={ownerData.profilePic}
    //       alt="Owner Profile"
    //     />
    //   ) : (
    //     <FaUserCircle size={48} className="text-gray-600" />
    //   )}
    //   <div className="ml-4 flex-1 relative">
    //     <p className="font-semibold text-gray-800 text-lg">
    //       {ownerData?.name ? ownerData.name : `User ${conversation.members[1]}`}
    //     </p>
    //     <p className="text-gray-500 text-sm mt-1 truncate">
    //       {conversation.lastMessage?.text}
    //     </p>
//         {/* Unread message indicator */}
//         {unreadMessages > 0 && (
//           <div className="absolute top-0 right-0 mt-2 mr-4 flex items-center">
//             <span className="bg-red-500 text-white text-xs font-bold rounded-full px-1 py-0.5 ml-1">
//               {unreadMessages}
//             </span>
//           </div>
//         )}
//       </div>
//       <span className="text-gray-400 text-xs flex-shrink-0">
//         {new Date(conversation.lastMessage?.createdAt).toLocaleDateString()}
//       </span>
//     </div>
//   );
// };

// export default Conversation;


// import React, { useEffect, useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import axios from "axios";
// import { USER_API } from "../../../constants";

// interface ConversationProps {
//   conversation: any;
//   currentChat: any;
//   onClick: () => void;
//   unreadMessages: number;
// }

// const Conversation: React.FC<ConversationProps> = ({
//   conversation,
//   currentChat,
//   onClick,
//   unreadMessages,
// }) => {
//   const isActive = currentChat?._id === conversation._id;

//   const [ownerData, setOwnerData] = useState<any>({});

//   useEffect(() => {
//     const fetchOwnerData = async () => {
//       try {
//         const ownerId = conversation.members[1];
//         console.log("Fetching owner data for ID:", ownerId);

//         const response = await axios.get(`${USER_API}/owner/${ownerId}`);
//         console.log("Owner data response:", response.data);

//         setOwnerData(response.data.owner);
//       } catch (error) {
//         console.error("Error fetching owner data:", error);
//       }
//     };

//     if (conversation.members.length > 1) {
//       fetchOwnerData();
//     }
//   }, [conversation]);

//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center p-2 cursor-pointer ${
//         isActive ? "bg-gray-200" : ""
//       }`}
//     >


//       <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
//       {ownerData?.profilePic ? (
//         <img
//           className="w-16 h-16 rounded-full object-cover shadow-md"
//           src={ownerData.profilePic}
//           alt="Owner Profile"
//         />
//       ) : (
//         <FaUserCircle size={48} className="text-gray-600" />
//       )}
//       <div className="ml-4 flex-1 relative">
//         <p className="font-semibold text-gray-800 text-lg">
//           {ownerData?.name ? ownerData.name : `User ${conversation.members[1]}`}
//         </p>
//         <p className="text-gray-500 text-sm mt-1 truncate">
//           {conversation.lastMessage?.text}
//         </p>

//         </div>
//         </div>


//       {unreadMessages > 0 && (
//         <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
//           {unreadMessages}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Conversation;


import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { USER_API } from "../../../constants";

interface ConversationProps {
  conversation: any;
  currentChat: any;
  onClick: () => void;
  unreadMessages: number;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  currentChat,
  onClick,
  unreadMessages,
}) => {
  const isActive = currentChat?._id === conversation._id;

  const [ownerData, setOwnerData] = useState<any>({});

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerId = conversation.members[1];
        console.log("Fetching owner data for ID:", ownerId);

        const response = await axios.get(`${USER_API}/owner/${ownerId}`);
        console.log("Owner data response:", response.data);

        setOwnerData(response.data.owner);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    if (conversation.members.length > 1) {
      fetchOwnerData();
    }
  }, [conversation]);

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-2 cursor-pointer ${
        isActive ? "bg-gray-200" : ""
      }`}
    >
      <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
        {ownerData?.profilePic ? (
          <img
            className="w-16 h-16 rounded-full object-cover shadow-md"
            src={ownerData.profilePic}
            alt="Owner Profile"
          />
        ) : (
          <FaUserCircle size={48} className="text-gray-600" />
        )}
        <div className="ml-4 flex-1 relative">
          <p className="font-semibold text-gray-800 text-lg">
            {ownerData?.name ? ownerData.name : ownerData.name}
          </p>
          <p className="text-gray-500 text-sm mt-1 truncate">
            {conversation.lastMessage?.text}
          </p>
        </div>
      </div>

      {!isActive && unreadMessages > 0 && (
        <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
          {unreadMessages}
        </div>
      )}
    </div>
  );
};

export default Conversation;
