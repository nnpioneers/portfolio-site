import mongoose from 'mongoose';

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

    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nnp_mock_db';

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
