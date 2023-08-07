import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { BuffMarketService } from '../../services/market/buffmarket.service';
import { SettingsModule } from '../settings.module';

@Module({
  imports: [OgmaModule.forFeature(BuffMarketService), HttpModule, SettingsModule],
  providers: [BuffMarketService],
  exports: [BuffMarketService],
})
export class BuffMarketModule {}
