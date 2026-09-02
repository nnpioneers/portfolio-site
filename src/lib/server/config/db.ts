import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected || mongoose.connection.readyState === 1) {
      this.isConnected = true;
      return;
    }

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('MONGODB_URI environment variable is missing. Database configuration is REQUIRED for production.');
      } else if (process.env.NODE_ENV === 'test') {
        throw new Error('MONGODB_URI environment variable is missing in test environment.');
      } else {
        throw new Error('MONGODB_URI environment variable is missing. Please check your .env file.');
      }
    }

    try {
      console.log('[MongoDB] Connecting to Atlas...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 50
      });

      this.isConnected = true;
      console.log('[MongoDB] ✅ Successfully connected to Atlas.');

      process.on('SIGINT', this.disconnect);
      process.on('SIGTERM', this.disconnect);
    } catch (error) {
      console.error('[MongoDB] ❌ Connection failed:', error);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) return;
    
    await mongoose.disconnect();
    this.isConnected = false;
    console.log('[MongoDB] Disconnected through app termination');
    process.exit(0);
  }

  public getStatus() {
    return {
      connected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host
    };
  }
}

// Prisma Client Singleton for Authentication
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
