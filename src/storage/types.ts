export interface StorageAdapter {
  load<T>(key: string): T | null;
  save<T>(key: string, value: T): boolean;
  clear(): void;
}

export interface StoredSession {
  source: string;
  destination: string;
}
