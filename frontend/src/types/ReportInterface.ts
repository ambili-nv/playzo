// Define the ReportInterface with the expected fields
export interface ReportInterface {
    _id: string;
    bookingStatus: string;
    createdAt: string;
    date: string;
    endTime: string;
    fees: number;
    paymentStatus: string;
    slotId: string;
    startTime: string;
    userId: { _id: string; name: string };
    venueId: { _id: string; name: string };
    totalAmount: number;
  }
  


