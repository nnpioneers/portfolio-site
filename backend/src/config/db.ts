import mongoose from 'mongoose';

export class DatabaseManager {
  private static instance: DatabaseManager;
  private isConnected: boolean = false;
  private mongoServer: any = null;

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

    const env = process.env.NODE_ENV || 'development';
    let uri = process.env.MONGODB_URI;

    if (env === 'production') {
      if (!uri) {
        console.error('[MongoDB] ❌ CRITICAL: MONGODB_URI is required in production environment.');
        process.exit(1);
      }
    } else if (env === 'test' || process.env.USE_IN_MEMORY_DB === 'true') {
      if (!uri) {
        console.log('[MongoDB] Starting in-memory MongoDB for testing...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        this.mongoServer = await MongoMemoryServer.create();
        uri = this.mongoServer.getUri();
      }
    } else {
      // Development
      uri = uri || 'mongodb://localhost:27017/nnp_mock_db';
    }

    try {
      console.log(`[MongoDB] Connecting to ${env === 'test' ? 'In-Memory DB' : 'Atlas'}...`);
      await mongoose.connect(uri as string, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 50
      });

      this.isConnected = true;
      console.log('[MongoDB] ✅ Successfully connected.');

      // Graceful shutdown
      process.on('SIGINT', this.disconnect.bind(this));
      process.on('SIGTERM', this.disconnect.bind(this));
    } catch (error) {
      console.error('[MongoDB] ❌ Connection failed:', error);
      // We do not exit the process here to allow the server to boot for health checks,
      // but in strict production we might process.exit(1).
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) return;
    
    await mongoose.disconnect();
    if (this.mongoServer) {
      await this.mongoServer.stop();
      console.log('[MongoDB] In-Memory DB stopped.');
    }
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
