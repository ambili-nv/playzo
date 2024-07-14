    import { userDbInterface } from "../app/Interfaces/userDbRepository"
    import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb"
    import { bookingDbRepositoryInterface } from "../app/Interfaces/bookingDbRepository"
    import { bookingRepositoryMongodbType } from "../framework/database/mongodb/repositories/bookingRepositoryMongodb"
    import { Request,Response,NextFunction } from "express"
    import { HttpStatus } from "../types/httpStatus"
    import { getUserbyId } from "../app/use-cases/user/auth/userAuth"
    import { createBooking,createPayment,updateSlotStatus,updatePaymentStatus,updateBookingStatus,fetchBookingHistory } from "../app/use-cases/user/auth/booking"


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


        const updateStatus = async (req: Request, res: Response, next: NextFunction) =>{
            try {
                console.log("updating");
                const { id } = req.params;
                const { paymentStatus } = req.body;
                console.log(id,paymentStatus,"id payment sts");
                const updateStatus = await updatePaymentStatus(id,dbBookingRepository)

                await updateBookingStatus(id,paymentStatus,dbBookingRepository)
                res.status(HttpStatus.OK)
                .json({ success: true, message: "Booking status updated" });
            } catch (error) {
                
            }
        }

        // const getBookingHistory = async (req: Request, res: Response, next: NextFunction)=>{
        //     console.log("History");
        //     const userId = req.user.id
        //     console.log(userId,"id history");                        
        // }


        const getBookingHistory = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const userId = req.user.id;
    
                const bookings = await fetchBookingHistory(userId, dbBookingRepository);
                console.log(bookings,"bookings cntlt");
                
                res.status(HttpStatus.OK).json({
                    success: true,
                    bookings,
                });
            } catch (error) {
                next(error);
            }
        };


        return {
            bookVenue,
            updateStatus,
            getBookingHistory
        }
    }

    export default bookingController;



