import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { MainMenuCommand } from '../commands/main-menu.command';
import { AddMarketLoginModule } from './add-market-login.module';
import { AddTrackedSkinModule } from './add-tracked-skin.module';
import { ListTrackedSkinsModule } from './list-tracked-skins.module';
import { RemoveTrackedSkinModule } from './remove-tracked-skin.module';

@Module({
  imports: [
    OgmaModule.forFeature(MainMenuCommand),
    AddTrackedSkinModule,
    ListTrackedSkinsModule,
    AddMarketLoginModule,
    RemoveTrackedSkinModule,
  ],
  providers: [MainMenuCommand],
  exports: [MainMenuCommand],
})
export class MainMenuModule {}
