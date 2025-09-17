// import mongoose from "mongoose";

// type connetionObject = {
//   isConnected?: number;
// };

// const connection: connetionObject = {};

// async function dbConnect(): Promise<void> {
//   if (connection.isConnected) {
//     console.log("Already connected to database");
//     return;
//   }
//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
//     connection.isConnected = db.connections[0].readyState;

//     console.log("DB Connected successfully");
//   } catch (error) {
//     console.log("DB connection failed");
//     process.exit(1);
//   }
// }


// export default dbConnect


// src/lib/db.ts
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  // Check if MONGODB_URI exists
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("MongoDB URI:", process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials in logs
    
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("✅ DB Connected successfully");
    console.log("Connection state:", db.connections[0].readyState);
    
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    
    // More specific error handling
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error name:", error.name);
      
      if (error.message.includes('ENOTFOUND')) {
        console.error("🔍 DNS lookup failed - check your MongoDB URI hostname");
      } else if (error.message.includes('ECONNREFUSED')) {
        console.error("🔍 Connection refused - check if MongoDB is running");
      } else if (error.message.includes('authentication failed')) {
        console.error("🔍 Authentication failed - check username/password");
      }
    }
    process.exit(1);
  }
}

export default dbConnect;
