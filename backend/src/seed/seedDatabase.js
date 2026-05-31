import dotenv from "dotenv";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import samplePosts from "./samplePosts.js";

dotenv.config();

await mongoose.connect(process.env.MONGOOSE_URL);

await Post.deleteMany();

await Post.insertMany(samplePosts);

console.log("Database Seeded Successfully");

process.exit();