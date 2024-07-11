import Booking from "../models/Booking";
import { BookingEntityType } from "../../../../enitity/bookingEntity";
export const bookingRepositoryMongodb = ()=>{
 const createBooking = async (data: BookingEntityType) => {
        return await Booking.create({
            userId: data.getUserId(),
            venueId: data.getVenueId(),
            slotId: data.getSlotId(),
            fees: data.getFees(),
            paymentStatus: data.getPaymentStatus(),
            bookingStatus: data.getBookingStatus(),
            date: data.getDate(),
            createdAt: data.getCreatedAt(),
        });
    }


    return {
        createBooking,
    }
}

export type bookingRepositoryMongodbType = typeof bookingRepositoryMongodb