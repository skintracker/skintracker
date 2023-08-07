import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { RemoveTrackedSkinCommand } from '../commands/remove-tracked-skin.command';
import { SettingsModule } from './settings.module';

@Module({
  imports: [OgmaModule.forFeature(RemoveTrackedSkinCommand), SettingsModule],
  providers: [RemoveTrackedSkinCommand],
  exports: [RemoveTrackedSkinCommand],
})
export class RemoveTrackedSkinModule {}
