import { VenueEntity } from "../../enitity/venueEntity"
import { venueRepositoryMongodbType } from "../../framework/database/mongodb/repositories/venueRepositoryMongodb"

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
    
    return{
        getVenuesByOwner,
        getVenueById,
        updateVenue,
        getAllVenues
    }
}




export type venueDbInterface = typeof venueDbRepository