import express from "express";
import { authService } from "../../Services/authService";
import { authServiceInterface } from "../../../app/service-interface/authServiceInrerface";

import adminController from "../../../adaptors/adminController";
import { userDbRepository } from "../../../app/Interfaces/userDbRepository";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";


const adminRoutes =()=>{
    const router = express.Router();
    const controller: any= adminController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb
        )
    
        router.post("/login",controller.adminLogin)
        router.get("/users",controller.getAllUsers)
        router.patch("/block-user/:id",controller.blockUser)



    return router;
}


export default adminRoutes;