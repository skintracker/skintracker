import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { SkinportService } from '../../services/market/skinport.service';

@Module({
  imports: [OgmaModule.forFeature(SkinportService), HttpModule],
  providers: [SkinportService],
  exports: [SkinportService],
})
export class SkinportModule {}
