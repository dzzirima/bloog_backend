import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  meta: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [String],
  author: {
    type: String,
    default: "Admin",
  },
  slug: {
    type: String,

  },
  thumbnail: {
    type: Object,
    url: {
      required: true,
      type: URL,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  
},{
    timestamps:true
});


export default mongoose.model('Post', postSchema)
