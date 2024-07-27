    import { bookingRepositoryMongodbType } from "../../framework/database/mongodb/repositories/bookingRepositoryMongodb"
    import { BookingEntityType } from "../../enitity/bookingEntity"

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
            const { bookings, total } = await repository.bookingHistory(userId, page, limit);
            return { bookings, total };
        };

        const getAllBookings = async (page: number, limit: number) => {
            const bookings = await repository.getAllBookings(page, limit);
            return bookings;
        };

        const getBookingById = async (id: string) => {
            const booking = await repository.getBookingById(id);
            return booking;
        };

        const getWalletbyUserId = async (id: string) => {
            const wallet = await repository.getWalletbyUserId(id);
            console.log(wallet, "wallet user from repo");
            
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

        // const update
        
        

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
            getWalletbyUserId
        }
    }

    export type bookingDbRepositoryInterface = typeof bookingDbRepository;





