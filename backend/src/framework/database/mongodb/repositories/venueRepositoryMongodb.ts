import { VenueEntity } from "../../../../enitity/venueEntity";
import venues from "../models/venues";
import { TimeSlotEntity } from "../../../../enitity/slotsEntity";
import slots from "../models/slots";
import mongoose from "mongoose";
import rating from "../models/rating";
import ratingEntity, { RatingEntityType } from "../../../../enitity/ratingEntity";
import user from "../models/user";
// import venues from "../models/venues";

export const venueRepositoryMongodb = ()=>{

        const getVenuesByOwner = async (ownerId: string, page: number, limit: number) => {
            try {
                const skip = (page - 1) * limit;
                const totalVenues = await venues.countDocuments({ ownerId });
                const venueList = await venues.find({ ownerId })
                
                
                    .skip(skip)
                    .limit(limit)
                    .exec();
                    // console.log(venueList,"venuelist //////");
                return {
                    totalVenues,
                    totalPages: Math.ceil(totalVenues / limit),
                    currentPage: page,
                    venueList
                };
            } catch (error) {
                throw error;
            }
        };
        
        

        const getVenueById = async(venueId:string)=>await venues.findById(venueId).exec();

        const getRatingsByVenueId = async (venueId: string) => {
            return await rating.find({ venueId: venueId }).exec();
        };


        const getUsersByIds = async (userIds: string[]) => {
            return await user.find({ _id: { $in: userIds } }).exec();
        };




        const updateVenue = async (venueId: string, updateFields: Partial<VenueEntity>) => {
            return await venues.findByIdAndUpdate(venueId, updateFields, { new: true });
        };

        const getRatings = async (filter: Record<string, any>) =>
            await rating.find(filter)
                .populate({
                path: 'userId',
                select: 'name ', // Select only the fields you need from User
              })



        // const getAllVenues = async ()=>{
        //     try {
        //         const allVenues = await venues.find({isApproved:true})
        //         return allVenues
        //     } catch (error) {
                
        //     }
        // }


        const getAllVenues = async () => {
            try {
                // Aggregation to filter approved venues, join with ratings, and compute the average rating
                const venuesWithRatings = await venues.aggregate([
                    {
                        $match: { isApproved: true } // Filter only approved venues
                    },
                    {
                        $lookup: {
                            from: 'ratings', // The name of the ratings collection
                            localField: '_id',
                            foreignField: 'venueId',
                            as: 'ratings'
                        }
                    },
                    {
                        $addFields: {
                            averageRating: {
                                $cond: {
                                    if: { $gt: [{ $size: '$ratings' }, 0] },
                                    then: { $divide: [{ $sum: '$ratings.rating' }, { $size: '$ratings' }] },
                                    else: 0
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            ratings: 0 // Optionally remove the ratings field from the result
                        }
                    }
                ]);
        
                return venuesWithRatings;
            } catch (error) {
                // throw new Error('Error fetching venues with ratings: ' + error.message);
            }
        };

        const getTimeSlotsByVenueId = async (venueId: string) => {
            const timeSlots = await slots.find({ venueId });
            // console.log(timeSlots,"view slots from db");
            
            return timeSlots;
        };
        
        // const addTimeSlots = async (timeSlots: TimeSlotEntity[]) => {
        //     for (const slot of timeSlots) {
        //         const existingSlots = await slots.find({
        //             venueId: slot.venueId,
        //             date: slot.date,
        //             $or: [
        //                 { startTime: { $lt: slot.endTime }, endTime: { $gt: slot.startTime } }
        //             ]
        //         });
        
        //         if (existingSlots.length > 0) {
        //             throw new Error("Please select another slot");
        //         }
        //     }
        
        //     const newTimeSlots = await slots.insertMany(timeSlots);
        //     // console.log(newTimeSlots, "slots db");
        
        //     return newTimeSlots;
        // };


        const addTimeSlots = async (timeSlots: TimeSlotEntity[]) => {
            for (const slot of timeSlots) {
                const existingSlots = await slots.find({
                    venueId: slot.venueId,
                    date: slot.date,
                    $or: [
                        { startTime: { $lt: slot.endTime }, endTime: { $gt: slot.startTime } }
                    ]
                });
        
                if (existingSlots.length > 0) {
                    throw new Error("Slots already added Please select another date");
                }
            }
        
            const newTimeSlots = await slots.insertMany(timeSlots);
            return newTimeSlots;
        };
        


        
        
        const getTimeSlotsByVenueIdAndDate = async (venueId: string, date: string) => {
            // console.log("Venue ID:", venueId);
            // console.log("Date:", date);
        
            // Convert date string to Date object if needed, stripping out the time part
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
        
            // console.log("Start of Day:", startOfDay);
            // console.log("End of Day:", endOfDay);
        
            const timeSlots = await slots.find({
                venueId: new mongoose.Types.ObjectId(venueId),  
                date: { $gte: startOfDay, $lte: endOfDay },
                status: 'available'
            });
        
            // console.log("Retrieved time slots:", timeSlots);
        
            return timeSlots;
        };
        
        
        

        const getAllTimeSlotsByVenueIdAndDate = async (venueId: string, date: string) => {
            const timeSlots = await slots.find({ venueId, date }); // Retrieve all slots regardless of status
            // console.log(timeSlots, "view all slots by date from db");
            return timeSlots;
        };


        //@ts-ignore
        const deleteTimeSlotByVenueIdAndDate = async (venueId, date, startTime, endTime) => {
            const result = await slots.deleteOne({ venueId, date, startTime, endTime });
            // console.log(result, "Deleted time slot from db");
            return result;
        };


        const addRating = async (ratingData: RatingEntityType) =>
            await rating.create({
              userId: ratingData.getUserId(),
              venueId: ratingData.getVenueId(),
              rating: ratingData.getRating(),
              comment: ratingData.getComment(),
            });
        
        
        const getVenue = async()=>{
            const totalVenues = await venues.countDocuments( { isApproved: true });
            const venue = await venues.find( { isApproved: true });
            console.log(totalVenues,venue,"db///////////");
            
            return({totalVenues,venue})
        }    
    

        return{
            getVenuesByOwner,
            getVenueById,
            updateVenue,
            getAllVenues,
            addTimeSlots,
            getTimeSlotsByVenueId,
            getTimeSlotsByVenueIdAndDate,
            getAllTimeSlotsByVenueIdAndDate,
            deleteTimeSlotByVenueIdAndDate,
            addRating,
            getUsersByIds,
            getRatingsByVenueId,
            getRatings,
            getVenue
        }
    
}

export type venueRepositoryMongodbType = typeof venueRepositoryMongodb