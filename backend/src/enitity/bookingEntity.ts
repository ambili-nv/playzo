export default function bookingEntity(
    userId: string,
    venueId: string,
    slotId: string,
    fees: number,
    paymentStatus: "pending" | "paid" | "failed",
    bookingStatus: "pending" | "confirmed" | "canceled",
    date: Date,
    createdAt: Date = new Date()
) {
    return {
        getUserId: (): string => userId,
        getVenueId: (): string => venueId,
        getSlotId: (): string => slotId,
        getFees: (): number => fees,
        getPaymentStatus: (): "pending" | "paid" | "failed" => paymentStatus,
        getBookingStatus: (): "pending" | "confirmed" | "canceled" => bookingStatus,
        getDate: (): Date => date,
        getCreatedAt: (): Date => createdAt,
    };
}

export type BookingEntityType = ReturnType<typeof bookingEntity>;
