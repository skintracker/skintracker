import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { BitskinsService } from '../../services/market/bitskins.service';
import { SettingsModule } from '../settings.module';

@Module({
  imports: [OgmaModule.forFeature(BitskinsService), HttpModule, SettingsModule],
  providers: [BitskinsService],
  exports: [BitskinsService],
})
export class BitskinsModule {}
