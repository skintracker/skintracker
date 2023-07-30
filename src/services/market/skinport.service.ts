import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

import { skinToString } from '../../functions/skin-to-string';
import { Market } from '../../types/market';
import { SkinportSearchResponse } from '../../types/market/skinport.types';
import { Skin } from '../../types/skins';
import { SettingsService } from '../settings.service';

@Injectable()
export class SkinportService {
  readonly market: Market = Market.Skinport;
  private host = 'api.skinport.com/v1';
  private id: string;
  private secret: string;

  constructor(
    @OgmaLogger(SkinportService) private readonly logger: OgmaService,
    private httpService: HttpService,
    private settingsService: SettingsService,
  ) {
    const token = this.settingsService.getMarketLoginToken(this.market);
    if (!token) {
      this.logger.error('DMarket login token not found');
      return;
    }
    const keys = JSON.parse(token) as {
      clientId: string;
      clientSecret: string;
    };
    this.id = keys.clientId;
    this.secret = keys.clientSecret;
  }

  buildStandardHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${this.id}:${this.secret}`).toString('base64')}`,
    };
  }

  async getMinPrice(skin: Skin) {
    if (!this.id || !this.secret) {
      this.logger.error('Skinport login token not found');
      return 'Not Logged In';
    }
    const headers = this.buildStandardHeaders();
    const params = {
      currency: 'USD',
      // market_hash_name: skinToString(skin),
    };
    const cachedResponse = this.settingsService.getCachedResponse(this.market);
    if (cachedResponse) {
      this.logger.verbose('Using cached response');
      const minPrice = (cachedResponse as SkinportSearchResponse).filter(
        (item) => item.market_hash_name === skinToString(skin),
      )[0]?.min_price;
      return `$${minPrice.toFixed(2).toString()}`;
    }
    const response = await firstValueFrom(
      this.httpService
        .get<SkinportSearchResponse>(`https://${this.host}/items`, {
          headers,
          params,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    this.settingsService.cacheResponse(this.market, response.data);
    const minPrice = response.data.filter((item) => item.market_hash_name === skinToString(skin))[0]?.min_price;
    return `$${minPrice.toFixed(2).toString()}`;
  }
}
