import Booking from "../models/Booking";
import slots from "../models/slots";
import { BookingEntityType } from "../../../../enitity/bookingEntity";
import wallet from "../models/wallet";
import mongoose from "mongoose";
import user from "../models/user";
import venues from "../models/venues";
import { populate } from "dotenv";
import { BookingReportFilter } from "../../../../types/BookingReportInterface";
import Notification from "../models/Notification";

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
            bookingId: data.getBookingId(), 
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

    // const bookingHistory = async (userId: string) => {
    //     const [bookings, total] = await Promise.all([
    //         Booking.find({ userId })
    //             .populate({
    //                 path: 'venueId',
    //                 select: 'name sportsitem ownerId place', // Include ownerId
    //                 populate: {
    //                     path: 'ownerId', // Populate the ownerId field
    //                     select: 'ownerId' // Select the fields you want from Owner model
    //                 }
    //             })
    //             .exec(),
    //         Booking.countDocuments({ userId })
    //     ]);
    
    //     console.log(bookings, "booking from db");
    
    //     return { bookings, total };
    // };
    const bookingHistory = async (userId: string, page: number, limit: number) => {
        const skip = (page - 1) * limit;
    
        const [bookings, total] = await Promise.all([
            Booking.find({ userId })
                .skip(skip)
                .limit(limit)
                .populate({
                    path: 'venueId',
                    select: 'name sportsitem ownerId place',
                    populate: {
                        path: 'ownerId',
                        select: 'ownerId'
                    }
                })
                .exec(),
            Booking.countDocuments({ userId })
        ]);
    
        console.log(bookings, "booking from db");
    
        return { bookings, total };
    };
    



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
    
    // const getBookingDetail = async(bookingId:String)=>{
    //     const booking = Booking.findById(bookingId)
    //     .populate({
    //         path: 'venueId',
    //         select: 'name sportsitem ownerId place', // Include ownerId
    //         populate: {
    //             path: 'ownerId', // Populate the ownerId field
    //             select: 'ownerId' // Select the fields you want from Owner model
    //         }
    //     })
    // }


    const getBookingDetail = async (bookingId: string) => {
        try {
          const booking = await Booking.findById(bookingId)
          .populate({
            path: 'userId',
            select: 'name email', // Select only the fields you need from User
          })
            .populate({
              path: 'venueId',
              select: 'name sportsitem place', // Exclude ownerId if not needed here
              populate: {
                path: 'ownerId', // Populate the ownerId field
                select: 'name', // Select the fields you want from the Owner model
              }
            });
    //   console.log(booking,"booking db//////////");
      
          return booking;
        } catch (error) {
          console.error('Error fetching booking details:', error);
          throw error; // Re-throw error to handle it upstream
        }
      };      
      

      const getallBookings = async()=>{
        try {
            const totalBookings = await Booking.countDocuments( { bookingStatus: "confirmed" });
            const bookings  =await Booking.find({bookingStatus: "confirmed"})
            .populate('userId', 'name') // Populate userId with the name field
            .populate('venueId', 'name sportsitem')
            // console.log(bookings,"/////// bookings from db");
            return {bookings,totalBookings}
        } catch (error) {
            
        }
      }

// const getBookingReport = async (filter: BookingReportFilter) => {
//     try {
//         console.log('Filter applied:', JSON.stringify(filter));
//         const bookings = await Booking.find(filter) // Apply the filter here
//             .populate('userId', 'name') // Populate userId with the name field
//             .populate('venueId', 'name sportsitem') // Populate venueId with name and sportsitem fields
//             .exec(); // Ensure the query is executed
//         console.log(bookings, "bookings from db");
//         return bookings;
        
//     } catch (error) {
        
//     }
// };



const getBookingReport = async (
    ownerId: string,
    startDate: Date,
    endDate: Date
) => {
    try {
        // Find venues owned by the specified owner
        const venueList = await venues.find({ ownerId });
        
        // Extract venue IDs
        const venueIds = venueList.map(venue => venue._id);
    
        // Find bookings associated with these venues and within the specified date range
        const bookings = await Booking.find({
            venueId: { $in: venueIds },
            createdAt: { $gte: startDate, $lte: endDate } // Filter by date range
        })
            .populate('userId', 'name') // Populate userId with the name field
            .populate('venueId', 'name sportsitem') // Populate venueId with the name field
            .exec();

            // Calculate total amount
        const totalAmount = bookings.reduce((sum, booking) => sum + booking.fees, 0);

            // console.log(bookings , "bookings from db");
            // console.log(totalAmount , "db");
    
        return { bookings,totalAmount };
    } catch (error) {
        // console.error('Error retrieving bookings:', error);
        throw error;
    }
};



const createNotification = async (venueId: string, bookingId: string) => {
    const venue = await venues.findById(venueId).populate('ownerId').exec();

    if (!venue || !venue.ownerId) {
        throw new Error('Venue or owner not found');
    }

    const message = `Your venue "${venue.name}" has been booked with Booking ID: ${bookingId}.`;

    const notification = new Notification({
        ownerId: venue.ownerId,
        message,
    });

    await notification.save();
};


const getNotifications = async(ownerId:string)=>{
    const notificaion = await Notification.find({ownerId})
    return notificaion
}


const getVenueOwnerId = async (venueID: string): Promise<string | null> => {
    try {
        const venue = await venues.findById(venueID).select('ownerId').lean(); 
        if (!venue) {
            // console.log(`Venue with ID ${venueID} not found`);
            return null;
        }
        const ownerId = venue.ownerId; 
        console.log(ownerId, "Owner ID");
        return ownerId ? ownerId.toString() : null;
    } catch (error) {
        // console.error('Error retrieving venue owner ID:', error);
        return null;
    }
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
        getWalletbyUserId,
        getBookingDetail,
        getallBookings,
        getBookingReport,
        createNotification,
        getNotifications,
        getVenueOwnerId
    }
}

export type bookingRepositoryMongodbType = typeof bookingRepositoryMongodb;



