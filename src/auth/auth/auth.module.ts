import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/User/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRATION, JWT_SECRET } from 'helpConfig';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [UserModule,PassportModule,PassportModule.register({ defaultStrategy: 'jwt' }),JwtModule.register({
    secret: JWT_SECRET.secret,
    signOptions: {expiresIn:JWT_EXPIRATION.time},
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}

