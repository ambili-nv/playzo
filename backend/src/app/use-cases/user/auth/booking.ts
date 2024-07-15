import bookingEntity, { BookingEntityType } from '../../../../enitity/bookingEntity';
import {bookingDbRepositoryInterface } from '../../../Interfaces/bookingDbRepository';
import Stripe from "stripe";
import configKeys from '../../../../config';

export const createBooking = async (data: any, 
    userId: string,
    bookingDbRepository: ReturnType<bookingDbRepositoryInterface>
) => {
    const { venueId, slotId, fees, paymentStatus, bookingStatus, date, startTime, endTime } = data;

    const booking: BookingEntityType = bookingEntity(
        userId,
        venueId,
        slotId,
        fees,
        paymentStatus,
        bookingStatus,
        date,
        startTime,
        endTime
    );

   const bookings = await bookingDbRepository.createbooking(booking);
   console.log(bookings, "bookingsssssssssss");
   return bookings;
};

const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY);

export const createPayment = async (userName: string, email: string, bookingId: string, totalAmount: number) => {
    const customer = await stripe.customers.create({
        name: userName,
        email: email,
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customer.id,
        line_items: [{
            price_data: {
                currency: 'inr',
                product_data: { name: 'Venue Booking', description: 'Booking fee' },
                unit_amount: totalAmount * 100,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${configKeys.CLIENT_URL}/payment_status/${bookingId}?success=true`,
        cancel_url: `${configKeys.CLIENT_URL}/payment_status/${bookingId}?success=false`,
    });

    return session.id;
};

export const updateSlotStatus = async (
    slotId: string,
    status: string,
    bookingDbRepository: ReturnType<bookingDbRepositoryInterface>
) => {
    const result = await bookingDbRepository.updateSlotStatus(slotId, status);
    return result;
};


export const updatePaymentStatus = async (
    id:string,
    bookingDbRepository:ReturnType<bookingDbRepositoryInterface>
)=>{
    const paymentstatus = await bookingDbRepository.changePaymentStatus(id)
    return paymentstatus
}



export const updateBookingStatus = async (
    id:string,
    paymentStatus : "paid" | "failed" | "cancelled",
    bookingDbRepository:ReturnType<bookingDbRepositoryInterface>
)=>{
    const bookingStatus = paymentStatus === "paid" ? "confirmed" : "pending"

    const updatedData :Record<string, any> = {
        paymentStatus,
        bookingStatus,
      };

      const bookingData =await bookingDbRepository.changeBookingStatus(
        id,
        updatedData
      )

      return bookingData;
}


export const cancelbooking = async (id: string, bookingDbRepository: ReturnType<bookingDbRepositoryInterface>) => {
    console.log("booking.ts");
    console.log(id,"di ");
    
    const updatedData: Record<string, any> = {
        bookingStatus: 'cancelled',
    
        
    };

    const bookingData = await bookingDbRepository.changeBookingStatus(id, updatedData);
    console.log(bookingData,id,"data bookig.ts");
    
    return bookingData;
};





export const fetchBookingHistory = async (userId: string, bookingDbRepository: ReturnType<bookingDbRepositoryInterface>) => {
    const bookings = await bookingDbRepository.bookingHistory(userId);
    return bookings;
};


export const fetchAllBookings = async (bookingDbRepository: ReturnType<bookingDbRepositoryInterface>) => {
    const bookings = await bookingDbRepository.getAllBookings();
    return bookings;
};

