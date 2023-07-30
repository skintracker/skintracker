import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { ListTrackedSkinsCommand } from '../commands/list-tracked-skins.command';
import { BitskinsModule } from './market/bitskins.module';
import { BuffMarketModule } from './market/buffmarket.module';
import { DMarketModule } from './market/dmarket.module';
import { SkinportModule } from './market/skinport.module';
import { SettingsModule } from './settings.module';

@Module({
  imports: [
    OgmaModule.forFeature(ListTrackedSkinsCommand),
    SettingsModule,
    BitskinsModule,
    BuffMarketModule,
    DMarketModule,
    SkinportModule,
  ],
  providers: [ListTrackedSkinsCommand],
  exports: [ListTrackedSkinsCommand],
})
export class ListTrackedSkinsModule {}
