import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { catchError, firstValueFrom } from 'rxjs';

import { skinToString } from '../../functions/skin-to-string';
import { Market } from '../../types/market';
import { BitskinsSearchResponse } from '../../types/market/bitskins.types';
import { Skin } from '../../types/skins';

@Injectable()
export class BitskinsService {
  readonly market: Market = Market.BitSkins;
  private host = 'api.bitskins.com';

  constructor(
    @OgmaLogger(BitskinsService) private readonly logger: OgmaService,
    private httpService: HttpService,
  ) {}

  async getMinPrice(skin: Skin, apiKey?: string): Promise<string> {
    if (!apiKey) {
      return 'API Key is required';
    }
    const headers = {
      'x-apikey': apiKey,
    };
    const body = {
      limit: 10,
      offset: 0,
      order: [
        {
          field: 'price',
          order: 'ASC',
        },
      ],
      where: {
        name: skinToString(skin),
      },
    };
    const response = await firstValueFrom(
      this.httpService
        .post<BitskinsSearchResponse>(`https://${this.host}/market/search/730`, {
          headers,
          body,
        })
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw error;
          }),
        ),
    );
    this.logger.verbose(`[${response.status}]: ${JSON.stringify(response.data,null,2)}`);
    if (!response.data.list) {
      this.logger.verbose(`[${response.status}]: ${JSON.stringify(response.data,null,2)}`);
      return 'N/A';
    }
    const minPrice = response.data.list[0]?.price / 1000;
    return minPrice ? `$${minPrice.toFixed(2)}` : 'N/A';
  }
}
