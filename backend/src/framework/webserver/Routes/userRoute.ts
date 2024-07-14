import express from "express";
import { userDbRepository } from "../../../app/Interfaces/userDbRepository";
import { authService } from "../../Services/authService";
import {userRepositoryMongodb} from "../../database/mongodb/repositories/userRepositoryMongodb";
import { authServiceInterface } from "../../../app/service-interface/authServiceInrerface";
import userController from '../../../adaptors/userController'
import { venueDbRepository } from "../../../app/Interfaces/venueDbRepository";
import { venueRepositoryMongodb } from "../../database/mongodb/repositories/venueRepositoryMongodb";
import { authenticateUser } from "../Middlewares/authMiddleware";
import bookingController from "../../../adaptors/bookingController";
import { bookingDbRepository } from "../../../app/Interfaces/bookingDbRepository";
import { bookingRepositoryMongodb } from "../../database/mongodb/repositories/bookingRepositoryMongodb";
const userRoutes =()=>{
    const router = express.Router();
    const controller: any= userController(
        userDbRepository,
        userRepositoryMongodb,
        authServiceInterface,
        authService,
        venueDbRepository,
        venueRepositoryMongodb
        );


        const booking_Controller:any = bookingController(
            userDbRepository,
            userRepositoryMongodb,
            bookingDbRepository,
            bookingRepositoryMongodb
        )



    router.post("/register",controller.registerUser);
    router.post("/verify-otp",controller.VerifyOTP)
    router.post("/resend_otp", controller.resendOTP);
    router.post("/login",controller.userLogin)
    router.post("/google-signIn",controller.loginWithGoogle)
    router.post("/forgot-password",controller.forgotPassword)
    router.post("/reset-password/:token",controller.resetPassword)
    router.get("/getvenues",controller.getAllVenues)
    router.get("/profile",authenticateUser,controller.getUserProfile)
    router.patch("/edit-profile",authenticateUser,controller.editUserProfile)
    router.get("/single-venue/:venueId",controller.getSingleVenue)
    router.get('/get-slots/:venueId/:date', controller.viewSlotsByDate);



    router.post('/create-checkout-session',authenticateUser,booking_Controller.bookVenue)
    router.patch('/payment/status/:id',authenticateUser,booking_Controller.updateStatus)
    router.get('/booking-history',authenticateUser,booking_Controller.getBookingHistory)
    

    return router;
}


export default userRoutes;