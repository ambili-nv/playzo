
const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    venueId : {type:mongoose.Schema.Types.ObjectId,ref:"Venues"},
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  startTime: {
    type: String,
    required: [true, "Start time is required"],
    trim: true,
  },
  endTime: {
    type: String,
    required: [true, "End time is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Slots",timeSlotSchema)


// models/timeSlotModel.ts

// import mongoose from 'mongoose';

// const timeSlotSchema = new mongoose.Schema({
//     venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venues" },
//     startDate: {
//         type: Date,
//         required: [true, "Start date is required"],
//     },
//     endDate: {
//         type: Date,
//         required: [true, "End date is required"],
//     },
//     startTime: {
//         type: String,
//         required: [true, "Start time is required"],
//         trim: true,
//     },
//     endTime: {
//         type: String,
//         required: [true, "End time is required"],
//         trim: true,
//     },
//     status: {
//         type: String,
//         enum: ['available', 'booked'],
//         default: 'available',
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// export default mongoose.model("Slots", timeSlotSchema);