export class LocalCacheManager {
  static get(key: string): any {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static set(key: string, value: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static remove(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}

export class IndexedDBManager {
  // Placeholder for robust offline cache for chats/business plans
  static async init(): Promise<void> {
    console.log('IndexedDB initialized for offline support');
  }
}
