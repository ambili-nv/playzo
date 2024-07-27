import express, {Application,NextFunction,Request,Response} from "express";
import expressConfig from "./framework/webserver/expressconfig";
import startServer from "./framework/webserver/server";
import connectDB from "./framework/database/mongodb/connection";
import CustomError from "./utils/customError";
import errorHandlingMiddleware from "./framework/webserver/Middlewares/errorhander.middleware";
import routes from "./framework/webserver/Routes";
import { createServer } from "http";
import { Server } from "socket.io";
import socketConfig from "./framework/webserver/webSocket/socket";

const app:Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        credentials: true,
      },
})

socketConfig(io);
expressConfig(app);
connectDB();
routes(app);
startServer(httpServer);




app.use(errorHandlingMiddleware);
app.all("*",(req, res, next: NextFunction)=>{
    next(new CustomError(`Not found : ${req.url}`, 404));
});