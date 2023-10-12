import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { BuffMarketService } from '../../services/market/buffmarket.service';

@Module({
  imports: [OgmaModule.forFeature(BuffMarketService), HttpModule],
  providers: [BuffMarketService],
  exports: [BuffMarketService],
})
export class BuffMarketModule {}
