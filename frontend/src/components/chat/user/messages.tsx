// import React from "react";

// interface MessageProps {
//   message: {
//     senderId: string;
//     text: string;
//     createdAt: string;
//   };
//   own: boolean;
// }

// const Message: React.FC<MessageProps> = ({ message, own }) => {
//   return (
//     <div className={`flex ${own ? "justify-end" : "justify-start"} mb-3`}>
//       <div
//         className={`max-w-xs p-3 rounded-lg ${
//           own ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
//         }`}
//       >
//         {message.text}
//       </div>
//     </div>
//   );
// };

// export default Message;




import React from "react";

interface MessageProps {
  message: {
    senderId: string;
    text: string;
    createdAt: string;
  };
  own: boolean;
}

const Message: React.FC<MessageProps> = ({ message, own }) => {
  return (
    <div
      className={`flex ${own ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg ${
          own ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default Message;
