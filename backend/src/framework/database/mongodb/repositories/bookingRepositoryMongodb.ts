import Booking from "../models/Booking";
import slots from "../models/slots";
import { BookingEntityType } from "../../../../enitity/bookingEntity";
import wallet from "../models/wallet";

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


    const bookingHistory = async (userId: string) => {
        const bookings = await Booking.find({ userId })
            .populate({
                path: 'venueId', // This is the field in the Booking model referencing the Venue model
                select: 'name sportsitem' // Specify the fields you want to populate from the Venue model
            })
            .exec();
        // console.log(bookings, "bookings db"); // Logging the fetched bookings
        return bookings; // Returning the populated bookings array
    };

    
    const getAllBookings = async () => {
        const bookings = await Booking.find()
            .populate('userId', 'name') // Populate the userId with the name field
            .populate('venueId', 'name') // Populate the venueId with the name field
            .exec();
        return bookings;
    };


    const getBookingById = async (id: string) => {
        return await Booking.findById(id);
    };

    const getWalletbyUserId = async (userId: string) => {
        const Wallet = await wallet.findOne({ userId }).exec(); 
        console.log(Wallet, "wallet user from db");
        
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


    const getWalletTransactions = async (userId: string) => {
        const walletDoc = await wallet.findOne({ userId });
        if (!walletDoc) {
            throw new Error('Wallet not found');
        }
    
        return {
            balance: walletDoc.balance,
            transactions: walletDoc.transactions,
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



