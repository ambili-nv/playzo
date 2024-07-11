import bookingEntity, { BookingEntityType } from '../../../../enitity/bookingEntity';
import { bookingDbRepositoryInterface } from '../../../Interfaces/bookingDbRepository';
import { venueDbRepository,venueDbInterface } from '../../../Interfaces/venueDbRepository';
import Stripe from "stripe";
import configKeys from '../../../../config';

export const createBooking = async (data: any, 
    userId: string,
    bookingDbRepository:ReturnType<bookingDbRepositoryInterface>
) => {
    const { venueId, slotId, fees, paymentStatus, bookingStatus, date } = data;

    const booking: BookingEntityType = bookingEntity(
        userId,
        venueId,
        slotId,
        fees,
        paymentStatus,
        bookingStatus,
        date
    );

   const bookings =   await bookingDbRepository.createbooking(booking);
   console.log(bookings,"bookingsssssssssss");
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