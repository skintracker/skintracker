import logger from "../logging";

export class HTTPRequestCache {
  static data: Map<
    number,
    {
      data: string;
      expiry: number;
    }
  >;

  constructor() {
    if (!HTTPRequestCache.data) {
      HTTPRequestCache.data = new Map();
    }
  }

  static createHash(data: unknown) {
    logger.debug(`Creating hash for ${JSON.stringify(data)}`);
    const hash = Bun.hash.crc32(JSON.stringify(data));
    logger.debug(`Hash: ${hash}`);
    return hash;
  }

  add(url: string, request: RequestInit, response: unknown, ttl = 300000) {
    const hash = HTTPRequestCache.createHash({ url, request });
    const data = JSON.stringify(response);
    HTTPRequestCache.data.set(hash, { data, expiry: Date.now() + ttl });
  }

  get(url: string, request: RequestInit) {
    const hash = HTTPRequestCache.createHash({ url, request });
    const cached = HTTPRequestCache.data.get(hash);
    if (cached && cached.expiry > Date.now()) {
      return JSON.parse(cached.data);
    } else if (cached) {
      // remove expired cache
      HTTPRequestCache.data.delete(hash);
    }
    return undefined;
  }
}

export const httpRequestCache = new HTTPRequestCache();
export default httpRequestCache;
