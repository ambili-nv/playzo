import { VenueEntity } from "../../../../enitity/venueEntity";
import venues from "../models/venues";

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


    

        return{
            getVenuesByOwner,
            getVenueById,
            updateVenue,
            getAllVenues
        }
    
}

export type venueRepositoryMongodbType = typeof venueRepositoryMongodb