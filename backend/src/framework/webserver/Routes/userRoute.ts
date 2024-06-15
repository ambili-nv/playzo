import express from "express";
import { userDbRepository } from "../../../app/Interfaces/userDbRepository";
import { authService } from "../../Services/authService";
import {userRepositoryMongodb} from "../../database/mongodb/repositories/userRepositoryMongodb";
import { authServiceInterface } from "../../../app/service-interface/authServiceInrerface";
import userController from '../../../adaptors/userController'

const userRoutes =()=>{
    const router = express.Router();
    const controller: any= userController(
        userDbRepository,
        userRepositoryMongodb,
        authServiceInterface,
        authService,
        )



    router.post("/register",controller.registerUser);
    router.post("/verify-otp",controller.VerifyOTP)
    router.post("/resend_otp", controller.resendOTP);




    return router;
}


export default userRoutes;