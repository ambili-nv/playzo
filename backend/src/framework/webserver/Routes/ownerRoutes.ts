import express from 'express'
import ownerController from '../../../adaptors/ownerController';
import { ownerDbRepository } from '../../../app/Interfaces/ownerDbRepository';
import { authService } from '../../Services/authService';
import { ownerRepositoryMongodb } from '../../database/mongodb/repositories/ownerRepositoryMongodb';
import { authServiceInterface } from '../../../app/service-interface/authServiceInrerface';
const ownerRoutes = ()=>{
    const router = express.Router();
    const controller = ownerController(
        ownerDbRepository,
        ownerRepositoryMongodb,
        authServiceInterface,
        authService,
    )

    router.post('/register',controller.registerOwner);
    router.post("/owner/verify-otp",controller.VerifyOTP)
    router.post("/owner/resend_otp",controller.resendOTP)
    router.post("/login",controller.ownerLogin)
    router.post("/google-signIn",controller.OwnerLoginWithGoogle)

    return router
}

export default ownerRoutes