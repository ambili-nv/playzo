import { VenueEntity } from "../../enitity/venueEntity"
import { venueRepositoryMongodbType } from "../../framework/database/mongodb/repositories/venueRepositoryMongodb";
import { TimeSlotEntity } from "../../enitity/slotsEntity";

export const venueDbRepository = (
    repository : ReturnType<venueRepositoryMongodbType>
)=>{
    const getVenuesByOwner = async (ownerId: string, page: number, limit: number) => {
        const venues = await repository.getVenuesByOwner(ownerId, page, limit);
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

const addTimeSlots = async (timeSlots: TimeSlotEntity[]) => {
    const newTimeSlot = await repository.addTimeSlots(timeSlots);
    return newTimeSlot;
};

const getTimeSlotsByVenueId = async (venueId: string) => await repository.getTimeSlotsByVenueId(venueId);

const getTimeSlotsByVenueIdAndDate = async (venueId: string, date: string) => {
    console.log(venueId, date, "Received venueId and date in venueDbRepository");

    const timeSlots = await repository.getTimeSlotsByVenueIdAndDate(venueId, date); 
    console.log(timeSlots, "Retrieved time slots in venueDbRepository");

    return timeSlots;
};

const getAllTimeSlotsByVenueIdAndDate = async (venueId: string, date: string) => {
    const timeSlots = await repository.getAllTimeSlotsByVenueIdAndDate(venueId, date); // Pass arguments separately
    return timeSlots;
};

//@ts-ignore
const deleteTimeSlotByVenueIdAndDate = async (venueId, date, startTime, endTime) => {
    const result = await repository.deleteTimeSlotByVenueIdAndDate(venueId, date, startTime, endTime);
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

export type venueDbInterface = typeof venueDbRepository