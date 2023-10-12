import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

import { skinToString } from '../../functions/skin-to-string';
import { Market } from '../../types/market';
import { SkinportSearchResponse } from '../../types/market/skinport.types';
import { Skin } from '../../types/skins';

@Injectable()
export class SkinportService {
  readonly market: Market = Market.Skinport;
  private host = 'api.skinport.com/v1';
  private id: string;
  private secret: string;

  constructor(
    @OgmaLogger(SkinportService) private readonly logger: OgmaService,
    private httpService: HttpService,
  ) {}

  buildStandardHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${this.id}:${this.secret}`).toString('base64')}`,
    };
  }

  async getPrices(id?: string, secret?: string): Promise<SkinportSearchResponse> {
    if (!id || !secret) {
      throw new Error('Must provide a Skinport login token!');
    }
    const headers = this.buildStandardHeaders();
    const params = {
      currency: 'USD',
      // market_hash_name: skinToString(skin),
    };
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
    return response.data;
  }

  async getMinPrice(skin: Skin, id?: string, secret?: string): Promise<string> {
    const minPrice = (await this.getPrices(id, secret)).filter((item) => item.market_hash_name === skinToString(skin))[0]?.min_price;
    return `$${minPrice.toFixed(2).toString()}`;
  }
}
