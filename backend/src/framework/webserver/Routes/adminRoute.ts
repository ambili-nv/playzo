import express from "express";
import { authService } from "../../Services/authService";
import { authServiceInterface } from "../../../app/service-interface/authServiceInrerface";

import adminController from "../../../adaptors/adminController";
import { userDbRepository } from "../../../app/Interfaces/userDbRepository";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { ownerDbRepository } from "../../../app/Interfaces/ownerDbRepository";
import { ownerRepositoryMongodb } from "../../database/mongodb/repositories/ownerRepositoryMongodb";
import { venueDbRepository } from "../../../app/Interfaces/venueDbRepository";
import { venueRepositoryMongodb } from "../../database/mongodb/repositories/venueRepositoryMongodb";


const adminRoutes =()=>{
    const router = express.Router();
    const controller: any= adminController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb,
        ownerDbRepository,
        ownerRepositoryMongodb,
        venueDbRepository,
        venueRepositoryMongodb
        )
    
        router.post("/login",controller.adminLogin)
        router.get("/users",controller.getAllUsers)
        router.patch("/block-user/:id",controller.blockUser)
        router.get("/owners",controller.getAllOwners)
        router.get("/venues/:ownerId",controller.getVenuesByOwner)
        router.patch("/block-owner/:id",controller.blockOwner)
        router.post("/accept-venues/:venueId",controller.handleAccept)
        router.post("/reject-venues/:venueId",controller.handleReject)



    return router;
}


export default adminRoutes;