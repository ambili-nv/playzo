// import { bookingRepositoryMongodbType } from "../../framework/database/mongodb/repositories/bookingRepositoryMongodb"
// import { BookingEntityType } from "../../enitity/bookingEntity"

// export const bookingDbRepository = (
//     repository:ReturnType<bookingRepositoryMongodbType>
// )=>{
//     const createbooking = async (data:BookingEntityType)=>{
//        const booking =  await repository.createBooking(data)
//        console.log(booking,"bookng dbr");
       
//        return booking;
//     }


//     const updateSlotStatus = async (slotId: string, status: string) => {
//         const result = await repository.updateSlotStatus(slotId, status);
//         return result;
//       };



//     return {
//         createbooking,
//         updateSlotStatus
//     }
// }


// export type bookingDbRepositoryInterface = typeof bookingDbRepository




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

    return {
        createbooking,
        updateSlotStatus
    }
}

export type bookingDbRepositoryInterface = typeof bookingDbRepository;
