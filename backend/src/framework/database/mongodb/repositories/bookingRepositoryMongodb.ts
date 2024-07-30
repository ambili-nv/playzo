import Booking from "../models/Booking";
import slots from "../models/slots";
import { BookingEntityType } from "../../../../enitity/bookingEntity";
import wallet from "../models/wallet";
import mongoose from "mongoose";
import user from "../models/user";
import venues from "../models/venues";

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
        // console.log(updatingData, "updating data");
        // console.log(id,"id db");
        
       const result = await Booking.findByIdAndUpdate(id, updatingData);
    //    console.log(result,"db res");
       
       return result
    };



    // const bookingHistory = async (userId: string, page: number, limit: number) => {
    //     const skip = (page - 1) * limit;
    //     const [bookings, total] = await Promise.all([
    //         Booking.find({ userId })
    //             .populate({
    //                 path: 'venueId', // This is the field in the Booking model referencing the Venue model
    //                 select: 'name sportsitem' // Specify the fields you want to populate from the Venue model
    //             })
    //             .skip(skip)
    //             .limit(limit)
    //             .exec(),
    //         Booking.countDocuments({ userId })
    //     ]);
    //     console.log(bookings,"booking from db");
        
    //     return { bookings, total };
    // };

    const bookingHistory = async (userId: string, page: number, limit: number) => {
        const skip = (page - 1) * limit;
        const [bookings, total] = await Promise.all([
            Booking.find({ userId })
                .populate({
                    path: 'venueId',
                    select: 'name sportsitem ownerId', // Include ownerId
                    populate: {
                        path: 'ownerId', // Populate the ownerId field
                        select: 'ownerId' // Select the fields you want from Owner model
                    }
                })
                .skip(skip)
                .limit(limit)
                .exec(),
            Booking.countDocuments({ userId })
        ]);
    
        console.log(bookings, "booking from db");
    
        return { bookings, total };
    };
    
    

    // const getAllBookings = async (id:string,page: number, limit: number) => {
    //     // const bookings = await Booking.find()
    //     const bookings = await Booking.findById(id)
    //         .populate('userId', 'name') // Populate the userId with the name field
    //         .populate('venueId', 'name') // Populate the venueId with the name field
    //         .skip((page - 1) * limit)
    //         .limit(limit)
    //         .exec();
    //     const total = await Booking.countDocuments();
    //     console.log(bookings,"db book");
        
    //     return { bookings, total };
    // };


    const getAllBookings = async (ownerId: string, page: number, limit: number) => {
        // Find venues owned by the specified owner
        // const Venue = await venues.find({ ownerId});
        const venueList = await venues.find({ ownerId })
        // console.log(venueList,"venues////////////");
        
        const venueIds = venueList.map(venue => venue._id);
    
        // Find bookings associated with these venues
        const bookings = await Booking.find({ venueId: { $in: venueIds } })
            .populate('userId', 'name') // Populate userId with the name field
            .populate('venueId', 'name') // Populate venueId with the name field
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    
        // Count total bookings for these venues
        const total = await Booking.countDocuments({ venueId: { $in: venueIds } });
    
        return { bookings, total };
    };
    
    
    



    const getBookingById = async (id: string) => {
        return await Booking.findById(id);
    };

    const getWalletbyUserId = async (userId: string) => {
        let Wallet = await wallet.findOne({ userId }).exec(); 

        if (!Wallet) {
            Wallet = new wallet({
                userId,
                balance: 0, // Initial balance
                transactions: []
            });
        }
        // console.log(Wallet, "wallet user from db");
        
        return Wallet;
    }


    const updateWallet = async (
        userId: string,
        amount: number,
        type: 'credit' | 'debit',
        description: string
    ) => {
        // Try to find the wallet for the given user
        let walletDoc = await wallet.findOne({ userId });
    
        // If wallet does not exist, create a new one
        if (!walletDoc) {
            walletDoc = new wallet({
                userId,
                balance: 0, // Initial balance
                transactions: []
            });
        }
    
        // Update the balance based on the transaction type
        if (type === 'credit') {
            walletDoc.balance += amount;
        } else if (type === 'debit') {
            // Ensure sufficient balance before debit
            if (walletDoc.balance < amount) {
                throw new Error('Insufficient balance');
            }
            walletDoc.balance -= amount;
        }
    
        // Add the transaction record
        walletDoc.transactions.push({ type, amount, description, date: new Date() });
    
        // Save the updated wallet document
        await walletDoc.save();
    
        // Return the updated wallet document
        return walletDoc;
    };


    const getWalletTransactions = async (userId: string, page: number, limit: number) => {
        const walletDoc = await wallet.findOne({ userId });
        if (!walletDoc) {
            throw new Error('Wallet not found');
        }
    
        // Pagination logic
        const transactions = walletDoc.transactions.slice((page - 1) * limit, page * limit);
    
        return {
            balance: walletDoc.balance,
            transactions,
            totalTransactions: walletDoc.transactions.length
        };
    };
    



    
    return {
        createBooking,
        updateSlotStatus,
        changePaymentStatus,
        changeBookingStatus,
        bookingHistory,
        getAllBookings,
        getBookingById,
        updateWallet,
        getWalletTransactions,
        getWalletbyUserId
    }
}

export type bookingRepositoryMongodbType = typeof bookingRepositoryMongodb;



