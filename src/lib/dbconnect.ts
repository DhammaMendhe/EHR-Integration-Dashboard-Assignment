import mongoose from "mongoose";

type connetionObject = {
  isConnected?: number;
};

const connection: connetionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected successfully");
  } catch (error) {
    console.log("DB connection failed");
    process.exit(1);
  }
}


export default dbConnect