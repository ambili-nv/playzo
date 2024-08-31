// import { Server } from "socket.io";

// interface SocketUserInterface {
//   userId: string;
//   socketId: string;
// }

// const socketConfig = (io: Server) => {
//   let users: SocketUserInterface[] = [];

//   function addUser(userId: string, socketId: string) {
//     const isUserPresent = users.some((user) => user.userId === userId);
//     if (!isUserPresent) {
//       users.push({ userId, socketId });
//       console.log(`Added user ${userId} with socketId ${socketId}`);
//     } else {
//       console.log(`User ${userId} is already present`);
//     }
//   }

//   function removeUser(socketId: string) {
//     users = users.filter((user) => user.socketId !== socketId);
//     console.log(`Removed user with socketId ${socketId}`);
//   }

//   function getUser(userId: string) {
//     return users.find((user) => user.userId === userId);
//   }

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     socket.on("addUser", (userId) => {
//       addUser(userId, socket.id);
//       io.emit("getUsers", users);
//       console.log(`User ${userId} added with socketId ${socket.id}`);  
//     });

//     socket.on("sendMessage", ({ senderId, receiverId, text, conversationId }) => {
//       const user = getUser(receiverId);
// console.log(senderId,receiverId,"idssss");

//       //@ts-ignore
//       io.to(user?.socketId).emit("getMessage", {
//         senderId,
//         text,
//         conversationId,
//       });

//       // Emit an event to update the last message
//       io.emit("updateLastMessage", { conversationId: conversationId, lastMessage: { text, senderId, createdAt: Date.now() } });


//       if (user) {
//         console.log(`Sending notification to ${receiverId}:`, {
//           senderId,
//           text,
//           conversationId,
//           timestamp: Date.now(),
//         });
//         io.to(user.socketId).emit("newNotification", {
//           senderId,
//           text,
//           conversationId,
//           timestamp: Date.now(),
//         });
//       } else {
//         console.log(`User ${receiverId} not found`);
//         console.log('Current users:', users);
//       }
//     });

//     socket.on("disconnect", () => {
//       removeUser(socket.id);
//       console.log("User disconnected:", socket.id);
//       io.emit("getUsers", users);
//     });
//   });
// };

// export default socketConfig;



import { Server } from "socket.io";

interface SocketUserInterface {
  userId: string;
  socketId: string;
}

const socketConfig = (io: Server) => {
  let users: SocketUserInterface[] = [];

  function addUser(userId: string, socketId: string) {
    const isUserPresent = users.some((user) => user.userId === userId);
    if (!isUserPresent) {
      users.push({ userId, socketId });
      console.log(`Added user ${userId} with socketId ${socketId}`);
    } else {
      console.log(`User ${userId} is already present`);
    }
  }

  function removeUser(socketId: string) {
    users = users.filter((user) => user.socketId !== socketId);
    console.log(`Removed user with socketId ${socketId}`);
  }

  function getUser(userId: string) {
    return users.find((user) => user.userId === userId);
  }

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
      console.log(`User ${userId} added with socketId ${socket.id}`);  
    });

    socket.on("sendMessage", ({ senderId, receiverId, text, conversationId }) => {
      const user = getUser(receiverId);
      console.log(senderId, receiverId, "idssss");

      //@ts-ignore
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
        conversationId,
      });

      // Emit an event to update the last message
      io.emit("updateLastMessage", { conversationId: conversationId, lastMessage: { text, senderId, createdAt: Date.now() } });

      if (user) {
        console.log(`Sending notification to ${receiverId}:`, {
          senderId,
          text,
          conversationId,
          timestamp: Date.now(),
        });
        io.to(user.socketId).emit("newNotification", {
          senderId,
          text,
          conversationId,
          timestamp: Date.now(),
        });
      } else {
        console.log(`User ${receiverId} not found`);
        console.log('Current users:', users);
      }
    });

    // socket.on("sendBookingNotification", ({ senderId, receiverId, text, bookingId }) => {
    //   const user = getUser(receiverId); 
    //   console.log(senderId, receiverId, "idssss");
    //   console.log(user, "idssss");

    //   if (user) {
    //     console.log(`Sending booking notification to ${receiverId}:`, {
    //       senderId,
    //       text,
    //       bookingId,
    //       timestamp: Date.now(),
    //     });
    //     io.to(user.socketId).emit("newBookingNotification", {
    //       senderId,
    //       text,
    //       bookingId,
    //       timestamp: Date.now(),
    //     });
    //   } else {
    //     console.log(`User ${receiverId} not found`);
    //     console.log('Current users:', users);
    //   }
    // });

    socket.on("sendBookingNotification", ({ senderId, receiverId, text, bookingId }) => {
      const user = getUser(receiverId);
      console.log(`Sender: ${senderId}, Receiver: ${receiverId}`, "IDs");
      console.log(user, "User Object");

      if (user) {
          console.log(`Sending booking notification to ${receiverId}:`, {
              senderId,
              text,
              bookingId,
              timestamp: Date.now(),
          });
          io.to(user.socketId).emit("newBookingNotification", {
              senderId,
              text,
              bookingId,
              timestamp: Date.now(),
          });
      } else {
          console.log(`User ${receiverId} not found`);
          console.log('Current users:', users);
      }
  });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log("User disconnected:", socket.id);
      io.emit("getUsers", users);
    });
  });
};

export default socketConfig;
