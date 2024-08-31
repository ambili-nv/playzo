import bookingEntity, { BookingEntityType } from '../../../../enitity/bookingEntity';
import {bookingDbRepositoryInterface } from '../../../Interfaces/bookingDbRepository';
import Stripe from "stripe";
import configKeys from '../../../../config';


import { Server } from "socket.io";

let io: Server;


// export const createBooking = async (
//     data: any,
//     userId: string,
//     bookingDbRepository: ReturnType<bookingDbRepositoryInterface>
// ) => {
//     console.log("booking");
    
//     const bookingId = Math.floor(10000000 + Math.random() * 90000000).toString(); // Generates an 8-digit number


//     const { venueId, slotId, fees, paymentStatus, bookingStatus, date, startTime, endTime } = data;

//     const booking: BookingEntityType = bookingEntity(
//         userId,
//         venueId,
//         slotId,
//         fees,
//         paymentStatus,
//         bookingStatus,
//         date,
//         startTime,
//         endTime,
//         bookingId // Pass the generated booking ID
//     );

//     const bookings = await bookingDbRepository.createbooking(booking);
//     return bookings;
// };


export const createBooking = async (
    data: any,
    userId: string,
    bookingDbRepository: ReturnType<bookingDbRepositoryInterface>,
) => {
    // console.log("booking");
    
    const bookingId = Math.floor(10000000 + Math.random() * 90000000).toString(); // Generates an 8-digit number

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
        endTime,
        bookingId // Pass the generated booking ID
    );

    const bookings = await bookingDbRepository.createbooking(booking);
    // console.log(bookings,"bookings nottiiii bookk///");
    
// console.log(bookings.venueId,"hahahhhah");
// console.log(bookings.venueId.toString(), "hahahhhah2");


const venueID = bookings.venueId.toString()

    // Emit a booking notification after successfully creating the booking
  
    const ownerId = await bookingDbRepository.getVenueOwnerId(venueID); 
    console.log(ownerId,"34");
    

    if (ownerId) {
        io?.emit("sendBookingNotification", {
            senderId: userId,
            receiverId: ownerId,
            text: `You have a new booking with ID: ${bookingId}`,
            bookingId
        });
        console.log(`Notification sent to ${ownerId}: bookingssssss`, {
            senderId: userId,
            text: `You have a new booking with ID: ${bookingId}`,
            bookingId
        });
    } else {
        console.log(`Venue owner with ID ${ownerId} not found`);
    }

    return bookings;
};



const stripe = new Stripe(configKeys.STRIPE_SECRET_KEY);

export const createPayment = async (userName: string, email: string, bookingId: string, totalAmount: number) => {
    // console.log("heyyyyy");
    
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
    const updatedData: Record<string, any> = {
        bookingStatus: 'cancelled',   
    };
    const bookingData = await bookingDbRepository.changeBookingStatus(id, updatedData);    
    return bookingData;
};


export const getBookingById = async (id: string,bookingDbRepository: ReturnType<bookingDbRepositoryInterface>) => {
    const booking = await bookingDbRepository.getBookingById(id);
    return booking;
};


export const fetchBookingHistory = async (userId: string, bookingDbRepository: ReturnType<bookingDbRepositoryInterface>, page: number, limit: number) => {
    const { bookings, total } = await bookingDbRepository.bookingHistory(userId, page, limit);
    return { bookings, total };
};





export const fetchAllBookings = async (id:string,bookingDbRepository: ReturnType<bookingDbRepositoryInterface>, page: number, limit: number) => {
    const bookings = await bookingDbRepository.getAllBookings(id,page, limit);
    return bookings;
};


 

export const updateWallet = async (
    userId: string,
    amount: number,
    type: 'credit' | 'debit',
    description: string,
    bookingDbRepository: ReturnType<bookingDbRepositoryInterface>
) => {
    // console.log("hello bookinf");
    
    const walletUpdate = await bookingDbRepository.updateWallet(userId, amount, type, description);
    return walletUpdate;
};

export const getTransactions = async (
    userId: string,
    bookingDbRepository: ReturnType<bookingDbRepositoryInterface>,
    page: number,
    limit: number
) => {
    const walletData = await bookingDbRepository.getTransaction(userId, page, limit);
    return walletData;
};





export const getWalletbyUserId = async (
    userId:string,
    bookingDbRepository: ReturnType<bookingDbRepositoryInterface>
)=>{
    const wallet = await bookingDbRepository.getWalletbyUserId(userId)
    return wallet
}


export const createWalletBooking = async (data: any, 
    userId: string,
    bookingDbRepository: ReturnType<bookingDbRepositoryInterface>
) => {
    // console.log("booking");
    
    const { venueId, slotId, fees, paymentStatus, bookingStatus, date, startTime, endTime,bookingId } = data;

    const booking: BookingEntityType = bookingEntity(
        userId,
        venueId,
        slotId,
        fees,
        paymentStatus,
        bookingStatus,
        date,
        startTime,
        endTime,
        bookingId
    );

   const bookings = await bookingDbRepository.createbooking(booking);
   await updateBookingStatus
   await updatePaymentStatus
//    console.log(bookings, "bookingsssssssssss");
   return bookings;
};


export const getBookings = async(bookingId:string,bookingDbRepository: ReturnType<bookingDbRepositoryInterface>)=>{
    const booking = await bookingDbRepository.getBookings(bookingId)
    // console.log(booking,"booking booking");
    
    return booking
}

export const getallBookings = async(bookingDbRepository: ReturnType<bookingDbRepositoryInterface>)=>{
    const bookings = await bookingDbRepository.getallBookings()
    // console.log(bookings,"bookings ///");
    return bookings
}



export const generateBookingReport = async (
    ownerId: string,
    startDate: Date,
    endDate: Date,
    bookingDbRepository: ReturnType<bookingDbRepositoryInterface>,
) => {
    const report = await bookingDbRepository.getBookingReport(ownerId,startDate,endDate);
    const { bookings, totalAmount } = report;
    // console.log('Report:', report);
    return { bookings, totalAmount };
};

export const createNotification = async(venueId:string,bookingId:string,bookingDbRepository:ReturnType<bookingDbRepositoryInterface>)=>{
    const notification = await bookingDbRepository.createNotification(venueId,bookingId)
    return notification
}


export const getNotifications  = async(ownerId:string,bookingDbRepository:ReturnType<bookingDbRepositoryInterface>)=>{
    const notification = await bookingDbRepository.getNotifications(ownerId)
    return notification
}