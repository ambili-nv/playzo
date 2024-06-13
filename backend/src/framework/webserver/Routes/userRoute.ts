import express from "express";
import userController from '../../../adaptors/userController'
import { userDbRepository } from "../../../app/Interfaces/userDbRepository";
import {userRepositoryMongodb} from "../../database/mongodb/repositories/userRepositoryMongodb";


const userRoutes =()=>{
    const router = express.Router();

    const controller: any= userController(
        userDbRepository,
        userRepositoryMongodb,
    )



    router.post("/register",controller.registerUser);




    return router;
}


export default userRoutes;