// import { NextFunction,Request,Response } from "express";
// import asynchandler from "express-async-handler";

// import{userRegister} from '../app/use-cases/user/auth/userAuth';


// import { userDbInterface } from "../app/Interfaces/userDbRepository";
// import { UserInterface } from "../types/userInterface";
// import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb";


// const userController = (
//     userDbRepository: userDbInterface,
//     userRepositoryImpl: userRepositoryMongodbType,
// )=>{

//     const dbRepositoryUser = userDbRepository(userRepositoryImpl());

//         // Register User POST - Method
    
//         const registerUser = async(
//             req:Request,
//             res:Response,
//             next:NextFunction
//         )=>{
//             try {
//              const user = req.body;
//              console.log(req.body,"oooooo");

//              //@ts-ignore
//              const {createdUser} = await userRegister(user,dbRepositoryUser);
//              res.json({
//                 message: "User registration successful,please verify email",
//                 newUser: createdUser,
                
//              });
//             } catch (error) {
//                 next(error);
//             }
//         };

//         return{
//             registerUser,
//         }

// }

// export default userController




import { NextFunction, Request, Response } from "express";
import asynchandler from "express-async-handler";
import { userRegister } from '../app/use-cases/user/auth/userAuth';
import { userDbInterface } from "../app/Interfaces/userDbRepository";
import { UserInterface } from "../types/userInterface";
import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb";

const userController = (
    userDbRepository: userDbInterface,
    userRepositoryImpl: userRepositoryMongodbType,
) => {

    const dbRepositoryUser = userDbRepository(userRepositoryImpl());

    // Register User POST - Method
    const registerUser = asynchandler(async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user: UserInterface = req.body;

            //@ts-ignore
            const { createdUser } = await userRegister(user, dbRepositoryUser);
            res.json({
                message: "User registration successful, please verify email",
                newUser: createdUser,
            });
        } catch (error) {
            next(error);
        }
    });

    return {
        registerUser,
    }
}

export default userController;
