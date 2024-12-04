import mongoose from "mongoose";
const MONGO_URL = process.env.MONGODB_URL || "";
export async function ConnectToDB(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connect to MongoDB Atlas ");
      return;
    }
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("[Failed to connect to MongoDB atlas :", err);
    throw err;
  }
}

export async function DisconnectDB(): Promise<void> {
  try {
    if(mongoose.connection.readyState===0){
        await mongoose.disconnect();
        console.log('disconnected MongoDB')
    }
  } catch (err) {
    console.error("Fail to disconnect from MongoDB atlas",err);
    throw err
  }
}
