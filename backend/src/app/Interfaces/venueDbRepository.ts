import { VenueEntity } from "../../enitity/venueEntity"
import { venueRepositoryMongodbType } from "../../framework/database/mongodb/repositories/venueRepositoryMongodb";
import { TimeSlotEntity } from "../../enitity/slotsEntity";

export const venueDbRepository = (
    repository : ReturnType<venueRepositoryMongodbType>
)=>{
    const getVenuesByOwner = async (ownerId: string) => {
        const venues = await repository.getVenuesByOwner(ownerId);
        // console.log(venues, "venues db repo");
        return venues;
    };

    const getVenueById = async(venueId:string)=>await repository.getVenueById(venueId)

    const updateVenue = async (venueId: string, updateFields: Partial<VenueEntity>) => await repository.updateVenue(venueId, updateFields);

    const getAllVenues = async ()=>{
        try {
            const getAllVenues = await repository.getAllVenues()
            // console.log(getAllVenues,"venues from db");
            return getAllVenues;
        } catch (error) {
            
        }
    }


// Repository Interface
// const addTimeSlots = async (timeSlots: TimeSlotEntity[]) => await repository.addTimeSlots(timeSlots);
const addTimeSlots = async (timeSlots: TimeSlotEntity[]) => {
    const newTimeSlot = await repository.addTimeSlots(timeSlots);
    return newTimeSlot;
};




// const  findTimeSlots= async (venueId: string, startDate: string, endDate: string, timeSlots: TimeSlotEntity[]) => await repository.findTimeSlots(venueId,startDate,endDate,timeSlots)

const getTimeSlotsByVenueId = async (venueId: string) => await repository.getTimeSlotsByVenueId(venueId);

// const getTimeSlotsByVenueIdAndDate = async (venueId: string, date: string) => {
//     const timeSlots = await repository.getTimeSlotsByVenueIdAndDate({ venueId, date });
//     return timeSlots;
// };
const getTimeSlotsByVenueIdAndDate = async (venueId: string, date: string) => {
    const timeSlots = await repository.getTimeSlotsByVenueIdAndDate(venueId, date); // Pass arguments separately
    return timeSlots;
};


    
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




export type venueDbInterface = typeof venueDbRepository