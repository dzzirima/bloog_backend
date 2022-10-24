import mongoose, { Mongoose } from "mongoose";

const featuredPostSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Post"
   
  }
},{
    timestamps:true
});


export default mongoose.model('FeaturedPost', featuredPostSchema)
