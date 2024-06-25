// venueEntity.ts
export interface VenueEntity {
    ownerId: string;
    name: string;
    sportsitem: string;
    // location: {
    //     type: string;
    //     coordinates: number[];
    // };
    // location:string;
    place:string;
    price: number;
    description?: string;
    primaryImage?: string;
    secondaryImages?: string[];
}

export const createVenueEntity = (
    ownerId: string,
    name: string,
    sportsitem: string,
    // location: {
    //     type: string;
    //     coordinates: number[];
    // },
    // location:string,
    place:string,
    price: number,
    description?: string,
    primaryImage?: string,
    secondaryImages?: string[]
): VenueEntity => ({
    ownerId,
    name,
    sportsitem,
    // location,
    place,
    price,
    description,
    primaryImage,
    secondaryImages,
});
