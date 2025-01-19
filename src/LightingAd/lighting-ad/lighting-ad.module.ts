import { Module } from '@nestjs/common';
import { LightingAdService } from './lighting-ad.service';
import { LightingAdController } from './lighting-ad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightingAd } from './entities/lighting-ad.entity';
import { Category } from 'src/category/category/entities/category.entity';
import { User } from 'src/User/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LightingAd,Category,User])],
  controllers: [LightingAdController],
  providers: [LightingAdService],
})
export class LightingAdModule {}
