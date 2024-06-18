import express from "express";
import { authService } from "../../Services/authService";
import { authServiceInterface } from "../../../app/service-interface/authServiceInrerface";

import adminController from "../../../adaptors/adminController";


const adminRoutes =()=>{
    const router = express.Router();
    const controller: any= adminController(
        authServiceInterface,
        authService,
        )
    
        router.post("/login",controller.adminLogin)



    return router;
}


export default adminRoutes;