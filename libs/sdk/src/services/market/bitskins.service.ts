import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';

import { skinToString } from '../../functions/skin-to-string';
import { Market } from '../../types/market';
import { Skin } from '../../types/skins';

@Injectable()
export class BitskinsService {
  readonly market: Market = Market.BitSkins;
  private host = 'api.bitskins.com';

  constructor(
    @OgmaLogger(BitskinsService) private readonly logger: OgmaService,
  ) {}

  async getMinPrice(skin: Skin, apiKey?: string): Promise<string> {
    if (!apiKey) {
      return 'API Key is required';
    }
    const token = JSON.parse(apiKey);
    const headers = {
      'Content-Type': 'application/json',
      'x-apikey': token.apiKey,
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
    const response = await fetch(`https://${this.host}/market/search/730`, {
      method: 'POST',
      headers,
      body: Buffer.from(JSON.stringify(body)),
    }).then((res) => res.json());
    if (!response.list) {
      this.logger.verbose(`[${response.status}]: ${JSON.stringify(response.data)}`);
      return 'N/A';
    }
    const minPrice = response.list[0]?.price / 1000;
    return minPrice ? `$${minPrice.toFixed(2)}` : 'N/A';
  }
}
