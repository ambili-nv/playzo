    import { userDbInterface } from "../app/Interfaces/userDbRepository"
    import { userRepositoryMongodbType } from "../framework/database/mongodb/repositories/userRepositoryMongodb"
    import { bookingDbRepositoryInterface } from "../app/Interfaces/bookingDbRepository"
    import { bookingRepositoryMongodbType } from "../framework/database/mongodb/repositories/bookingRepositoryMongodb"
    import { Request,Response,NextFunction } from "express"
    import { HttpStatus } from "../types/httpStatus"
    import { getUserbyId } from "../app/use-cases/user/auth/userAuth"
    import { createBooking,
        createPayment,
        updateSlotStatus,
        updatePaymentStatus,
        updateBookingStatus,
        fetchBookingHistory,
        fetchAllBookings,
        cancelbooking,
        getBookingById,
        updateWallet,
        getTransactions,
        getWalletbyUserId,
        getBookings,
        getallBookings,
        generateBookingReport,
        createNotification,
        getNotifications
    } from "../app/use-cases/user/auth/booking"


    import { Server } from "socket.io";



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
                // console.log("wallet and");
                
                const data = req.body;
                const userId = req.user.id;

                const booking = await createBooking(data, userId, dbBookingRepository);
                const user = await getUserbyId(userId, dbRepositoryUser);
                //@ts-ignore
                const sessionId = await createPayment(user.name, user.email, booking.id, booking.fees);

                // Update slot status
                await updateSlotStatus(data.slotId, 'booked', dbBookingRepository);

                await createNotification(data.venueId, booking.id,dbBookingRepository);
                // console.log(data.venueId, booking.id,"notiiiiiiiii");
                

                res.status(HttpStatus.OK).json({
                    success: true,
                    message: "Booking created successfully",
                    sessionId,
                });
            } catch (error) {
                next(error);
            }
        };


          
        

        
        


        const retryPayment = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { bookingId } = req.body;
                const userId = req.user.id;
        
                // Fetch booking details
                const booking = await getBookingById(bookingId, dbBookingRepository);
                if (!booking) {
                    return res.status(404).json({ success: false, message: 'Booking not found' });
                }
        
                const user = await getUserbyId(userId, dbRepositoryUser);
                //@ts-ignore
                const sessionId = await createPayment(user.name, user.email, booking.id, booking.fees);
        
                res.status(HttpStatus.OK).json({
                    success: true,
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
                const updateStatus = await updatePaymentStatus(id,dbBookingRepository)

                await updateBookingStatus(id,paymentStatus,dbBookingRepository)
                res.status(HttpStatus.OK)
                .json({ success: true, message: "Booking status updated" });
            } catch (error) {
                
            }
        }


        // const getBookingHistory = async (req: Request, res: Response, next: NextFunction) => {
        //     try {
        //         const userId = req.user.id;
        //         const { bookings, total } = await fetchBookingHistory(userId, dbBookingRepository);
        
        //         res.status(HttpStatus.OK).json({
        //             success: true,
        //             bookings,
        //             total,
        //         });
        //     } catch (error) {
        //         next(error);
        //     }
        // };

        const getBookingHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 5;

        const { bookings, total } = await fetchBookingHistory(userId, dbBookingRepository, page, limit);

        res.status(HttpStatus.OK).json({
            success: true,
            bookings,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        next(error);
    }
};

        

        const  adminBookingHistory = async (req: Request, res: Response, next: NextFunction) =>{
            try {
                console.log(req.params,"req params admin");
                const {userId} = req.params
                console.log(userId,"req params adddsmin");
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 5;
                //@ts-ignore
                const {bookings,total} =  await fetchBookingHistory(userId,dbBookingRepository, page, limit);
                
                res.status(HttpStatus.OK).json({
                    success: true,
                    bookings,
                    total,
                    page,
                    totalPages: Math.ceil(total / limit)
                });
            } catch (error) {
                next(error);
            }
        }


        const bookingController = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { ownerId } = req.params;                
                const { page = 1, limit = 6 } = req.query;
                const { bookings, total } = await fetchAllBookings(ownerId,dbBookingRepository, parseInt(page as string), parseInt(limit as string));
                
                res.status(HttpStatus.OK).json({
                    success: true,
                    bookings,
                    total,
                    page: parseInt(page as string),
                    limit: parseInt(limit as string),
                });
            } catch (error) {
                next(error);
            }
        };
        
       


const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier.toUpperCase() === 'PM') {
        hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours}:${minutes}`;
};

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

        const bookingDate = booking.date; // e.g., "2024-09-09"
        const originalStartTime = booking.startTime; // e.g., "10:00 AM"

        // Convert the 12-hour time (with AM/PM) to 24-hour format
        const startTime24h = convertTo24Hour(originalStartTime);

        // Create a valid ISO date-time string
        const dateTimeString = `${bookingDate}T${startTime24h}:00.000Z`;
        // console.log(dateTimeString, "formatted dateTimeString");

        let slotStartTime;
        try {
            slotStartTime = Date.parse(dateTimeString);
            // console.log(slotStartTime, "parsed slotStartTime");

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

        // Update wallet balance and add transaction
        const userId = booking.userId;
        const amount = booking.fees;
        //@ts-ignore
        await updateWallet(userId, amount, 'credit', 'Booking cancelled refund', dbBookingRepository);

        res.status(HttpStatus.OK).json({
            success: true,
            message: "Booking cancelled successfully",
        });
    } catch (error) {
        next(error);
    }
};







const getWalletTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 5;
        const walletData = await getTransactions(userId, dbBookingRepository, page, limit);
        res.status(HttpStatus.OK).json(walletData);
    } catch (error) {
        next(error);
    }
};



const handleWalletPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { venueId, slotId, date, startTime, endTime, fees } = req.body;
        const userId = req.user.id;
        
        // Check user wallet balance before proceeding
        const user = await getWalletbyUserId(userId, dbBookingRepository);
        // console.log(user,"wallet user");
        
        //@ts-ignore
        if (user.balance < fees) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: "Insufficient wallet balance",
            });
        }

        // Create booking
        const bookingData = { venueId, slotId, fees, paymentStatus: "paid", bookingStatus: "confirmed", date, startTime, endTime };
        const booking = await createBooking(bookingData, userId, dbBookingRepository);

        // Update wallet balance
        await updateWallet(userId, fees, 'debit', 'Wallet payment for booking', dbBookingRepository);

        // Update slot status
        await updateSlotStatus(slotId, 'booked', dbBookingRepository);

        await createNotification(venueId,booking.id,dbBookingRepository)

        res.status(HttpStatus.OK).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });
    } catch (error) {
        next(error);
    }
};


const getBookingDetails = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {bookingId} = req.params
        const bookings = await getBookings(bookingId,dbBookingRepository)
        
        res.status(HttpStatus.OK).json({
            success: true,
            message: "Booking created successfully",
            bookings,
        });
    } catch (error) {
        
    }
}


const getAllBookings = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const bookingData = await getallBookings(dbBookingRepository)        
        res.status(HttpStatus.OK).json({
            success: true,
            message: "Booking created successfully",
            bookingData,
        });
    } catch (error) {
        
    }
}


// const generateReports = async (req: Request, res: Response, next: NextFunction)=>{

//     try {
//         const ownerId = req.owner.id
//         console.log(ownerId,"owner id report controller");

//         const { startDate, endDate } = req.query as {
//             startDate: string;
//             endDate: string;
//         };
//         console.log(startDate,endDate,"dates report controller");

//         const report = await generateBookingReport(
//             ownerId,
//             startDate,
//             endDate,
//             dbBookingRepository,
//           );
//           console.log(report,"report controller ");
          
//           res.status(HttpStatus.OK).json({
//             success: true,
//             message: "Report generated successfully",
//             report,
//           });
    
//     } catch (error) {
//         next(error)
//     }
    
// }


const generateReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.owner.id;
        // console.log(ownerId, "owner id report controller");

        const { startDate, endDate } = req.query as {
            startDate: string;
            endDate: string;
        };
        // console.log(startDate, endDate, "dates report controller");

        // Convert date strings to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Adjust end date to include the whole end day
        end.setUTCHours(23, 59, 59, 999);

        // console.log('Parsed Start Date:', start);
        // console.log('Parsed End Date:', end);

        const report = await generateBookingReport(
            ownerId,
            start,
            end,
            dbBookingRepository
        );
        // console.log('Report generated:', report);

        res.status(HttpStatus.OK).json({
            success: true,
            message: "Report generated successfully",
            report,
        });

    } catch (error) {
        // console.error('Error generating report:', error);
        next(error);
    }
};


const getNotification = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const ownerId = req.params.ownerId
        // console.log(ownerId," ownerId notti");
        const notification = await getNotifications(ownerId,dbBookingRepository)
        // console.log(notification,"got noti contler");
        
        res.status(HttpStatus.OK).json({
            success: true,
            // message: "Report generated successfully",
            notification,
        });
    } catch (error) {
        
    }
}



   
        return {
            bookVenue,
            updateStatus,
            getBookingHistory,
            cancelBooking,
            bookingController,
            adminBookingHistory,
            getWalletTransactions,
            handleWalletPayment,
            retryPayment,
            getBookingDetails,
            getAllBookings,
            generateReports,
            getNotification
        }
    }

    export default bookingController;


