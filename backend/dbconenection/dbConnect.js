import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

    if (!mongoConnectionString) {
      throw new Error("MONGO_CONNECTION_STRING is missing");
    }

    await mongoose.connect(mongoConnectionString);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
