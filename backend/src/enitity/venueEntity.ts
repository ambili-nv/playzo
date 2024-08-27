// // venueEntity.ts
// export interface VenueEntity {
//     ownerId: string;
//     name: string;
//     sportsitem: string;
//     place:string;
//     description?: string;
//     primaryImage?: string;
//     secondaryImages?: string[];
//     isApproved?:boolean;
//     isRejected?:boolean
// }

// export const createVenueEntity = (
//     ownerId: string,
//     name: string,
//     sportsitem: string,
//     place:string,
//     description?: string,
//     primaryImage?: string,
//     secondaryImages?: string[],
//     isApproved?:boolean,
//     isRejected?:boolean
// ): VenueEntity => ({
//     ownerId,
//     name,
//     sportsitem,
//     place,
//     description,
//     primaryImage,
//     secondaryImages,
//     isApproved,
//     isRejected
// });






// venueEntity.ts
export interface VenueEntity {
    ownerId: string;
    name: string;
    sportsitem: string;
    place: string;
    description?: string;
    primaryImage?: string;
    secondaryImages?: string[];
    coordinates?: { lat: number; lng: number };  // Make this required
    isApproved?: boolean;
    isRejected?: boolean;
}

export const createVenueEntity = (
    ownerId: string,
    name: string,
    sportsitem: string,
    place: string,
    description?: string,
    primaryImage?: string,
    secondaryImages?: string[],
    coordinates?: { lat: number; lng: number }, // This is required
    isApproved?: boolean,
    isRejected?: boolean
): VenueEntity => ({
    ownerId,
    name,
    sportsitem,
    place,
    description,
    primaryImage,
    secondaryImages,
    coordinates,
    isApproved,
    isRejected
});