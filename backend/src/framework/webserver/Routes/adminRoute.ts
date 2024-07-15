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
import bookingController from "../../../adaptors/bookingController";
import { bookingDbRepository } from "../../../app/Interfaces/bookingDbRepository";
import { bookingRepositoryMongodb } from "../../database/mongodb/repositories/bookingRepositoryMongodb";

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


        const booking_Controller:any = bookingController(
            userDbRepository,
            userRepositoryMongodb,
            bookingDbRepository,
            bookingRepositoryMongodb
        )
    
        router.post("/login",controller.adminLogin)
        router.get("/users",authenticateAdmin,controller.getAllUsers)
        router.patch("/block-user/:id",authenticateAdmin,controller.blockUser)
        router.get("/owners",authenticateAdmin,controller.getAllOwners)
        router.patch("/block-owner/:id",authenticateAdmin,controller.blockOwner)
        router.get("/venues/:ownerId",authenticateAdmin,controller.getVenuesByOwner)
        router.post("/accept-venues/:venueId",authenticateAdmin,controller.handleAccept)
        router.post("/reject-venues/:venueId",authenticateAdmin,controller.handleReject)



        router.get('/bookings/user/:userId',authenticateAdmin,booking_Controller.adminBookingHistory)



    return router;
}


export default adminRoutes;