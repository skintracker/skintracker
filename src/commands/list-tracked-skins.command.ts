import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { Command, CommandRunner } from 'nest-commander';
import { terminal } from 'terminal-kit';

import { skinToString } from '../functions/skin-to-string';
import { BitskinsService } from '../services/market/bitskins.service';
import { BuffMarketService } from '../services/market/buffmarket.service';
import { DMarketService } from '../services/market/dmarket.service';
import { SkinportService } from '../services/market/skinport.service';
import { SettingsService } from '../services/settings.service';
import { Skin } from '../types/skins/skin.types';

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

  async run(): Promise<void> {
    terminal.eraseDisplayAbove();
    const skins: Skin[] = this.settingsService.getSettings().trackedSkins;
    const tableData = await Promise.all([
      ...skins.map(async (skin) => [
        skinToString(skin),
        await this.bitskinsService.getMinPrice(skin),
        await this.buffMarketService.getMinPrice(skin),
        await this.dMarketService.getMinPrice(skin),
        await this.skinportService.getMinPrice(skin),
      ]),
    ]);
    terminal.table([['Item', '^RBitSkins', '^YBUFF ^YMarket', '^GDMarket', '^BSkinport'], ...tableData], {
      contentHasMarkup: true,
    });
    process.exit(0);
  }
}
