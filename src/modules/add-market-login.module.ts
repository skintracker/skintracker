import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';

import { AddMarketLoginCommand } from '../commands/add-market-login.command';
import { AddMarketLoginQuestions } from '../questions/add-market-login.questions';
import { SettingsModule } from './settings.module';
import { BuffMarketModule } from './market/buffmarket.module';

@Module({
  imports: [OgmaModule.forFeature(AddMarketLoginCommand), SettingsModule, BuffMarketModule],
  providers: [AddMarketLoginCommand, AddMarketLoginQuestions],
  exports: [AddMarketLoginCommand],
})
export class AddMarketLoginModule {}
