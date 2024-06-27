import express from "express";
import { userDbRepository } from "../../../app/Interfaces/userDbRepository";
import { authService } from "../../Services/authService";
import {userRepositoryMongodb} from "../../database/mongodb/repositories/userRepositoryMongodb";
import { authServiceInterface } from "../../../app/service-interface/authServiceInrerface";
import userController from '../../../adaptors/userController'
import authenticateUser from "../Middlewares/authMiddleware";
import { venueDbRepository } from "../../../app/Interfaces/venueDbRepository";
import { venueRepositoryMongodb } from "../../database/mongodb/repositories/venueRepositoryMongodb";

const userRoutes =()=>{
    const router = express.Router();
    const controller: any= userController(
        userDbRepository,
        userRepositoryMongodb,
        authServiceInterface,
        authService,
        venueDbRepository,
        venueRepositoryMongodb
        )



    router.post("/register",controller.registerUser);
    router.post("/verify-otp",controller.VerifyOTP)
    router.post("/resend_otp", controller.resendOTP);
    router.post("/login",controller.userLogin)
    router.post("/google-signIn",controller.loginWithGoogle)
    router.post("/forgot-password",authenticateUser,controller.forgotPassword)
    router.post("/reset-password/:token",controller.resetPassword)
    router.get("/getvenues",controller.getAllVenues)

    return router;
}


export default userRoutes;