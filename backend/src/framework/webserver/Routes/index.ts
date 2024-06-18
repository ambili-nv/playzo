import { Application } from "express";
import userRoutes from "./userRoute";
import ownerRoutes from './ownerRoutes'
import adminRoutes from "./adminRoute";

const routes =(app:Application)=>{
    app.use("/api/user", userRoutes());
    app.use("/api/owner", ownerRoutes())
    app.use("/api/admin", adminRoutes())
}

export default routes;