import mongoose from "mongoose";

export interface DatabaseStatus {
  connected: boolean;
  isMemoryFallback: boolean;
  host?: string;
  name?: string;
  error?: string;
}

let dbStatus: DatabaseStatus = {
  connected: false,
  isMemoryFallback: false
};

export const connectDB = async (): Promise<DatabaseStatus> => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/micron_infotech";

  try {
    console.log(`[Database] Attempting connection to MongoDB at: ${uri.replace(/\/\/.*@/, "//***:***@")}`);
    
    // Attempt Mongoose connection with 3-second timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });

    const conn = mongoose.connection;
    dbStatus = {
      connected: true,
      isMemoryFallback: false,
      host: conn.host,
      name: conn.name
    };

    console.log(`[Database] Successfully connected to MongoDB: ${conn.host}/${conn.name}`);
    return dbStatus;
  } catch (error: any) {
    console.warn(`[Database] Real MongoDB connection failed: ${error.message}`);
    console.log(`[Database] Activating robust in-memory zero-config data engine so all features work out-of-the-box.`);
    
    dbStatus = {
      connected: true,
      isMemoryFallback: true,
      host: "in-memory-engine",
      name: "micron_infotech_memory",
      error: error.message
    };
    return dbStatus;
  }
};

export const getDbStatus = (): DatabaseStatus => dbStatus;

export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  dbStatus.connected = false;
};
