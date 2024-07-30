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

const Conversation: React.FC<ConversationProps> = ({ conversation,lastMessage }) => {
  // console.log("Conversation component rendered");
  const [ownerData, setOwnerData] =  useState<any>({})

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerId = conversation.members[1];
        // console.log("Fetching owner data for ID:", ownerId);

        const response = await axios.get(`${USER_API}/owner/${ownerId}`);
        // console.log("Owner data response:", response.data);

        setOwnerData(response.data.owner);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    if (conversation.members.length > 1) {
      fetchOwnerData();
    }
  }, [conversation]);
  // console.log(ownerData,"ownerData//");
  

  return (
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
      <div className="ml-4 flex-1">
        <p className="font-semibold text-gray-800 text-lg">
          {ownerData?.name ? ownerData.name : `User ${conversation.members[1]}`}
        </p>
        <p className="text-gray-500 text-sm mt-1 truncate">
          {conversation.lastMessage?.text}
        </p>
      </div>
      <span className="text-gray-400 text-xs flex-shrink-0">
        {new Date(conversation.lastMessage?.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default Conversation;
