import { venueDbInterface } from "../app/Interfaces/venueDbRepository"
import { venueRepositoryMongodbType } from "../framework/database/mongodb/repositories/venueRepositoryMongodb"
import { userDbInterface } from "../app/Interfaces/userDbRepository"
import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb"
import { bookingDbRepositoryInterface } from "../app/Interfaces/bookingDbRepository"
import { bookingRepositoryMongodbType } from "../framework/database/mongodb/repositories/bookingRepositoryMongodb"
import { Request,Response,NextFunction } from "express"
import { HttpStatus } from "../types/httpStatus"
import { getUserbyId } from "../app/use-cases/user/auth/userAuth"
import { createBooking,createPayment } from "../app/use-cases/user/auth/booking"

const bookingController = (
    userDbRepository: userDbInterface,
    userRepositoryImpl: userRepositoryMongodbType,
    venueDbRepository:venueDbInterface,
    venueRepositoryImpl:venueRepositoryMongodbType,
    bookingDbRepository: bookingDbRepositoryInterface,
    bookingDbRepositoryImpl: bookingRepositoryMongodbType,
)=>{
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const dbRepositoryVenue = venueDbRepository(venueRepositoryImpl());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());

    // const bookAppoinment = async (req: Request, res: Response, next: NextFunction)=>{
    //     try {
    //         const data = req.body;
    //         console.log(data,"data p");
    //         const userId = req.user.id;
    //         console.log(userId,"user p");
            

    //         const createBooking = await createBooking(
    //             data,
    //             userId,
    //             dbBookingRepository,
    //             dbRepositoryVenue
    //         )
    //     } catch (error) {
            
    //     }
    // }

     const bookVenue = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const userId = req.user.id;
    
            // const checkBooking = await checkIsBooked(data, userId);
    
            // if (checkBooking) {
            //     return res.status(HttpStatus.OK).json({
            //         success: false,
            //         message: "Slot already booked. Please select another slot.",
            //     });
            // }
    
            const booking = await createBooking(data, userId,dbBookingRepository);
            console.log(booking,"bookingggggggggggg");
            
    
            const user = await getUserbyId(userId,dbRepositoryUser);
            console.log(user,"userrrrrrrrrrrrrrrrrrrrrrrrrrrr");
            
            // console.log(user.name);
            
            
            //@ts-ignore
            const sessionId = await createPayment(user.name, user.email, booking.id, booking.fees);
    
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Booking created successfully",
                sessionId,
            });
        } catch (error) {
            next(error);
        }
    };

    return {
        bookVenue,
    }
}


export default bookingController