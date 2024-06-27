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
import { authenticateAdmin } from "../Middlewares/authMiddleware";

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
        router.get("/users",authenticateAdmin,controller.getAllUsers)
        router.patch("/block-user/:id",authenticateAdmin,controller.blockUser)
        router.get("/owners",authenticateAdmin,controller.getAllOwners)
        router.patch("/block-owner/:id",authenticateAdmin,controller.blockOwner)
        router.get("/venues/:ownerId",authenticateAdmin,controller.getVenuesByOwner)
        router.post("/accept-venues/:venueId",authenticateAdmin,controller.handleAccept)
        router.post("/reject-venues/:venueId",authenticateAdmin,controller.handleReject)



    return router;
}


export default adminRoutes;