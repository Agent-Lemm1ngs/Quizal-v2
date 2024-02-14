import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "UserData",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
