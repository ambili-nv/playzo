// import { NextFunction,Request,Response } from "express";
// import { HttpStatus } from "../types/httpStatus";
// import { AuthService} from "../framework/Services/authService";
// import { AuthServiceInterfaceType} from "../app/service-interface/authServiceInrerface";
// import { login } from "../app/use-cases/Admin/adminAuth";

// const adminController = (
//     authServiceInterface : AuthServiceInterfaceType,
//     authServiceImpl : AuthService
// )=>{
//     const authService = authServiceInterface(authServiceImpl());

//     const adminLogin = async(req:Request,res:Response,next:NextFunction)=>{
//         try {
//             const {email,password} = req.body
//             const accessToken = await login(
//                 email,
//                 password,
//                 authService
//             )
//             res.status(HttpStatus.OK)
//             .json({message:"Successfully login",accessToken:accessToken,admin: { name: "Admin User", role: "admin" }})
//         } catch (error) {
//             next(error)
//         }
    
    
//         return {
//             adminLogin
//         }
//     }

// }



// export default adminController












import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import { AuthService } from "../framework/Services/authService";
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInrerface";
import { login } from "../app/use-cases/Admin/adminAuth";

const adminController = (
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl: AuthService
) => {
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

    return {
        adminLogin
    };
};

export default adminController;
