import { VenueEntity } from "../../../../enitity/venueEntity";
import venues from "../models/venues";
import { TimeSlotEntity } from "../../../../enitity/slotsEntity";
import slots from "../models/slots";
export const venueRepositoryMongodb = ()=>{



        // const getVenuesByOwner = async (ownerId:string) => {
        //     try {
        //         const venue =  await venues.find({ ownerId });
        //         // console.log(venue,"venue from db");
        //         return venue
        //     } catch (error) {
        //         throw error;
        //     }
        // };

        const getVenuesByOwner = async (ownerId: string, page: number, limit: number) => {
            try {
                const skip = (page - 1) * limit;
                const totalVenues = await venues.countDocuments({ ownerId });
                const venueList = await venues.find({ ownerId })
                    .skip(skip)
                    .limit(limit)
                    .exec();
        
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
        
        

        const getVenueById = async(venueId:string)=>await venues.findById(venueId)

        const updateVenue = async (venueId: string, updateFields: Partial<VenueEntity>) => {
            return await venues.findByIdAndUpdate(venueId, updateFields, { new: true });
        };

        const getAllVenues = async ()=>{
            try {
                const allVenues = await venues.find({isApproved:true})
                return allVenues
            } catch (error) {
                
            }
        }


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
        //     console.log(newTimeSlots, "slots db");
        
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
                    throw new Error("Please select another slot");
                }
            }
        
            const newTimeSlots = await slots.insertMany(timeSlots);
            console.log(newTimeSlots, "slots db");
        
            return newTimeSlots;
        };
        

        
        const getTimeSlotsByVenueIdAndDate = async (venueId: string, date: string) => {
            const timeSlots = await slots.find({ venueId, date, status: 'available' });
            // console.log(timeSlots, "view slots by date from db");
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
        
    

        return{
            getVenuesByOwner,
            getVenueById,
            updateVenue,
            getAllVenues,
            addTimeSlots,
            getTimeSlotsByVenueId,
            getTimeSlotsByVenueIdAndDate,
            getAllTimeSlotsByVenueIdAndDate,
            deleteTimeSlotByVenueIdAndDate
        }
    
}

export type venueRepositoryMongodbType = typeof venueRepositoryMongodb