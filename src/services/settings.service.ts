import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

import { skinToString } from '../functions/skin-to-string';
import { Settings } from '../types';
import { Skin } from '../types/skins';
import { Market } from '../types/market';

@Injectable()
export class SettingsService {
  private skintrackerDir = join(homedir(), '.skintracker');
  private settingsFile = join(this.skintrackerDir, 'settings.json');
  private settings: Settings;

  constructor(@OgmaLogger(SettingsService) private readonly logger: OgmaService) {
    this.settings = this.loadSettingsFile() as Settings;
  }

  getSettings() {
    return this.settings;
  }

  createSettingsFile() {
    this.logger.verbose('Creating settings file...');
    if (existsSync(this.settingsFile)) {
      throw new Error('Settings file already exists!');
    }
    if (!existsSync(this.skintrackerDir)) {
      this.logger.verbose('Creating settings directory...');
      console.log(mkdirSync(this.skintrackerDir, { recursive: true }));
      this.logger.verbose('Created settings directory!');
    }
    writeFileSync(
      this.settingsFile,
      JSON.stringify({
        trackedSkins: [],
        userLoginTokens: {},
        cache: {},
      }),
    );
    this.logger.verbose('Created settings file!');
  }

  loadSettingsFile() {
    this.logger.verbose('Loading settings file...');
    if (!existsSync(this.settingsFile)) {
      this.logger.verbose('Settings file does not exist, creating...');
      this.createSettingsFile();
    }
    return JSON.parse(readFileSync(this.settingsFile, 'utf-8'));
  }

  saveSettingsFile() {
    this.logger.verbose('Saving settings file...');
    writeFileSync(this.settingsFile, JSON.stringify(this.settings));
    this.logger.verbose('Saved settings file!');
  }

  addTrackedSkin(skin: Skin) {
    this.logger.verbose(`Adding tracked skin ${skinToString(skin)} to settings...`);
    this.settings.trackedSkins.push(skin);
    this.saveSettingsFile();
    this.logger.verbose(`Added tracked skin ${skinToString(skin)} in settings!`);
  }

  removeTrackedSkin(skin: Skin) {
    this.logger.verbose(`Removing tracked skin ${skinToString(skin)} from settings...`);
    this.settings.trackedSkins = this.settings.trackedSkins.filter((trackedSkin) => {
      const areSkinsEqual =
        trackedSkin.name === skin.name && trackedSkin.item === skin.item && trackedSkin.exterior === skin.exterior;
      return !areSkinsEqual;
    });
    this.saveSettingsFile();
    this.logger.verbose(`Removed tracked skin ${skinToString(skin)} from settings!`);
  }

  addMarketLoginToken(market: Market, token: string) {
    this.logger.verbose(`Adding market login token for ${market} to settings...`);
    this.settings.userLoginTokens[market] = token;
    this.saveSettingsFile();
    this.logger.verbose(`Added market login token for ${market} to settings!`);
  }

  getMarketLoginToken(market: Market): string | undefined {
    this.logger.verbose(`Getting market login token for ${market} from settings...`);
    const token = this.settings.userLoginTokens[market] || undefined;
    this.logger.verbose(`Got market login token for ${market} from settings!`);
    return token;
  }

  cacheResponse(market: Market, response: unknown) {
    this.logger.verbose(`Caching response for ${market}...`);
    this.settings.cache[market] = {
      ttl: Date.now() + 1000 * 60 * 5,
      data: response,
    };
    this.saveSettingsFile();
    this.logger.verbose(`Cached response for ${market}!`);
  }

  getCachedResponse(market: Market) {
    this.logger.verbose(`Getting cached response for ${market}...`);
    if (!this.settings.cache) {
      this.logger.verbose(`No cached response for ${market}!`);
      return undefined;
    }
    const cachedResponse = this.settings.cache[market];
    if (!cachedResponse) {
      this.logger.verbose(`No cached response for ${market}!`);
      return undefined;
    }
    if (cachedResponse.ttl < Date.now()) {
      this.logger.verbose(`Cached response for ${market} is expired!`);
      return undefined;
    }
    this.logger.verbose(`Got cached response for ${market}!`);
    return cachedResponse.data;
  }
}
