
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
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
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

venueSchema.index({ location: '2dsphere' });

export default mongoose.model("Venue", venueSchema);


