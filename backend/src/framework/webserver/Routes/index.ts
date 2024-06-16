import { Application } from "express";
import userRoutes from "./userRoute";
import ownerRoutes from './ownerRoutes'

const routes =(app:Application)=>{
    app.use("/api/user", userRoutes());
    app.use("/api/owner", ownerRoutes())
}

export default routes;