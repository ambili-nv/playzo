
// import mongoose from 'mongoose';


// const venueSchema = new mongoose.Schema({

//     ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },

//   name: {
//     type: String,
//     required: true
//   },
//   sportsitem: {
//     type: String,
//     required: true
//   },

//   place: { 
//   type: String, 
//   required: true },

//   description:{
//     type:String
//   },
//   primaryImage:{
//     type:String
//   },
//   secondaryImages: [
//     {
//       type: String
//     }
//   ],
//   isApproved:{
//     type:Boolean,
//     default:false
//   },
//   isRejected:{
//     type:Boolean,
//     default:false
//   }

// });




// export default mongoose.model("Venues", venueSchema);



import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    name: { type: String, required: true },
    sportsitem: { type: String, required: true },
    place: { type: String, required: true },
    description: { type: String },
    primaryImage: [String], // Updated to array of strings
    secondaryImages: [String],
    isApproved: { type: Boolean, default: false },
    isRejected: { type: Boolean, default: false },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    }
});

export default mongoose.model("Venues", venueSchema);
