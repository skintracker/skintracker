import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { BitskinsModule, BuffMarketModule, DMarketModule, SkinportModule } from '@skintracker/sdk/modules/market';
import { ListTrackedSkinsCommand } from '../commands/list-tracked-skins.command';
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
