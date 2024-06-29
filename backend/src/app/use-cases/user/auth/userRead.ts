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