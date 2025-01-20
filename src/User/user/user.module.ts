import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LightingAd } from 'src/LightingAd/lighting-ad/entities/lighting-ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,LightingAd])],
  controllers: [UserController],
  providers: [UserService,AuthService,JwtService],
  exports:[UserService],
})
export class UserModule {}
