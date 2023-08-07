import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { AddTrackedSkinCommand } from '../commands/add-tracked-skin.command';
import { AddTrackedSkinQuestions } from '../questions/add-tracked-skin.questions';
import { SettingsModule } from './settings.module';

@Module({
  imports: [OgmaModule.forFeature(AddTrackedSkinCommand), SettingsModule],
  providers: [AddTrackedSkinCommand, AddTrackedSkinQuestions],
  exports: [AddTrackedSkinCommand],
})
export class AddTrackedSkinModule {}
