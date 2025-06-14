import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define MONGO_URI in env")
}

let cached = global.mongoose

// If in global mongoose not available create and set to null
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

export async function connectToDatabase() {
  // If connection available return that
  if (cached.conn) {
    return cached.conn
  }

  // If not promise in global send promise for connection
  if (!cached.promise) {
    const options = {
      bufferCommands: true,
      maxPoolSize: 10,
    }
    mongoose.connect(MONGODB_URI, options).then(() => mongoose.connection)
  }

  // before we send promise so when promise resolve add connection to cached
  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}
