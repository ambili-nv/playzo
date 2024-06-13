import { Application } from "express";
import userRoutes from "./userRoute";

const routes =(app:Application)=>{
    app.use("/api/user", userRoutes());
}

export default routes;