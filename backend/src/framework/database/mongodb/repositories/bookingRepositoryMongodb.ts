// import Booking from "../models/Booking";
// import slots from "../models/slots";
// import { BookingEntityType } from "../../../../enitity/bookingEntity";
// export const bookingRepositoryMongodb = ()=>{
//  const createBooking = async (data: BookingEntityType) => {
//         return await Booking.create({
//             userId: data.getUserId(),
//             venueId: data.getVenueId(),
//             slotId: data.getSlotId(),
//             fees: data.getFees(),
//             paymentStatus: data.getPaymentStatus(),
//             bookingStatus: data.getBookingStatus(),
//             date: data.getDate(),
//             createdAt: data.getCreatedAt(),
//         });
//     }

//     const updateSlotStatus = async (slotId: string, status: string) => {
//         return await slots.findByIdAndUpdate(slotId, { status });
//       };


//     return {
//         createBooking,
//         updateSlotStatus
//     }
// }

// export type bookingRepositoryMongodbType = typeof bookingRepositoryMongodb




import Booking from "../models/Booking";
import slots from "../models/slots";
import { BookingEntityType } from "../../../../enitity/bookingEntity";

export const bookingRepositoryMongodb = () => {
    const createBooking = async (data: BookingEntityType) => {
        return await Booking.create({
            userId: data.getUserId(),
            venueId: data.getVenueId(),
            slotId: data.getSlotId(),
            fees: data.getFees(),
            paymentStatus: data.getPaymentStatus(),
            bookingStatus: data.getBookingStatus(),
            date: data.getDate(),
            startTime: data.getStartTime(),
            endTime: data.getEndTime(),
            createdAt: data.getCreatedAt(),
        });
    }

    const updateSlotStatus = async (slotId: string, status: string) => {
        return await slots.findByIdAndUpdate(slotId, { status });
    };

    return {
        createBooking,
        updateSlotStatus
    }
}

export type bookingRepositoryMongodbType = typeof bookingRepositoryMongodb;
