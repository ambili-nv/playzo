import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import { AuthService } from "../framework/Services/authService";
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInrerface";
import { userDbInterface } from "../app/Interfaces/userDbRepository";
import { ownerDbInterface } from "../app/Interfaces/ownerDbRepository";
import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb";
import { ownerRepositoryMongodbType } from "../framework/database/mongodb/repositories/ownerRepositoryMongodb";
import { login } from "../app/use-cases/Admin/adminAuth";
import { getUsers } from "../app/use-cases/Admin/adminRead";
import { userBlock,OwnerBlock } from "../app/use-cases/Admin/adminUpdate";
import { getOwners } from "../app/use-cases/Admin/adminRead";
import { venueRepositoryMongodbType } from "../framework/database/mongodb/repositories/venueRepositoryMongodb";
import { venueDbInterface } from "../app/Interfaces/venueDbRepository";
import { getVenues } from "../app/use-cases/Admin/adminRead";
import { acceptVenue,rejectVenue} from "../app/use-cases/Admin/adminUpdate";

const adminController = (
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl: AuthService,
    userDbRepository:userDbInterface,
    userDbRepositoryImpl: userRepositoryMongodbType,
    ownerDbRepository:ownerDbInterface,
    ownerDbRepositoryImpl:ownerRepositoryMongodbType,
    venueDbRepository:venueDbInterface,
    venueDbRepositoryImpl:venueRepositoryMongodbType


) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbOwnerRepository = ownerDbRepository(ownerDbRepositoryImpl())
    const dbVenueRepository = venueDbRepository(venueDbRepositoryImpl());

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

    // const getAllUsers = async(req:Request,res:Response,next:NextFunction)=>{
    //     console.log("request got");
        
    //     const users = await getUsers(dbUserRepository)
    //     console.log(users,"users in adminController");
        
    //     return res.status(HttpStatus.OK).json({ success: true, users });
    // }

    const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        console.log("request got");
    
        const { page = 1, limit = 6 } = req.query; // Default to page 1 and limit 10 if not provided
    
        try {
            const usersData = await getUsers(dbUserRepository, parseInt(page as string), parseInt(limit as string));
            // console.log(usersData.users, "users in adminController");
    
            return res.status(HttpStatus.OK).json({ success: true, ...usersData });
        } catch (error) {
            console.error("Error in getAllUsers controller:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error fetching users' });
        }
    };







    // const getAllOwners = async(req:Request,res:Response,next:NextFunction)=>{
    //     console.log("request got - owners");

    //     const owners = await getOwners(dbOwnerRepository)
    //     console.log(owners,"owners in adminController");
        
    //     return res.status(HttpStatus.OK).json({success:true,owners})
    // }


    const getAllOwners = async (req: Request, res: Response, next: NextFunction) => {
        console.log("request got - owners");
    
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
    //@ts-ignore
        const { allOwners, totalOwners } = await getOwners(dbOwnerRepository, page, limit);
        console.log(allOwners, "owners in adminController");
    
        return res.status(HttpStatus.OK).json({ success: true, owners: allOwners, totalOwners, currentPage: page, totalPages: Math.ceil(totalOwners / limit) });
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

    const blockOwner = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {id} = req.params
            console.log(id,"owner-block, id");
            const updatedOwner = await OwnerBlock(id,dbOwnerRepository);
            return res.status(HttpStatus.OK).json({
                success:true,
                message:"Status updated Successfully",
                owner:updatedOwner
            })
            
        } catch (error) {
            next(error)
        }
    }

    const getVenuesByOwner = async(req:Request,res:Response,next:NextFunction)=>{
        // try {
        //     console.log(req.params,"req-paramsa");
            
        //     const ownerId = req.params.ownerId
        //     console.log(ownerId,"owner id,venues- controller ");

        //     const venues = await getVenues(dbVenueRepository,ownerId)
        //     console.log(venues,"venues controller");
            
        //     return res.status(HttpStatus.OK).json({ success: true, venues });
            
        // } catch (error) {
        //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error: 'Failed to fetch venues' });
        // }

        try {
            const ownerId = req.params.ownerId;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
    
            const venues = await getVenues(dbVenueRepository, ownerId, page, limit);
    
            return res.status(HttpStatus.OK).json({ success: true, venues });
        } catch (error) {
            next(error);
        }
    }

    const handleAccept = async(req:Request,res:Response,next:NextFunction)=>{
        console.log(req.params,"reqparams id - con");
        
        const venueId = req.params.venueId
        console.log(venueId,"venue id - con");

        try {
            const { venue, ownerEmail } = await acceptVenue(venueId,dbVenueRepository,dbOwnerRepository);
            res.json({
                message: `Venue '${venue.name}' accepted successfully.`,
                venue,
                ownerEmail
            });
        } catch (error) {
            next(error);
        }
        
    }


     const handleReject = async (req: Request, res: Response, next: NextFunction) => {
        const { venueId } = req.params;
    
        try {
            const { venue, ownerEmail } = await rejectVenue(
                venueId, 
                dbVenueRepository, 
                dbOwnerRepository
            );
            res.status(200).json({
                message: 'Venue rejected successfully',
                venue,
                ownerEmail
            });
        } catch (error) {
            next(error);
        }
    };



    return {
        adminLogin,
        getAllUsers,
        blockUser,
        getAllOwners,
        blockOwner,
        getVenuesByOwner,
        handleAccept,
        handleReject,
    };
};

export default adminController;
