import { userDbInterface } from "../app/Interfaces/userDbRepository"
import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb"
import { bookingDbRepositoryInterface } from "../app/Interfaces/bookingDbRepository"
import { bookingRepositoryMongodbType } from "../framework/database/mongodb/repositories/bookingRepositoryMongodb"
import { Request,Response,NextFunction } from "express"
import { HttpStatus } from "../types/httpStatus"
import { getUserbyId } from "../app/use-cases/user/auth/userAuth"
import { createBooking,createPayment,updateSlotStatus } from "../app/use-cases/user/auth/booking"

// const bookingController = (
//     userDbRepository: userDbInterface,
//     userRepositoryImpl: userRepositoryMongodbType,
//     bookingDbRepository: bookingDbRepositoryInterface,
//     bookingDbRepositoryImpl: bookingRepositoryMongodbType,
// )=>{
//     const dbRepositoryUser = userDbRepository(userRepositoryImpl());
//     const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());




//     const bookVenue = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//           const data = req.body;
//           const userId = req.user.id;
      
//           const booking = await createBooking(data, userId, dbBookingRepository);
//           const user = await getUserbyId(userId, dbRepositoryUser);
//          //@ts-ignore
//           const sessionId = await createPayment(user.name, user.email, booking.id, booking.fees);
      
//           // Update slot status
//           await updateSlotStatus(data.slotId, 'booked', dbBookingRepository);
      
//           res.status(HttpStatus.OK).json({
//             success: true,
//             message: "Booking created successfully",
//             sessionId,
//           });
//         } catch (error) {
//           next(error);
//         }
//       };
      

//     return {
//         bookVenue,
//     }
// }


// export default bookingController





const bookingController = (
    userDbRepository: userDbInterface,
    userRepositoryImpl: userRepositoryMongodbType,
    bookingDbRepository: bookingDbRepositoryInterface,
    bookingDbRepositoryImpl: bookingRepositoryMongodbType,
) => {
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());

    const bookVenue = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const userId = req.user.id;

            const booking = await createBooking(data, userId, dbBookingRepository);
            const user = await getUserbyId(userId, dbRepositoryUser);
            //@ts-ignore
            const sessionId = await createPayment(user.name, user.email, booking.id, booking.fees);

            // Update slot status
            await updateSlotStatus(data.slotId, 'booked', dbBookingRepository);

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

export default bookingController;
