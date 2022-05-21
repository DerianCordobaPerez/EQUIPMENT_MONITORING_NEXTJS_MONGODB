import mongoose from 'mongoose'
import { MONGODB_URI } from 'configs/env'

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

/**
 * It returns a promise that resolves to a Mongoose connection
 * @returns A promise that resolves to a mongoose connection.
 */
export default async function connect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}
