import mongoose from "mongoose";
let cached = global.mongoose || { conn: null, promise: null };

const MONGO_URI = process.env.MONGODB_URI;
export const connectToDb = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGO_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {
      dbName: "dollerTracker",
      bufferCommands: false,
    });
  cached.promise = await cached.promise;
  return cached.conn;
};
