import { Module } from '@nestjs/common';
import { LightingAdService } from './lighting-ad.service';
import { LightingAdController } from './lighting-ad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightingAd } from './entities/lighting-ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LightingAd])],
  controllers: [LightingAdController],
  providers: [LightingAdService],
})
export class LightingAdModule {}
