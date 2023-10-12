import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

import { BitskinsSearchResponse } from '@skintracker/sdk/types/market/bitskins.types';
import { Skin, SkinCategory, SkinExterior } from '@skintracker/sdk/types/skins';
import { Weapon, WeaponSkins } from '@skintracker/sdk/types/skins/weapons';

import { MOCK_HTTP_SERVICE, MOCK_LOGGER_SERVICE } from '../../../test/util';
import { BitskinsService } from './bitskins.service';

describe('BitskinsService', () => {
  let service: BitskinsService;

  beforeEach(async () => {
    service = new BitskinsService(MOCK_LOGGER_SERVICE, MOCK_HTTP_SERVICE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return error if no apiKey is provided', async () => {
    const skin: Skin = {
      item: Weapon.AWP,
      name: 'Medusa' as WeaponSkins,
      exterior: SkinExterior.FN,
      category: SkinCategory.Normal,
    };
    const minPrice = await service.getMinPrice(skin);
    expect(minPrice).toEqual('API Key is required');
  });

  it('should return min price for a skin', async () => {
    const mockResponseData: BitskinsSearchResponse = {
      counter: {
        total: 828779,
        filtered: 1,
      },
      list: [
        {
          id: '287005',
          asset_id: '31880467145',
          skin_id: 11815,
          bot_id: 839,
          price: 3200000,
          float_id: '498426368393220235',
          float_value: 0.09758181869983673,
          tradehold: 0,
          paint_seed: 520,
          paint_index: 446,
          stickers: [
            {
              name: 'Sticker | kennyS (Foil) | MLG Columbus 2016',
              slot: 3,
              type: 'Sticker',
              skin_id: 17646,
              class_id: '1626198289',
              skin_status: -2,
            },
          ],
          sticker_counter: 1,
          ss: 1,
          status: 2,
          bumped_at: '2023-07-28T11:12:47.000Z',
          name: 'AWP | Medusa (Minimal Wear)',
          class_id: '5438607704',
          skin_status: 1,
          discount: -10,
          hightier: 1,
          suggested_price: 2909320,
          category_id: 1,
          collection_id: [17],
          exterior_id: 2,
          paint_id: 563,
          type_id: 4,
          typesub_id: 39,
          quality_id: 6,
          bot_steam_id: '76561198320681490',
        },
      ],
    };
    service = new BitskinsService(MOCK_LOGGER_SERVICE, {
      post: jest.fn(() => {
        return of({
          data: mockResponseData,
          status: 200,
        });
      }),
    } as unknown as HttpService);
    const skin: Skin = {
      item: Weapon.AWP,
      name: 'Medusa' as WeaponSkins,
      exterior: SkinExterior.MW,
      category: SkinCategory.Normal,
    };
    const minPrice = await service.getMinPrice(skin, 'test');
    expect(minPrice).toEqual('$3200.00');
  });
});
