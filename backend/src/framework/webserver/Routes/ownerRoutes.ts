import express from 'express'
import ownerController from '../../../adaptors/ownerController';
import { ownerDbRepository } from '../../../app/Interfaces/ownerDbRepository';
import { authService } from '../../Services/authService';
import { ownerRepositoryMongodb } from '../../database/mongodb/repositories/ownerRepositoryMongodb';
import { authServiceInterface } from '../../../app/service-interface/authServiceInrerface';
import { authenticateOwner } from '../Middlewares/authMiddleware';
import { venueDbRepository } from "../../../app/Interfaces/venueDbRepository";
import { venueRepositoryMongodb } from "../../database/mongodb/repositories/venueRepositoryMongodb";
import { bookingDbRepository } from "../../../app/Interfaces/bookingDbRepository";
import { bookingRepositoryMongodb } from "../../database/mongodb/repositories/bookingRepositoryMongodb";
import bookingController from "../../../adaptors/bookingController";
import { userDbRepository } from "../../../app/Interfaces/userDbRepository";
import {userRepositoryMongodb} from "../../database/mongodb/repositories/userRepositoryMongodb";
const ownerRoutes = ()=>{
    const router = express.Router();
    const controller = ownerController(
        ownerDbRepository,
        ownerRepositoryMongodb,
        authServiceInterface,
        authService,
        venueDbRepository,
        venueRepositoryMongodb,
    )

    const booking_Controller:any = bookingController(
        userDbRepository,
        userRepositoryMongodb,
        bookingDbRepository,
        bookingRepositoryMongodb
    )

    router.post('/register',controller.registerOwner);
    router.post("/owner/verify-otp",controller.VerifyOTP)
    router.post("/owner/resend_otp",controller.resendOTP)
    router.post("/login",controller.ownerLogin)
    router.post("/google-signIn",controller.OwnerLoginWithGoogle)
    router.post("/upload-venues",authenticateOwner,controller.uploadVenueHandler)
    router.get("/ownerprofile",authenticateOwner,controller.getOwnerProfile)
    router.patch("/edit-ownerprofile",authenticateOwner,controller.editOwnerProfile)
    router.get("/myvenue-list/:ownerId",authenticateOwner,controller.getVenues)
    router.get("/venue-details/:venueId",authenticateOwner,controller.getVenueDetails)
    router.patch("/update-venue/:venueId",authenticateOwner,controller.updateVenueDetails)
    router.post("/add-slots/:venueId",authenticateOwner,controller.saveTimeSlotsHandler )
    router.get('/view-slots/:venueId/:date', authenticateOwner,controller.viewAllSlotsByDate);
    router.delete('/delete-slot/:venueId', authenticateOwner,controller.deleteSlot   );


   
    router.get('/bookings/:ownerId',authenticateOwner,booking_Controller.bookingController)

     return router
}

export default ownerRoutes