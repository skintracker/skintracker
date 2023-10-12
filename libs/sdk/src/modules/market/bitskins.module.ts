import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { BitskinsService } from '../../services/market/bitskins.service';

@Module({
  imports: [OgmaModule.forFeature(BitskinsService), HttpModule],
  providers: [BitskinsService],
  exports: [BitskinsService],
})
export class BitskinsModule {}
