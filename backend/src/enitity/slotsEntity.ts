




// entities/timeSlotEntity.ts

export interface TimeSlotEntity {
    venueId: string;
    // startDate: Date;
    // endDate: Date;
    date:Date;
    startTime: string;
    endTime: string;
    price:number;
}

// Function to create TimeSlotEntity
export const createTimeSlotEntity = (
    venueId: string,
    // startDate: string,
    // endDate: string,
    date:string,
    startTime: string,
    endTime: string,
    price:number
): TimeSlotEntity => {
    return {
        venueId,
        // startDate: new Date(startDate),
        // endDate: new Date(endDate),
        date:new Date(date),
        startTime,
        endTime,
        price
    };
};




