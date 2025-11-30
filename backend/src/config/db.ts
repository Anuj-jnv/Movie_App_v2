import fp from "fastify-plugin";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = fp(async (fastify) => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    fastify.log.info("Successfully connected to MongoDB");
  } catch (error: any) {
    fastify.log.error("MongoDB connection failed: " + error.message);
    process.exit(1);
  }
});

export default connectDB;
