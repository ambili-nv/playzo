import { Types } from "mongoose";

export interface BookingReportFilter {
    ownerId: Types.ObjectId;
    createdAt: {
        $gte: Date;
        $lte: Date;
    };
}
