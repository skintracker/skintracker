import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { DMarketService } from '../../services/market/dmarket.service';
import { SettingsModule } from '../settings.module';

@Module({
  imports: [OgmaModule.forFeature(DMarketService), HttpModule, SettingsModule],
  providers: [DMarketService],
  exports: [DMarketService],
})
export class DMarketModule {}
