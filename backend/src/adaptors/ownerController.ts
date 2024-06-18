import { NextFunction,Request,Response } from "express";
import asynchandler from "express-async-handler";
import { ownerDbInterface } from "../app/Interfaces/ownerDbRepository";
import { ownerRepositoryMongodbType } from "../framework/database/mongodb/repositories/ownerRepositoryMongodb";
import { AuthService } from "../framework/Services/authService";
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInrerface";
import {
    ownerRegister,
    verifyOwner,
    deleteOTP
} from '../app/use-cases/owner/ownerAuth'

import { HttpStatus } from "../types/httpStatus";




const ownerController = (
    ownerDbRepository:ownerDbInterface,
    ownerRepositoryImpl:ownerRepositoryMongodbType,
    authServiceInterface:AuthServiceInterfaceType,
    authServiceImpl:AuthService
)=>{
    const dbRepositoryOwner = ownerDbRepository(ownerRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())

    //owner Register - POST Method
    const registerOwner = asynchandler(async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
       try {
        const owner  = req.body
        console.log(owner,"owner register data recieved");
        
        const {createdOwner} = await ownerRegister(owner,dbRepositoryOwner,authService)
        res.json({
            message:"Successfully Registered, please verify your mail",
            newOwner:createdOwner,
        })
       } catch (error) {
            next(error)
       }

    })


    //verify otp - POST Method

    const VerifyOTP = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const {otp,OwnerId} = req.body
            const isVerified = await verifyOwner(otp,OwnerId,dbRepositoryOwner)
            if(isVerified){
                return res.status(HttpStatus.OK)
                .json({message:"User account verified, please login"});
            }
        } catch (error) {
            next(error);
        }
    }
    //resend otp

    const resendOTP = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log('Request body:', req.body);
            const {OwnerId} = req.body
            console.log(OwnerId,"owner - resend ");
            //@ts-ignore
            await deleteOTP(OwnerId,dbRepositoryOwner,authService)
            res.json({message:"New otp sent to mail"});
        } catch (error) {
            next(error)
        }
    }


    return {
        registerOwner,
        VerifyOTP,
        resendOTP
    }
}


export default ownerController