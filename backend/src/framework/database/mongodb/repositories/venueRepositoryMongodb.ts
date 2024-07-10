import { VenueEntity } from "../../../../enitity/venueEntity";
import venues from "../models/venues";
import { TimeSlotEntity } from "../../../../enitity/slotsEntity";
import slots from "../models/slots";
export const venueRepositoryMongodb = ()=>{



        const getVenuesByOwner = async (ownerId:string) => {
            try {
                const venue =  await venues.find({ ownerId });
                console.log(venue,"venue from db");
                return venue
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


        const addTimeSlots = async (timeSlots: TimeSlotEntity[]) => {
            const newTimeSlots = await slots.insertMany(timeSlots);
            console.log(newTimeSlots,"slots db");
            
            return newTimeSlots;
        };

        const getTimeSlotsByVenueId = async (venueId: string) => {
            const timeSlots = await slots.find({ venueId });
            console.log(timeSlots,"view slots from db");
            
            return timeSlots;
        };
        

        const getTimeSlotsByVenueIdAndDate = async (venueId: string, date: string) => {
            const timeSlots = await slots.find({ venueId, date });
            console.log(timeSlots, "view slots by date from db");
            return timeSlots;
        };
        

        // const findTimeSlots = async (venueId: string, startDate: string, endDate: string, timeSlots: TimeSlotEntity[]) => {
        //     const existingSlots = await slots.find({
        //       venueId,
        //       startDate,
        //       endDate,
        //       $or: timeSlots.map(slot => ({
        //         startTime: slot.startTime,
        //         endTime: slot.endTime,
        //       })),
        //     });
        //     return existingSlots;
        //   };

    

        return{
            getVenuesByOwner,
            getVenueById,
            updateVenue,
            getAllVenues,
            addTimeSlots,
            getTimeSlotsByVenueId,
            getTimeSlotsByVenueIdAndDate
            // findTimeSlots
        }
    
}

export type venueRepositoryMongodbType = typeof venueRepositoryMongodb