export default function bookingEntity (
    userId: string,
    venueId: string,
    slotId: string,
    fees: number,
    paymentStatus: string,
    bookingStatus: string,
    date: string,
    startTime: string,
    endTime: string,
    bookingId: string 
) {
    return {
        getUserId: () => userId,
        getVenueId: () => venueId,
        getSlotId: () => slotId,
        getFees: () => fees,
        getPaymentStatus: () => paymentStatus,
        getBookingStatus: () => bookingStatus,
        getDate: () => date,
        getStartTime: () => startTime,
        getEndTime: () => endTime,
        getBookingId: () => bookingId, 
        getCreatedAt: () => new Date()
    };
};

export type BookingEntityType = ReturnType<typeof bookingEntity>;
