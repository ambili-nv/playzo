    import { userDbInterface } from "../app/Interfaces/userDbRepository"
    import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb"
    import { bookingDbRepositoryInterface } from "../app/Interfaces/bookingDbRepository"
    import { bookingRepositoryMongodbType } from "../framework/database/mongodb/repositories/bookingRepositoryMongodb"
    import { Request,Response,NextFunction } from "express"
    import { HttpStatus } from "../types/httpStatus"
    import { getUserbyId } from "../app/use-cases/user/auth/userAuth"
    import { createBooking,createPayment,updateSlotStatus,updatePaymentStatus,updateBookingStatus,fetchBookingHistory,fetchAllBookings,cancelbooking ,getBookingById} from "../app/use-cases/user/auth/booking"
    

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
                // console.log("updating");
                const { id } = req.params;
                const { paymentStatus } = req.body;
                // console.log(id,paymentStatus,"id payment sts");
                const updateStatus = await updatePaymentStatus(id,dbBookingRepository)

                await updateBookingStatus(id,paymentStatus,dbBookingRepository)
                res.status(HttpStatus.OK)
                .json({ success: true, message: "Booking status updated" });
            } catch (error) {
                
            }
        }



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

        const adminBookingHistory = async (req: Request, res: Response, next: NextFunction) =>{
            try {
                console.log(req.params,"req params admin");
                const {userId} = req.params
                //@ts-ignore
                const bookings =  await fetchBookingHistory(userId, dbBookingRepository);
                res.status(HttpStatus.OK).json({
                    success: true,
                    bookings,
                });
            } catch (error) {
                next(error);
            }
        }





        const bookingController =  async (req: Request, res: Response, next: NextFunction)=>{
            try {
                const bookings = await fetchAllBookings(dbBookingRepository);
                console.log(bookings,"booking his owner");
                
                res.status(HttpStatus.OK).json({
                    success: true,
                    bookings,
                });
            } catch (error) {
                next(error);
            }
        }

       
        const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params.bookingId;


                const booking = await getBookingById(id, dbBookingRepository);
                if (!booking) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        success: false,
                        message: "Booking not found",
                    });
                }
        
                console.log(booking.startTime, "start time from booking");
        
                const bookingDate = booking.date; 
                const dateTimeString = `${bookingDate}T${booking.startTime}:00.000Z`; 
        
                
                let slotStartTime;
                try {
                    slotStartTime = Date.parse(dateTimeString);
                    console.log(slotStartTime, "start time in ms");
                    if (isNaN(slotStartTime)) {
                        throw new Error("Invalid start time");
                    }
                } catch (error) {
                    console.error("Error parsing startTime:", error);
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        success: false,
                        message: "Invalid start time format",
                    });
                }
        
                const currentTime = Date.now(); 
                console.log(currentTime, "current time in ms");
        
                const twentyFourHoursInMs = 24 * 60 * 60 * 1000; 
        
            
                const cancellationDeadline = slotStartTime - twentyFourHoursInMs;
        
                if (currentTime >= cancellationDeadline) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        success: false,
                        message: "Cannot cancel booking less than 24 hours before the slot start time",
                    });
                }
        
              
                await cancelbooking(id, dbBookingRepository);
                //@ts-ignore
                await updateSlotStatus(booking.slotId, 'available', dbBookingRepository);

                res.status(HttpStatus.OK).json({
                    success: true,
                    message: "Booking cancelled successfully",
                });
            } catch (error) {
                next(error);
            }
        };
        
        return {
            bookVenue,
            updateStatus,
            getBookingHistory,
            cancelBooking,
            bookingController,
            adminBookingHistory
        }
    }

    export default bookingController;



