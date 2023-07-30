import { Module } from '@nestjs/common';
import { SkinportService } from '../../services/market/skinport.service';
import { OgmaModule } from '@ogma/nestjs-module';
import { HttpModule } from '@nestjs/axios';
import { SettingsModule } from '../settings.module';

@Module({
  imports: [OgmaModule.forFeature(SkinportService), HttpModule, SettingsModule],
  providers: [SkinportService],
  exports: [SkinportService],
})
export class SkinportModule {}
