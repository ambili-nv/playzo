import { NextFunction, Request, Response } from "express";
import asynchandler from "express-async-handler";
import { userDbInterface } from "../app/Interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb";
import { AuthService } from "../framework/Services/authService";
import { AuthServiceInterfaceType} from "../app/service-interface/authServiceInrerface";
import { UserInterface } from "../types/userInterface";
import { venueDbInterface } from "../app/Interfaces/venueDbRepository";
import { venueRepositoryMongodbType } from "../framework/database/mongodb/repositories/venueRepositoryMongodb";
import { HttpStatus } from "../types/httpStatus";
import {
     userRegister,
     verifyUser,
     deleteOTP,
     login,
     authGoogleSinginUser,
     sendVerificationCode,
     verifyTokenAndPassword
    } from '../app/use-cases/user/auth/userAuth';
import { getVenue } from "../app/use-cases/user/auth/userRead";
import { getUser,updateUser } from "../app/use-cases/user/auth/profile";


const userController = (
    userDbRepository: userDbInterface,
    userRepositoryImpl: userRepositoryMongodbType,
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl:AuthService,
    venueDbRepository:venueDbInterface,
    venueRepositoryImpl:venueRepositoryMongodbType
) => {

    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryVenue = venueDbRepository(venueRepositoryImpl())

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

    const forgotPassword = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log(req.body);
            
            const {email} = req.body
            console.log(email,"email forget password recieved");
            await sendVerificationCode (email,dbRepositoryUser,authService)
            return res.status(HttpStatus.OK).json({
                success :true,
                message:"Reset password code sent to your mail",
            });
        } catch (error) {
            next(error)
        }
    }


    const resetPassword = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {password} = req.body
            const {token} = req.params
            console.log(password,token,"token and password recieved");
            await verifyTokenAndPassword (
                token,
                password,
                dbRepositoryUser,
                authService
            )
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "Reset password success,you can login with your new password",
              });
        } catch (error) {
            next(error)
        }
    }

    const getAllVenues = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log("venue req got");
            const venues = await getVenue(dbRepositoryVenue)
            return res.status(200).json({ success: true, venues });
        } catch (error) {
            next(error)
        }
    }


    const getUserProfile = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log("userProfile req got");
            const userId = req.user.id
            console.log(userId,"got user id controller-p");
            console.log(req.user,"requser");
            const user = await getUser(
                userId,
                dbRepositoryUser,
            )
            console.log(user,"user - controller P");
            
            res.status(200).json({ success: true, user});
        } catch (error) {
            next(error)
        }
    }

    const editUserProfile = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log("edit - req");
            console.log(req.body,"reqb");
            const userId = req.user.id
            console.log(userId,"userId - edit");
            const updateData = req.body
            const user = await updateUser (userId,updateData,dbRepositoryUser)
            res.json({success:true,user,message:"profile Updated"})
            
            
        } catch (error) {
            next(error)
        }
    }


    return {
        registerUser,
        VerifyOTP,
        resendOTP,
        userLogin,
        loginWithGoogle,
        forgotPassword,
        resetPassword,
        getAllVenues,
        getUserProfile,
        editUserProfile
    }
}

export default userController;
