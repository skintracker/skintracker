import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { AddMarketLoginModule } from './modules/add-market-login.module';
import { AddTrackedSkinModule } from './modules/add-tracked-skin.module';
import { ListTrackedSkinsModule } from './modules/list-tracked-skins.module';
import { MainMenuModule } from './modules/main-menu.module';
import { RemoveTrackedSkinModule } from './modules/remove-tracked-skin.module';

@Module({
  imports: [
    OgmaModule.forRoot(),
    MainMenuModule,
    AddTrackedSkinModule,
    ListTrackedSkinsModule,
    AddMarketLoginModule,
    RemoveTrackedSkinModule,
  ],
})
export class AppModule {}
