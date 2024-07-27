import {Server} from "socket.io"

interface SocketUserInterface {
    userId: string;
    socketId: any;
  }

  const socketConfig = (io: Server) => {
    let users: SocketUserInterface[] = [];

    io.on("connection", (socket) => {
        console.log("User connected");
    })


}

export default socketConfig;