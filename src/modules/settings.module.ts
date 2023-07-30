import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { SettingsService } from '../services/settings.service';

@Module({
  imports: [OgmaModule.forFeature(SettingsService)],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
