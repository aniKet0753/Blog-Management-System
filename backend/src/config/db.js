import mongoose from "mongoose";

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("MongoDb connection successful");
  }catch(error) {
    console.log("mongoose connection failed",error.message);
  }
}

export default connectDB;