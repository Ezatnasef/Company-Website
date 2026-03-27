const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

const connectWithUri = async (uri) => mongoose.connect(uri);

const startMemoryServer = async () => {
  if (!memoryServer) {
    memoryServer = await MongoMemoryServer.create({
      instance: { dbName: 'nexora' },
    });
  }

  const uri = memoryServer.getUri();
  const conn = await connectWithUri(uri);
  console.log(`MongoDB Connected (memory): ${conn.connection.host}`);
  return conn;
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const useMemoryDb = process.env.USE_IN_MEMORY_DB === 'true';

  try {
    if (!mongoUri || useMemoryDb) {
      return await startMemoryServer();
    }

    const conn = await connectWithUri(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    if (!useMemoryDb) {
      console.warn(`MongoDB Error: ${err.message}`);
      console.warn('Falling back to in-memory MongoDB for local development.');
      return startMemoryServer();
    }

    console.error(`MongoDB Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
