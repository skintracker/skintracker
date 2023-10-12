import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { sign } from 'tweetnacl';

import { byteToHexString } from '../../functions/byte-to-hex-string';
import { hexStringToByte } from '../../functions/hex-string-to-byte';
import { skinToString } from '../../functions/skin-to-string';
import { queryParamsToString } from '../../functions/query-params-to-string';
import { DMarketItemsSearchResponse, Market } from '../../types/market';
import { Skin } from '../../types/skins';

@Injectable()
export class DMarketService {
  readonly market: Market = Market.DMarket;
  private host = 'api.dmarket.com';

  constructor(
    @OgmaLogger(DMarketService) private readonly logger: OgmaService,
    private httpService: HttpService,
  ) {}

  buildSignature(method: 'GET' | 'POST', path: string, body: string, timestamp: number, secretKey?: string) {
    const str = `${method}${path}${body}${timestamp}`;
    const signatureRaw = sign(new TextEncoder().encode(str), hexStringToByte(secretKey));
    return byteToHexString(signatureRaw).substring(0, 128);
  }

  buildStandardHeaders(method: 'GET' | 'POST', path: string, body: string, timestamp: number, publicKey?: string, secretKey?: string) {
    return {
      'Content-Type': 'application/json',
      'X-Api-Key': publicKey,
      'X-Request-Sign': `dmar ed25519 ${this.buildSignature(method, path, body, timestamp, secretKey)}`,
      'X-Sign-Date': timestamp,
    };
  }

  async getMinPrice(skin: Skin, publicKey?: string, secretKey?: string) {
    this.logger.verbose(`Getting ${this.market} min price for ${skinToString(skin)}`);
    if (!publicKey || !secretKey) {
      return 'Not Logged In';
    }
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const path = '/exchange/v1/market/items';
    const params = {
      gameId: 'a8db',
      currency: 'USD',
      limit: 10,
      title: `${skin.item} ${skin.name} (${skin.exterior})`,
      orderBy: 'price',
      orderDir: 'asc',
    };
    this.logger.verbose('Executing DMarket request...');
    const response = await firstValueFrom(
      this.httpService
        .get<DMarketItemsSearchResponse>(`https://${this.host}${path}`, {
          headers: this.buildStandardHeaders('GET', `${path}?${queryParamsToString(params)}`, '', timestamp, publicKey, secretKey),
          params,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    const minPrice = parseInt(response.data.objects[0].price.USD, 10) / 100;
    return `$${minPrice.toFixed(2).toString()}`;
  }
}
