import { Application } from "express";
import userRoutes from "./userRoute";
import ownerRoutes from './ownerRoutes'
import adminRoutes from "./adminRoute";
import chatRoutes from "./chatRoute";

const routes =(app:Application)=>{
    app.use("/api/user", userRoutes());
    app.use("/api/owner", ownerRoutes());
    app.use("/api/admin", adminRoutes());
    app.use("/api/chat",chatRoutes());
}

export default routes;