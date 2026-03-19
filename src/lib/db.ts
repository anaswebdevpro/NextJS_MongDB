import { connect } from "mongoose";

const mongoDB_URL = process.env.MONGODB_URL;

if (!mongoDB_URL) {
  throw new Error("MongoDB URL not found. Set MONGODB_URL in .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connect(mongoDB_URL).then((c) => c.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connection established");
  } catch (error) {
    throw error;
  }

  return cached.conn;
};

export default connectDb;

//ste -1  coonectDB  function
// stemp 2  mongoose.connect() method
