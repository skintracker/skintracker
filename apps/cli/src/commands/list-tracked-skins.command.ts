import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { Command, CommandRunner } from 'nest-commander';
import { terminal } from 'terminal-kit';

import { skinToString } from '@skintracker/sdk/functions';
import { BitskinsService, BuffMarketService, DMarketService, SkinportService } from '@skintracker/sdk/services/market';
import { Skin } from '@skintracker/sdk/types';
import { SettingsService } from '../services/settings.service';
import { SkinportSearchResponse } from '@skintracker/sdk/types/market/skinport.types';

@Command({
  name: 'list-tracked-skins',
  description: 'List all tracked skins',
  aliases: ['ls', 'list'],
  options: { isDefault: false },
})
export class ListTrackedSkinsCommand extends CommandRunner {
  constructor(
    @OgmaLogger(ListTrackedSkinsCommand) private readonly logger: OgmaService,
    private settingsService: SettingsService,
    private bitskinsService: BitskinsService,
    private buffMarketService: BuffMarketService,
    private dMarketService: DMarketService,
    private skinportService: SkinportService,
  ) {
    super();
  }

  async fetchPriceFromSkinport(skin: Skin): Promise<string> {
    const cachedResponse = this.settingsService.getCachedResponse(this.skinportService.market);
    if (cachedResponse) {
      this.logger.verbose('Using cached response');
      const minPrice = (cachedResponse as SkinportSearchResponse).filter(
        (item) => item.market_hash_name === skinToString(skin),
      )[0]?.min_price;
      return `$${minPrice.toFixed(2).toString()}`;
    }
    const token = JSON.parse(this.settingsService.getMarketLoginToken(this.skinportService.market));
    if (!token) { return 'Not Logged In'; }
    const res = await this.skinportService.getPrices(token.clientId, token.clientSecret);
    this.settingsService.cacheResponse(this.skinportService.market, res);
    const minPrice = res.filter((item) => item.market_hash_name === skinToString(skin))[0]?.min_price;
    return `$${minPrice.toFixed(2).toString()}`;
  }

  async run(): Promise<void> {
    terminal.eraseDisplayAbove();
    const skins: Skin[] = this.settingsService.getSettings().trackedSkins;
    const tableData = (await Promise.allSettled([
      ...skins.map(async (skin) => [
        skinToString(skin),
        await this.bitskinsService.getMinPrice(
          skin,
          this.settingsService.getMarketLoginToken(this.bitskinsService.market),
        ),
        await this.buffMarketService.getMinPrice(
          skin,
          this.settingsService.getMarketLoginToken(this.buffMarketService.market),
        ),
        await this.dMarketService.getMinPrice(skin),
        await this.fetchPriceFromSkinport(skin),
      ]),
    ])).map((result) => {
      if (result.status === 'rejected') {
        console.error(result);
        return ['ERROR', 'ERROR', 'ERROR', 'ERROR', 'ERROR'];
      }
      return result.value;
    });
    terminal.table([['Item', '^RBitSkins', '^YBUFF ^YMarket', '^GDMarket', '^BSkinport'], ...tableData], {
      contentHasMarkup: true,
    });
    process.exit(0);
  }
}
