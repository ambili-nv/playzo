
// const mongoose = require('mongoose');

// const timeSlotSchema = new mongoose.Schema({
//     venueId : {type:mongoose.Schema.Types.ObjectId,ref:"Venues"},
//   date: {
//     type: Date,
//     required: [true, "Date is required"],
//   },
//   startTime: {
//     type: String,
//     required: [true, "Start time is required"],
//     trim: true,
//   },
//   endTime: {
//     type: String,
//     required: [true, "End time is required"],
//     trim: true,
//   },
//   status: {
//     type: String,
//     enum: ['available', 'booked'],
//     default: 'available',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("Slots",timeSlotSchema)






const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venues" },
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
    price: {
        type: Number,  
        required: [true, "Price is required"],  
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

export default mongoose.model("Slots", timeSlotSchema);
