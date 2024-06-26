// venueUpload.ts
import { ownerDbInterface } from "../../Interfaces/ownerDbRepository";
import { VenueEntity, createVenueEntity } from '../../../enitity/venueEntity';
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import { venueDbInterface} from "../../Interfaces/venueDbRepository";

export const uploadVenue = async (
    ownerId: string,
    venueData: any,
    ownerRepository: ReturnType<ownerDbInterface>
) => {
    // console.log(venueData,"venue data in usecase");
    
    const { name, sportsitem, place, price, description, primaryImage, secondaryImages } = venueData;

    const venueEntity: VenueEntity = createVenueEntity(
        ownerId,
        name,
        sportsitem,
        // location,
        place,
        price,
        description,
        primaryImage,
        secondaryImages
    );

    // Add the venue to the repository
    const newVenue = await ownerRepository.addVenue(venueEntity);

    if (!newVenue) {
        throw new CustomError("Venue upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return newVenue;
};


export const findVenues= async(venueDbRepository:ReturnType<venueDbInterface>,ownerId:string)=>{
    try {
        const venues = await venueDbRepository.getVenuesByOwner(ownerId);
        console.log(venues,"venues adminread");
        
        return venues;
    } catch (error) {
        throw error;
    }
}


export const findVenueDetails = async (venueDbRepository: ReturnType<venueDbInterface>, venueId: string) => {
    try {
        const venueDetails = await venueDbRepository.getVenueById(venueId);
        console.log(venueDetails, "venue details adminread");
        return venueDetails;
    } catch (error) {
        throw error;
    }
};

    // export const updateVenue = async (venueDbRepository: ReturnType<venueDbInterface>, venueId: string)=>{
        
    // }



    export const updateVenue = async (venueRepository:  ReturnType<venueDbInterface>, venueId: string, updateData: Record<string, any>) => {
        try {
            // Perform business logic/validation if needed
    
            const updatedVenue = await venueRepository.updateVenue(venueId, updateData);
            return updatedVenue;
        } catch (error) {
            throw error; // Throw to be caught by controller's error handling middleware
        }
    };