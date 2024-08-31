    import { bookingRepositoryMongodbType } from "../../framework/database/mongodb/repositories/bookingRepositoryMongodb"
    import { BookingEntityType } from "../../enitity/bookingEntity"
    import { BookingReportFilter } from "../../types/BookingReportInterface"

    export const bookingDbRepository = (
        repository: ReturnType<bookingRepositoryMongodbType>
    ) => {
        const createbooking = async (data: BookingEntityType) => {
        const booking = await repository.createBooking(data);
        // console.log(booking, "bookng dbr");
        return booking;
        }

        const updateSlotStatus = async (slotId: string, status: string) => {
            const result = await repository.updateSlotStatus(slotId, status);
            return result;
        };

        const changePaymentStatus = async(id:string)=>{
            await repository.changePaymentStatus(id)
        }



        const changeBookingStatus = async (id: string, updatingData: Record<any, any>) => {
            // console.log(id,updatingData,"up data db repo");
            
            await repository.changeBookingStatus(id, updatingData);
        };

        const bookingHistory = async (userId: string, page: number, limit: number) => {
            const { bookings, total } = await repository.bookingHistory(userId,page,limit);
            return { bookings, total };
        };


        

        const getAllBookings = async (id:string,page: number, limit: number) => {
            const bookings = await repository.getAllBookings(id,page, limit);
            return bookings;
        };

        const getBookingById = async (id: string) => {
            const booking = await repository.getBookingById(id);
            return booking;
        };

        const getWalletbyUserId = async (id: string) => {
            const wallet = await repository.getWalletbyUserId(id);
            // console.log(wallet, "wallet user from repo");
            
            return wallet;
        };


        const updateWallet = async (
            userId: string,
            amount: number,
            type: 'credit' | 'debit',
            description: string
        ) => {
            const walletUpdate = await repository.updateWallet(userId, amount, type, description);
            return walletUpdate;
        };

        const getTransaction = async (userId: string, page: number, limit: number) => {
            const transactions = await repository.getWalletTransactions(userId, page, limit);
            return transactions;
        };

        const getBookings = async(bookingId:string)=>{
            const booking = await repository.getBookingDetail(bookingId);
            // console.log(booking,"booking repo/'////////");
            return booking
            
        }
        

        const getallBookings = async()=>{
            const bookings = await repository.getallBookings()
            // console.log(bookings,"////////");
            return bookings
        }

        const getBookingReport = async (ownerId: any,startDate: any,endDate: any) =>{

            const report  = await repository.getBookingReport(ownerId,startDate,endDate);
            const { bookings, totalAmount } = report;
            // console.log(report,"in");
            return { bookings, totalAmount }
            // return report
        }
        
        const createNotification = async(venueId:string,bookingId:string)=>{
            const notification = await repository.createNotification(venueId,bookingId)
            return notification
        }


        const getNotifications = async(ownerId:string)=>{
            const notification = await repository.getNotifications(ownerId)
            return notification
        }


        const getVenueOwnerId = async(venueID:string)=>{
            const venueId = await repository.getVenueOwnerId(venueID)
            // console.log(venueId,"2");
            
            return venueId
        }



        return {
            createbooking,
            updateSlotStatus,
            changePaymentStatus,
            changeBookingStatus,
            bookingHistory,
            getAllBookings,
            getBookingById,
            updateWallet,
            getTransaction,
            getWalletbyUserId,
            getBookings,
            getallBookings,
            getBookingReport,
            createNotification,
            getNotifications,getVenueOwnerId
        }
    }

    export type bookingDbRepositoryInterface = typeof bookingDbRepository;





