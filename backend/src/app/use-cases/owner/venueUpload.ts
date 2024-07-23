// venueUpload.ts
import { ownerDbInterface } from "../../Interfaces/ownerDbRepository";
import { VenueEntity, createVenueEntity } from '../../../enitity/venueEntity';
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import { venueDbInterface} from "../../Interfaces/venueDbRepository";
import { TimeSlotEntity,createTimeSlotEntity } from "../../../enitity/slotsEntity";

// export const uploadVenue = async (
//     ownerId: string,
//     venueData: any,
//     ownerRepository: ReturnType<ownerDbInterface>
// ) => {
//     // console.log(venueData,"venue data in usecase");
    
//     const { name, sportsitem, place, price, description, primaryImage, secondaryImages } = venueData;

//     const venueEntity: VenueEntity = createVenueEntity(
//         ownerId,
//         name,
//         sportsitem,
//         // location,
//         place,
//         price,
//         description,
//         primaryImage,
//         secondaryImages
//     );

//     // Add the venue to the repository
//     const newVenue = await ownerRepository.addVenue(venueEntity);

//     if (!newVenue) {
//         throw new CustomError("Venue upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     return newVenue;
// };


export const uploadVenue = async (
    ownerId: string,
    venueData: any,
    ownerRepository: ReturnType<ownerDbInterface>
) => {
    const { name, sportsitem, place, description, primaryImage, secondaryImages } = venueData;

    const venueEntity: VenueEntity = createVenueEntity(
        ownerId,
        name,
        sportsitem,
        place,
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


// export const findVenues= async(venueDbRepository:ReturnType<venueDbInterface>,ownerId:string)=>{
//     try {
//         const venues = await venueDbRepository.getVenuesByOwner(ownerId);
//         // console.log(venues,"venues adminread");
        
//         return venues;
//     } catch (error) {
//         throw error;
//     }
// }

export const findVenues = async (venueDbRepository: ReturnType<venueDbInterface>, ownerId: string, page: number, limit: number) => {
    try {
        const venues = await venueDbRepository.getVenuesByOwner(ownerId, page, limit);
        return venues;
    } catch (error) {
        throw error;
    }
};




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


//   export  const saveTimeSlots = async (
//         venueId: string,
//         timeSlotData: any,
//         venueRepository: ReturnType< venueDbInterface>
//     ) => {
//         // const { startDate, endDate, timeSlots } = timeSlotData;
//         const { date, timeSlots } = timeSlotData;
//         // console.log(startDate,endDate,timeSlots,"save time slots");
//         console.log(date,timeSlots,"save time slots");
        
//         const timeSlotEntities: TimeSlotEntity[] = timeSlots.map((slot: any) =>
//             createTimeSlotEntity(
//                 venueId, // Use venueId instead of ownerId
//                 // startDate,
//                 // endDate,
//                 date,
//                 slot.startTime,
//                 slot.endTime
//             )
//         );
    
//         const newTimeSlots = await venueRepository.addTimeSlots(timeSlotEntities);
    
//         if (!newTimeSlots) {
//             throw new CustomError("Saving time slots failed", HttpStatus.INTERNAL_SERVER_ERROR);
//         }
    
//         return newTimeSlots;
//     };


// export const saveTimeSlot = async (
//     venueId: string,
//     timeSlotData: any,
//     venueRepository: ReturnType< venueDbInterface>
// ) => {
//     const { date, timeSlots } = timeSlotData;
//     const timeSlotEntities: TimeSlotEntity[] = timeSlots.map((slot: any) =>
//         createTimeSlotEntity(
//             venueId,
//             date,
//             slot.startTime,
//             slot.endTime
//         )
//     );

//     const newTimeSlot = await venueRepository.addTimeSlots(timeSlotEntities);
//     if (!newTimeSlot) {
//         throw new CustomError("Saving time slot failed", HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//     return newTimeSlot;
// };



// export const saveTimeSlots = async (
//     venueId: string,
//     timeSlotData: any,
//     venueRepository: ReturnType<venueDbInterface>
// ) => {
//     const { date, timeSlots } = timeSlotData;
//     // console.log(date, timeSlots, "save time slots");

//     const timeSlotEntities: TimeSlotEntity[] = timeSlots.map((slot: any) =>
//         createTimeSlotEntity(
//             venueId,
//             date,
//             slot.startTime,
//             slot.endTime
//         )
//     );

//     try {
//         const newTimeSlots = await venueRepository.addTimeSlots(timeSlotEntities);
//         return newTimeSlots;
//     } catch (error) {
//         throw error
//     }
// };



export const saveTimeSlots = async (
    venueId: string,
    timeSlotData: any,
    venueRepository: ReturnType<venueDbInterface>
) => {
    const { date, timeSlots } = timeSlotData;

    const timeSlotEntities: TimeSlotEntity[] = timeSlots.map((slot: any) =>
        createTimeSlotEntity(
            venueId,
            date,
            slot.startTime,
            slot.endTime,
            slot.price // Add price to entity
        )
    );

    try {
        const newTimeSlots = await venueRepository.addTimeSlots(timeSlotEntities);
        return newTimeSlots;
    } catch (error) {
        throw error
    }
};



    export const findTimeSlotsByVenueId = async (venueDbRepository: ReturnType<venueDbInterface>, venueId: string) => {
        try {
            const timeSlots = await venueDbRepository.getTimeSlotsByVenueId(venueId);
            return timeSlots;
        } catch (error) {
            throw error;
        }
    };
    

    export const findTimeSlotsByVenueIdAndDate = async (venueDbRepository: ReturnType<venueDbInterface>, venueId: string, date: string) => {
        try {
            const timeSlots = await venueDbRepository.getTimeSlotsByVenueIdAndDate(venueId, date);
            return timeSlots;
        } catch (error) {
            throw error;
        }
    };

    export const findAllTimeSlotsByVenueIdAndDate = async (venueDbRepository: ReturnType<venueDbInterface>, venueId: string, date: string) => {
        try {
            const timeSlots = await venueDbRepository.getAllTimeSlotsByVenueIdAndDate(venueId, date);
            return timeSlots;
        } catch (error) {
            throw error;
        }
    };


    export const deleteTimeSlotByVenueIdAndDate = async (venueDbRepository: { deleteTimeSlotByVenueIdAndDate: (arg0: any, arg1: any, arg2: any, arg3: any) => any; }, venueId: any, date: any, startTime: any, endTime: any) => {
        try {
            await venueDbRepository.deleteTimeSlotByVenueIdAndDate(venueId, date, startTime, endTime);
        } catch (error) {
            throw error;
        }
    };
    


    




  

    