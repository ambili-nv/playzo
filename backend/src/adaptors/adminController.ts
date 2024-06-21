import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import { AuthService } from "../framework/Services/authService";
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInrerface";
import { userDbInterface } from "../app/Interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb";
import { login } from "../app/use-cases/Admin/adminAuth";
import { getUsers } from "../app/use-cases/Admin/adminRead";
import { userBlock } from "../app/use-cases/Admin/adminUpdate";

const adminController = (
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl: AuthService,
    userDbRepository:userDbInterface,
    userDbRepositoryImpl: userRepositoryMongodbType,

) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());

    const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const accessToken = await login(email, password, authService);
            res.status(HttpStatus.OK).json({
                message: "Successfully login",
                accessToken: accessToken,
                admin: { name: "Admin User", role: "admin" }
            });
        } catch (error) {
            next(error);
        }
    };

    const getAllUsers = async(req:Request,res:Response,next:NextFunction)=>{
        console.log("request got");
        
        const users = await getUsers(dbUserRepository)
        console.log(users,"users in adminController");
        
        return res.status(HttpStatus.OK).json({ success: true, users });
    }


    const blockUser = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {id} = req.params
            console.log(id,"user-block ID");
    
            const updatedUser = await userBlock(id,dbUserRepository);
            return res.status(HttpStatus.OK).json({
                success: true,
                message: "User block status updated successfully",
                user:updatedUser,
              });
        } catch (error) {
            next(error)
        }
    }

    return {
        adminLogin,
        getAllUsers,
        blockUser
    };
};

export default adminController;
