import { venueDbInterface, venueDbRepository } from "../../../Interfaces/venueDbRepository";
import { userDbInterface } from "../../../Interfaces/userDbRepository";


export const getVenue = async (venueDbRepository:ReturnType<venueDbInterface>)=>{
    try {
        const venues = await venueDbRepository.getAllVenues();
        // console.log(venues,"venues from repo");
        
        return venues;
    } catch (error) {
        throw error
    }
}



// export const findTimeSlotsByVenueIdAndDate = async (venueDbRepository: ReturnType<venueDbInterface>, venueId: string, date: string) => {
//     try {
//         const timeSlots = await venueDbRepository.getTimeSlotsByVenueIdAndDate(venueId, date);
//         return timeSlots;
//     } catch (error) {
//         throw error;
//     }
// };


export const findTimeSlotsByVenueIdAndDate = async (venueDbRepository: ReturnType<venueDbInterface>, venueId: string, date: string) => {
    try {
        const timeSlots = await venueDbRepository.getTimeSlotsByVenueIdAndDate(venueId, date);
        console.log(timeSlots, "Retrieved time slots in userRead");
        return timeSlots;
    } catch (error) {
        throw error;
    }
};
