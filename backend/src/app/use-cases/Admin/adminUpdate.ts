import { ownerDbInterface } from "../../Interfaces/ownerDbRepository";
import { userDbInterface } from "../../Interfaces/userDbRepository";
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import sentMail from "../../../utils/sendMail";
import { venueAcceptanceEmail,venueRejectionEmail } from "../../../utils/userEmail";
import { venueDbInterface } from "../../Interfaces/venueDbRepository";
export const userBlock = async(
    id:string,
    userDbRepository:ReturnType<userDbInterface>
)=>{
    const user  = await userDbRepository.getUserbyId(id);

    await userDbRepository.updateUserBlock(id,!user?.isBlocked)
    return user
}


export const OwnerBlock = async(
    id:string,
    ownerDbRepository:ReturnType<ownerDbInterface>
)=>{
    const owner = await ownerDbRepository.getOwnerbyId(id);
    await ownerDbRepository.updateOwnerBlock(id,!owner?.isBlocked)
    return owner
}


export const acceptVenue = async (
    venueId: string, 
    venueDbRepository: ReturnType<venueDbInterface>, 
    ownerDbRepository: ReturnType<ownerDbInterface>
) => {
    const venue = await venueDbRepository.getVenueById(venueId);
    if (!venue) {
        throw new CustomError('Venue not found', HttpStatus.NOT_FOUND);
    }

    const ownerId = venue.ownerId ? venue.ownerId.toString() : null;
    if (!ownerId) {
        throw new CustomError('Owner ID is not valid', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Retrieve owner's email
    const owner = await ownerDbRepository.getOwnerbyId(ownerId);
    const ownerEmail = owner?.email
    console.log(ownerEmail,"ownerEmail");
    
    if (!owner || !owner.email) {
        throw new CustomError('Owner email not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }

        // Update venue status
        venue.isApproved = true;
        venue.isRejected = false
        await venueDbRepository.updateVenue(venueId, { isApproved: true,isRejected : false });

    // Send email notification to venue owner
    const emailSubject = 'Venue Accepted';
    const emailContent = venueAcceptanceEmail(owner.name, venue.name); // Customize email content as needed
    await sentMail(owner.email, emailSubject, emailContent);

    return { venue, ownerEmail: owner.email };
};




export const rejectVenue = async (
    venueId: string, 
    venueDbRepository: ReturnType<venueDbInterface>, 
    ownerDbRepository: ReturnType<ownerDbInterface>
) => {
    const venue = await venueDbRepository.getVenueById(venueId);
    if (!venue) {
        throw new CustomError('Venue not found', HttpStatus.NOT_FOUND);
    }

    const ownerId = venue.ownerId ? venue.ownerId.toString() : null;
    if (!ownerId) {
        throw new CustomError('Owner ID is not valid', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Retrieve owner's email
    const owner = await ownerDbRepository.getOwnerbyId(ownerId);
    if (!owner || !owner.email) {
        throw new CustomError('Owner email not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }


        // Update venue status
        venue.isRejected = true;
        venue.isApproved = false
        await venueDbRepository.updateVenue(venueId, { isRejected: true , isApproved:false});

    // Send email notification to venue owner
    const emailSubject = 'Venue Rejected';
    const emailContent = venueRejectionEmail(owner.name, venue.name); // Customize email content as needed
    await sentMail(owner.email, emailSubject, emailContent);

    return { venue, ownerEmail: owner.email };
};
