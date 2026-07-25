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

    // In a real environment, this comes from process.env.MONGODB_URI
    // For local mock verification, we use a placeholder connection string.
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

      // Graceful shutdown
      process.on('SIGINT', this.disconnect);
      process.on('SIGTERM', this.disconnect);
    } catch (error) {
      console.error('[MongoDB] ❌ Connection failed:', error);
      // We do not exit the process here to allow the server to boot for health checks,
      // but in strict production we might process.exit(1).
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
