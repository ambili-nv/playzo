// // entities/timeSlotEntity.ts

// export interface TimeSlotEntity {
//     venueId: string;
//     startDate: Date;
//     endDate: Date;
//     startTime: string;
//     endTime: string;
// }

// // Function to create TimeSlotEntity
// export const createTimeSlotEntity = (
//     venueId: string,
//     startDate: string,
//     endDate: string,
//     startTime: string,
//     endTime: string
// ): TimeSlotEntity => {
//     return {
//         venueId,
//         startDate: new Date(startDate),
//         endDate: new Date(endDate),
//         startTime,
//         endTime,
//     };
// };




// entities/timeSlotEntity.ts

export interface TimeSlotEntity {
    venueId: string;
    // startDate: Date;
    // endDate: Date;
    date:Date;
    startTime: string;
    endTime: string;
}

// Function to create TimeSlotEntity
export const createTimeSlotEntity = (
    venueId: string,
    // startDate: string,
    // endDate: string,
    date:string,
    startTime: string,
    endTime: string
): TimeSlotEntity => {
    return {
        venueId,
        // startDate: new Date(startDate),
        // endDate: new Date(endDate),
        date:new Date(date),
        startTime,
        endTime,
    };
};
