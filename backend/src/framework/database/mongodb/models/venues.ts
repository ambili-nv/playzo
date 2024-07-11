
import mongoose from 'mongoose';


const venueSchema = new mongoose.Schema({

    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },

  name: {
    type: String,
    required: true
  },
  sportsitem: {
    type: String,
    required: true
  },

  place: { 
  type: String, 
  required: true },

  price:{
    type:Number,
    required:true
  },
  description:{
    type:String
  },
  primaryImage:{
    type:String
  },
  secondaryImages: [
    {
      type: String
    }
  ],
  isApproved:{
    type:Boolean,
    default:false
  },
  isRejected:{
    type:Boolean,
    default:false
  }

});




export default mongoose.model("Venues", venueSchema);






