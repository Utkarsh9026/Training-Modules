import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCATION);
    console.log("MongoDB is connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDb;
