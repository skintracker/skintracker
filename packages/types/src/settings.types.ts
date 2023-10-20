import type { STSkin } from "./skins";

export interface Settings {
  trackedSkins: STSkin[];
  userLoginTokens: {
    [key: string]: string;
  };
  cache: {
    [hash: string]: SettingsCacheItem;
  };
}

export interface SettingsCacheItem {
  ttl: number;
  data: unknown;
}
