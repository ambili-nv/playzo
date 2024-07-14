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


     const changeBookingStatus = async(id:string,updatingData: Record<any, any>)=>{
        await repository.changeBookingStatus(id,updatingData)
     }

    return {
        createbooking,
        updateSlotStatus,
        changePaymentStatus,
        changeBookingStatus
    }
}

export type bookingDbRepositoryInterface = typeof bookingDbRepository;





