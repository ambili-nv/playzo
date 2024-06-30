import { NextFunction,Request,Response } from "express";
import asynchandler from "express-async-handler";
import { ownerDbInterface } from "../app/Interfaces/ownerDbRepository";
import { ownerRepositoryMongodbType } from "../framework/database/mongodb/repositories/ownerRepositoryMongodb";
import { AuthService } from "../framework/Services/authService";
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInrerface";
import {
    ownerRegister,
    verifyOwner,
    deleteOTP,
    login,
    authGoogleSigninOwner,
    getOwner,
    updateOwner
} from '../app/use-cases/owner/ownerAuth'

import { uploadVenue,findVenues } from "../app/use-cases/owner/venueUpload";

import { HttpStatus } from "../types/httpStatus";
import { venueDbInterface } from "../app/Interfaces/venueDbRepository";
import { venueRepositoryMongodbType } from "../framework/database/mongodb/repositories/venueRepositoryMongodb";



const ownerController = (
    ownerDbRepository:ownerDbInterface,
    ownerRepositoryImpl:ownerRepositoryMongodbType,
    authServiceInterface:AuthServiceInterfaceType,
    authServiceImpl:AuthService,
    venueDbRepository:venueDbInterface,
    venueDbRepositoryImpl:venueRepositoryMongodbType
)=>{
    const dbRepositoryOwner = ownerDbRepository(ownerRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())
    const dbVenueRepository = venueDbRepository(venueDbRepositoryImpl());
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


    // Login - POST Method

    const ownerLogin = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            // const {accessToken,isEmailExist} = await login(
            const {accessToken,isEmailExist} = await login(
                req.body,
                dbRepositoryOwner,
                authService
            );

            res.status(HttpStatus.OK)
            .json({message:"Successfully login", owner: isEmailExist,
             accessToken:accessToken
             })  
        } catch (error) {
            next(error)
        }
    }

    const OwnerLoginWithGoogle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const ownerData = req.body
            console.log(ownerData,"Owner data recieved");
            const {accessToken, isEmailExist,createdOwner} = await authGoogleSigninOwner(
                ownerData,
                dbRepositoryOwner,
                authService
            )
            const owner = isEmailExist ? isEmailExist : createdOwner;
            res.status(HttpStatus.OK).json({ message: "login success", owner, accessToken: accessToken}); 
        } catch(error){
            next(error)
        }
    }




    const uploadVenueHandler = asynchandler(async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {  venueData } = req.body;
            const ownerId = venueData.ownerId
            console.log(ownerId,"owner id - ownnercontroller");
            
            const place = venueData.place
            console.log(typeof place,"location type");
            
            console.log(venueData, "venue data received");

            const newVenue = await uploadVenue(ownerId, venueData, dbRepositoryOwner);
            res.status(HttpStatus.CREATED).json({
                message: "Venue uploaded successfully",
                venue: newVenue,
            });
        } catch (error) {
            next(error);
        }
    });

    const getOwnerProfile= async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log("OWner Profile - req");
            const ownerId = req.owner.id
            console.log(ownerId,"ownerid get");
            
            const owner = await getOwner(
                ownerId,
                dbRepositoryOwner
            )
            console.log(owner,"owner from db");
            
            res.status(200).json({ success: true, owner});
        } catch (error) {
            next(error)
        }
    }

    const editOwnerProfile = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log("Edit - req got");
            console.log(req.body,"req b");
            const ownerId = req.owner.id
            const updateData = req.body
            const owner = await updateOwner(ownerId,updateData,dbRepositoryOwner)
            res.json({success:true,owner,message:"profile Updated"})
        } catch (error) {
            next(error)
        }
    }

    const getVenues = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log("get req");
            const ownerId = req.params.ownerId
            console.log(ownerId,"ownerId - contr");
            const venues = await findVenues(dbVenueRepository,ownerId)
            console.log(venues,"venue - owner - get from db");
            
            return res.status(HttpStatus.OK).json({ success: true, venues });
        } catch (error) {
            
        }
    }



    return {
        registerOwner,
        VerifyOTP,
        resendOTP,
        ownerLogin,
        OwnerLoginWithGoogle,
        uploadVenueHandler,
        getOwnerProfile,
        editOwnerProfile,
        getVenues
    }
}


export default ownerController