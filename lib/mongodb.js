// lib/mongodb.js — singleton connection for Vercel serverless
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

let cache = global._mongooseCache;
if (!cache) cache = global._mongooseCache = { conn: null, promise: null };

async function connectDB() {
  if (!URI) throw new Error('MONGODB_URI not set in environment variables');
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(URI, { bufferCommands: false, maxPoolSize: 5 });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}

module.exports = { connectDB };
