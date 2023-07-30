import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { totp } from 'notp';
import { catchError, firstValueFrom } from 'rxjs';
import { decode } from 'thirty-two';

import { skinToString } from '../../functions/skin-to-string';
import { Market } from '../../types/market';
import { BitskinsSearchResponse } from '../../types/market/bitskins.types';
import { Skin, SkinCategory } from '../../types/skins';
import { SettingsService } from '../settings.service';

@Injectable()
export class BitskinsService {
  readonly market: Market = Market.BitSkins;
  private host = 'bitskins.com/api/v1';
  private apiKey: string;
  private secret: string;

  constructor(
    @OgmaLogger(BitskinsService) private readonly logger: OgmaService,
    private settingsService: SettingsService,
    private httpService: HttpService,
  ) {
    const token = this.settingsService.getMarketLoginToken(this.market);
    if (!token) {
      this.logger.error(`No login token found for ${this.market}`);
      return;
    }
    const { apiKey, secret } = JSON.parse(token);
    this.apiKey = apiKey;
    this.secret = secret;
  }

  async getMinPrice(skin: Skin) {
    if (!this.apiKey || !this.secret) {
      this.logger.error(`No login token found for ${this.market}`);
      return 'Not Logged In';
    }
    const params = {
      code: totp.gen(decode(this.secret)),
      api_key: this.apiKey,
      sort_by: 'price',
      order: 'asc',
      market_hash_name: skinToString(skin),
      is_stattrak: skin.category === SkinCategory.StatTrak ? 1 : -1,
      is_souvenir: skin.category === SkinCategory.Souvenir ? 1 : -1,
    };
    const response = await firstValueFrom(
      this.httpService
        .get<BitskinsSearchResponse>(`https://${this.host}/get_inventory_on_sale`, {
          params,
        })
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw error;
          }),
        ),
    );
    if (!response.data.data) {
      this.logger.verbose(`[${response.status}]: ${JSON.stringify(response.data)}`);
      return 'N/A';
    }
    const minPrice = response.data.data.items[0]?.price;
    return minPrice ? `$${minPrice}` : 'N/A';
  }
}
