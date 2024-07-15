    import { bookingRepositoryMongodbType } from "../../framework/database/mongodb/repositories/bookingRepositoryMongodb"
    import { BookingEntityType } from "../../enitity/bookingEntity"

    export const bookingDbRepository = (
        repository: ReturnType<bookingRepositoryMongodbType>
    ) => {
        const createbooking = async (data: BookingEntityType) => {
        const booking = await repository.createBooking(data);
        console.log(booking, "bookng dbr");
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
            console.log(id,updatingData,"up data db repo");
            
            await repository.changeBookingStatus(id, updatingData);
        };

        const bookingHistory = async (userId: string) => {
            const bookings = await repository.bookingHistory(userId);
            return bookings;
        };


        const getAllBookings = async () => {
            const bookings = await repository.getAllBookings();
            return bookings;
        };


        //  const cancelBooking = async (id: string) => {
        //     await repository.findByIdAndUpdate(id, { bookingStatus: 'cancelled' });
        // };
        

        const getBookingById = async (id: string) => {
            const booking = await repository.getBookingById(id);
            return booking;
        };
        

        return {
            createbooking,
            updateSlotStatus,
            changePaymentStatus,
            changeBookingStatus,
            bookingHistory,
            getAllBookings,
            getBookingById
        }
    }

    export type bookingDbRepositoryInterface = typeof bookingDbRepository;





