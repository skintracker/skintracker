import { BunFile } from "bun";

export type FileCacheEntry = {
  file: BunFile;
  contents: string;
  ttl: number;
};

export class FileCache {
  data: Map<string, FileCacheEntry>;

  constructor() {
    this.data = new Map();
  }

  async add(fileName: string, file: BunFile, ttl = 300000) {
    const contents = await file.text();
    this.data.set(fileName, { file, contents, ttl: Date.now() + ttl });
    return contents;
  }

  get(fileName: string): FileCacheEntry | undefined {
    // if (process.env.NODE_ENV !== "production") return undefined;

    const retrieved = this.data.get(fileName);
    if (retrieved && retrieved.ttl > Date.now()) return retrieved;
    return undefined;
  }
}

export const fileCache = new FileCache();
