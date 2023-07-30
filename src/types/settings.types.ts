import { Skin } from './skins';

export interface Settings {
  trackedSkins: Skin[];
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
