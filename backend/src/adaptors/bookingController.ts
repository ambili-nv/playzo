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
        getWalletbyUserId
    } from "../app/use-cases/user/auth/booking"
    

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
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 5;
        
                const { bookings, total } = await fetchBookingHistory(userId, page, limit, dbBookingRepository);
        
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
        };
        

        const  adminBookingHistory = async (req: Request, res: Response, next: NextFunction) =>{
            try {
                // console.log(req.params,"req params admin");
                const {userId} = req.params
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 5;
                //@ts-ignore
                const {bookings,total} =  await fetchBookingHistory(userId, page, limit, dbBookingRepository);
                // console.log(bookings,"bookingss admin user");
                
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
                // console.log(typeof(ownerId),"in chat tyoe");
        
                // console.log("Fetching owner data for ID:", ownerId);
                // const ownerId = id.toString()
                // const id = String(req.owner._id);
                // const ownerId = String(id)   

                // console.log(ownerId,"owner bookng");
                // console.log(req.params,"id owner");
                
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

        const bookingDate = booking.date;
        const dateTimeString = `${bookingDate}T${booking.startTime}:00.000Z`;

        let slotStartTime;
        try {
            slotStartTime = Date.parse(dateTimeString);
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
        await updateWallet(userId, amount, 'credit', 'Booking cancelled refund',dbBookingRepository);

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
        // console.log(userId,"userID for wallet");
        
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

        res.status(HttpStatus.OK).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });
    } catch (error) {
        next(error);
    }
};


// const chat = async (req: Request, res: Response, next: NextFunction)=>{
//     console.log(req.body,"chat body");
//     // const {id} = req.body
//     const { senderId, recieverId } = req.body;
//     console.log(senderId,recieverId,"//////////////");
    
//     // console.log(id,"////////////");
    
    
// }





   
        return {
            bookVenue,
            updateStatus,
            getBookingHistory,
            cancelBooking,
            bookingController,
            adminBookingHistory,
            getWalletTransactions,
            handleWalletPayment,
            // chat
        }
    }

    export default bookingController;



