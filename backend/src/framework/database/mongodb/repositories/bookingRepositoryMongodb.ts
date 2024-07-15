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

    const changePaymentStatus = async(id:string)=>{
        return await Booking.findByIdAndUpdate(id, { paymentStatus: "Success" });
    }


    const changeBookingStatus = async (id: string, updatingData: Record<any, any>) => {
        console.log(updatingData, "updating data");
        console.log(id,"id db");
        
       const result = await Booking.findByIdAndUpdate(id, updatingData);
       console.log(result,"db res");
       
       return result
    };



    const bookingHistory = async (userId: string) => {
        const bookings = await Booking.find({ userId })
            .populate('venueId', 'name') // Populate the venueId with the name field
            .exec();
        console.log(bookings, "bookings db");
        return bookings;
    };

    const getAllBookings = async () => {
        const bookings = await Booking.find()
            .populate('userId', 'name') // Populate the userId with the name field
            .populate('venueId', 'name') // Populate the venueId with the name field
            .exec();
        return bookings;
    };


    
    return {
        createBooking,
        updateSlotStatus,
        changePaymentStatus,
        changeBookingStatus,
        bookingHistory,
        getAllBookings
    }
}

export type bookingRepositoryMongodbType = typeof bookingRepositoryMongodb;



