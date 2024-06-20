import { NextFunction, Request, Response } from "express";
import asynchandler from "express-async-handler";
import { userDbInterface } from "../app/Interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb";
import { AuthService } from "../framework/Services/authService";
import { AuthServiceInterfaceType} from "../app/service-interface/authServiceInrerface";
import { UserInterface } from "../types/userInterface";
import { HttpStatus } from "../types/httpStatus";
import {
     userRegister,
     verifyUser,
     deleteOTP,
     login,
     authGoogleSinginUser
    } from '../app/use-cases/user/auth/userAuth';


const userController = (
    userDbRepository: userDbInterface,
    userRepositoryImpl: userRepositoryMongodbType,
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl:AuthService,
) => {

    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());

    // Register User POST - Method
    const registerUser = asynchandler(async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user: UserInterface = req.body;            
            //@ts-ignore
            const { createdUser } = await userRegister(user, dbRepositoryUser,authService);
           
            
            res.json({
                message: "User registration successful, please verify email",
                newUser: createdUser,
            });
        } catch (error) {
            next(error);
        }
    });

    //VerifyOTP - POST Method

    const VerifyOTP = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const {otp,userId} = req.body
            const isVerified = await verifyUser(otp,userId,dbRepositoryUser)
            if(isVerified){
                return res.status(HttpStatus.OK)
                .json({message:"User account verified, please login"});
            }
        } catch (error) {
            next(error);
        }
    }

    //resend otp - POST MEthod

    const resendOTP = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,"user otp");
            const {userId} = req.body;
            console.log(userId,"resend otp - user");
            
            await deleteOTP(userId,dbRepositoryUser,authService);
            res.json({message:"New otp sent to mail"});
        }catch(error){
            next(error);
        }
    };

    //userLogin - POST Method

    const userLogin = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {accessToken,isEmailExist} = await login(
                req.body,
                dbRepositoryUser,
                authService
            );

            res.status(HttpStatus.OK)
               .json({message:"Successfully login", user: isEmailExist,
                accessToken:accessToken
                })
        } catch (error) {
            next(error)
        }
    }

    const loginWithGoogle = async(req:Request,res:Response,next:NextFunction)=>{
        try {
        const userData = req.body
        console.log(userData,"got useData");
        const {isEmailExist,createdUser} = await authGoogleSinginUser(
        // const {isEmailExist,createdUser} = await authGoogleSinginUser(
            userData,
            dbRepositoryUser,
            // authService
        )
        const user = isEmailExist ? isEmailExist : createdUser;
        res.status(HttpStatus.OK).json({ message: "login success", user,}); 
        } catch (error) {
            
        }


    }



    return {
        registerUser,
        VerifyOTP,
        resendOTP,
        userLogin,
        loginWithGoogle
    }
}

export default userController;
