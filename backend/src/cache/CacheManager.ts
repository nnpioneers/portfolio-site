import NodeCache from 'node-cache';

export interface ICacheAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
  clear(): Promise<void>;
}

export class MemoryCache implements ICacheAdapter {
  private cache: NodeCache;

  constructor(defaultTTL: number = 3600) {
    this.cache = new NodeCache({ stdTTL: defaultTTL, checkperiod: 120 });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = this.cache.get<T>(key);
    return value !== undefined ? value : null;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      this.cache.set(key, value, ttlSeconds);
    } else {
      this.cache.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    this.cache.del(key);
  }

  async clear(): Promise<void> {
    this.cache.flushAll();
  }
}

export class CacheManager {
  private static instance: CacheManager;
  private adapter: ICacheAdapter;

  private constructor() {
    this.adapter = new MemoryCache();
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  public getAdapter(): ICacheAdapter {
    return this.adapter;
  }

  public async getOrSet<T>(key: string, fetcher: () => Promise<T>, ttlSeconds?: number): Promise<T> {
    const cached = await this.adapter.get<T>(key);
    if (cached) return cached;

    const fresh = await fetcher();
    await this.adapter.set(key, fresh, ttlSeconds);
    return fresh;
  }
}
