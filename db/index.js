import mongoose from "mongoose";

try {
await mongoose.connect("mongodb://localhost:27017/blog")
    console.log("database connected successfully !!!!")
    
} catch (error) {
    console.log("connection to db failed !!!!")
    
}