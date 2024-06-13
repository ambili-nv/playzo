import express, {Application,NextFunction,Request,Response} from "express";
import expressConfig from "./framework/webserver/expressconfig";
import startServer from "./framework/webserver/server";
import connectDB from "./framework/database/mongodb/connection";
import CustomError from "./utils/customError";
import errorHandlingMiddleware from "./framework/webserver/Middlewares/errorhander.middleware";
import routes from "./framework/webserver/Routes";
import { createServer } from "http";

import path from "path";


const app:Application = express();

const httpServer = createServer(app);


expressConfig(app);
connectDB();
routes(app);
startServer(httpServer);




app.use(errorHandlingMiddleware);
app.all("*",(req, res, next: NextFunction)=>{
    next(new CustomError(`Not found : ${req.url}`, 404));
});